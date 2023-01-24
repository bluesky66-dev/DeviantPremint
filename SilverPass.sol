pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";


/**
 * @title SilverPass Premint
 * @dev SilverPass contract mints Deviants SilverPass NFTs
 */

contract SilverPass is ERC721, ERC721URIStorage, EIP712, AccessControl {
    using Strings for uint256;
    using Counters for Counters.Counter;
    using ECDSA for bytes32;
    Counters.Counter private _tokenIdCounter;


    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 public constant MAX_SUPPLY = 5555;
    uint256 public constant MAX_MINT = 2;
    uint256 public constant PRICE = 0.0035 ether;

    uint256 internal genesis;
    uint256 internal openSeason;

    address public TEAM;

    mapping(address=>bool) public teamAddrs;

    event PassMinted(uint256 indexed passId, address indexed account);
    event Airdropped(uint256 indexed passId, address indexed airdroppedTo);

    error MaxOfTwo();
    error AllSoldOut();    
    error NonZeroOnly();
    error LengthMismatch();
    constructor()
        ERC721("Deviants Silver Pass", "DSP")
        EIP712("Deviants Silver Pass", "1")
    {
        genesis = block.timestamp;
        openSeason = block.timestamp + 86400; //Genesis + 24hrs
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, TEAM);
        TEAM = msg.sender;
        teamAddrs[TEAM] = true;
        teamAddrs[0x1805c49AE4392F1DF411F665fDB5c6bD77b23D4a] = true;
        teamAddrs[0xabd43DAA71c365420f7c03ab90140CA5cC70b719] = true;
        teamAddrs[0x61611Be3dB30D0E960918aC4761d744a8D568647] = true;
        teamAddrs[0x9C480Cd02d8a2aE18De1C6ac96C8FA41C396b146] = true;
        teamAddrs[0xEE2C99D8D6ACB7940609fD6a9c5Ba2129fa43004] = true;
        teamAddrs[0xC4c282C70faABF0043FA2f7548DaCf676cfAb0CC] = true;
    }

    modifier isUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    modifier isTeam() {
        require(teamAddrs[msg.sender], "invalid caller");
        _;
    }

    /// @notice Redeems a signature to mint one or two NFTs
    /// @dev If now is before openSeason, a signature is required
    /// @dev if amount = 2, a payment of 0.0035 ETH is required as first is free
    function redeem(
        address account,
        uint amount,
        bytes calldata signature
    ) public payable isUser returns(bool){
        if(amount > MAX_MINT){
            revert MaxOfTwo();
        }

        if(amount == 2){
            require(msg.value == PRICE, "Must send 0.0035 ETH");
        }

        if(balanceOf(account) == MAX_MINT){
            revert MaxOfTwo();
        }

        if(block.timestamp <= openSeason){
        require(
            _verify(signature),
            "Invalid signature"
        );


        assert(msg.sender == account);
        safeMint(account, amount);
        return true;

        }else if(block.timestamp > openSeason){
            safeMint(account,amount);
            return true;
        }else{
            revert AllSoldOut();
        }
    }


    /// @notice used by redeem to verify that the `signature` is valid for the caller
    /// @dev tx.origin is used as opposed to an arg being as isUser checks that msg.sender == tx.origin (always EOA)
    /// @dev redeem() checks that the msg.sender is the account in which the signature was signed for
    /// @dev triple checked to make sure no one can claim another's signature 
    function _verify( bytes memory signature)
        internal
        view
        returns (bool)
    {
        bytes32 digest = _hashTypedDataV4(
                keccak256(
                abi.encode(
                    keccak256("NFT(address account)"),
                    tx.origin
                )
            )
        );
        return ECDSA.recover(digest, signature) == TEAM;
    }

    /// @notice called only by redeem()
    /// @param to it can be any EOA
    function safeMint(address to, uint amount)
        internal
    {
        for(uint x = amount; x > 0; x--){
            uint id = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, id);
        }
    }

    /// @notice allows `TEAM` to airdrop any amount of NFTs to addresses of their choice
    /// @dev only callable by the team and without cost
    /// @param addrs array of addresses which can't be == address(0)
    /// @param amounts array of amounts equal to the amount of addrs which can't be 0
    function airdrop(address[] memory addrs, uint[] memory amounts) public isTeam {
        if(addrs.length != amounts.length){
            revert LengthMismatch();
        }

        for(uint x = 0; x <= addrs.length -1; x++) {
            if(addrs[x] == address(0)){
                revert NonZeroOnly();
            }
            if(amounts[x] == 0){
                revert NonZeroOnly();
            }

            safeMint(addrs[x],amounts[x]);
            // emit Airdropped(_tokenIdCounter.curren() - 1, addrs[x]);
        }
    }

    /// @notice allows TEAM to transfer funds from contract
    /// @dev callable by anyone at any point but always to the TEAM address
    function withdraw() public {
        payable(TEAM).transfer(address(this).balance);
    }

    /// @notice sets the nft metadata uri
    function setBaseURI(string memory baseURI_) public isTeam {
        setBaseURI(baseURI_);
    }

    /// @notice allows the team to withdraw any ERC20 token stuck in the contract
    function ERC20Rescue(IERC20 _token) public isTeam {
        require(msg.sender == TEAM);
        _token.transfer(TEAM, _token.balanceOf(address(this)));
    }

    // The following functions are overrides required by Solidity.

       function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    receive() external payable {}

    fallback() external payable {}
}
