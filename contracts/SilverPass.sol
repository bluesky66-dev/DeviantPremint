pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
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

contract SilverPass is ERC721, ERC721URIStorage, EIP712, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    using ECDSA for bytes32;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_SUPPLY = 5555;
    uint256 public constant MAX_MINT = 2;
    uint256 public constant PRICE = 0.0035 ether;

    uint256 internal genesis;
    uint256 internal openSeason;

    address payable public TEAM;

    mapping(address => bool) public teamAddrs;
    mapping(address => mapping(uint256 => bool)) public usedAddr;

    error MaxOfTwo();
    error AllSoldOut();
    error NonZeroOnly();
    error LengthMismatch();

    constructor()
        ERC721("Deviants Silver Pass", "DSP")
        EIP712("Deviants Silver Pass", "1")
    {
        genesis = block.timestamp;

        openSeason = block.timestamp + 86; //Genesis + 24hrs

        TEAM = payable(msg.sender);
        teamAddrs[TEAM] = true;
    }

    modifier isUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    modifier isTeam() {
        require(teamAddrs[msg.sender], "invalid caller");
        _;
    }

    function sameAddr(address addr) internal view returns (bool) {
        bool hasBalance = balanceOf(addr) == 1;
        bool isInMap = usedAddr[addr][1] == true;

        if (hasBalance == true && isInMap == true) {
            return true;
        } else {
            return false;
        }
    }

    /// @notice Redeems a signature to mint one or two NFTs
    /// @dev If now is before openSeason, a signature is required
    /// @dev if amount = 2, a payment of 0.0035 ETH is required as first is free
    function redeem(
        address account,
        uint256 amount,
        bytes calldata signature
    ) public payable returns (bool) {
        if ((amount == 1 && balanceOf(account) == 1) || amount == 2) {
            require(msg.value == PRICE, "Must send 0.0035 ETH");
        }

        if (usedAddr[account][2] == true) {
            revert MaxOfTwo();
        }

        if (block.timestamp < openSeason) {
            require(_verify(signature), "Invalid signature");
            assert(msg.sender == account);

            if (amount == 1 && usedAddr[account][1] == true) {
                usedAddr[account][2] = true;
                safeMint(account, amount, false);
                return true;
            } else {
                if (amount == 2) {
                    usedAddr[account][2] = true;
                    usedAddr[account][1] = true;
                } else {
                    usedAddr[account][1] = true;
                }
                safeMint(account, amount, false);
                return true;
            }
        } else if (block.timestamp >= openSeason) {
            if (amount == 1 && usedAddr[account][1] == true) {
                usedAddr[account][2] = true;
                safeMint(account, amount, false);
                return true;
            } else {
                if (amount == 2) {
                    usedAddr[account][2] = true;
                    usedAddr[account][1] = true;
                } else {
                    usedAddr[account][1] = true;
                }
                safeMint(account, amount, false);
                return true;
            }
        } else {
            return false;
        }
    }

    /// @notice used by redeem to verify that the `signature` is valid for the caller
    /// @dev tx.origin is used as opposed to an arg being as isUser checks that msg.sender == tx.origin (always EOA)
    /// @dev redeem() checks that the msg.sender is the account in which the signature was signed for
    /// @dev triple checked to make sure no one can claim another's signature
    function _verify(bytes memory signature) internal view returns (bool) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(abi.encode(keccak256("NFT(address account)"), tx.origin))
        );
        return ECDSA.recover(digest, signature) == TEAM;
    }

    /// @notice called only by redeem()
    /// @param to it can be any EOA
    function safeMint(address to, uint256 amount, bool team) internal {
        require(
            amount + _tokenIdCounter.current() <= MAX_SUPPLY,
            "Exceeds Max Supply"
        );
        if(team == false){
            require(balanceOf(to) + amount <= 2, "Don't be Greedy!");
            if (amount > MAX_MINT) {
                revert MaxOfTwo();
            }
        }

        require(to != address(0), "invalid address");

        for (uint256 x = amount; x > 0; x--) {
            uint256 id = _tokenIdCounter.current();

            if (id >= MAX_SUPPLY) revert AllSoldOut();

            _safeMint(to, id);
            _tokenIdCounter.increment();
        }
    }

    /// @notice allows `TEAM` to airdrop any amount of NFTs to addresses of their choice
    /// @dev only callable by the team and without cost
    /// @param addrs array of addresses which can't be == address(0)
    /// @param amounts array of amounts equal to the amount of addrs which can't be 0
    function airdrop(address[] memory addrs, uint256[] memory amounts)
        public
        isTeam
    {
        if (addrs.length != amounts.length) {
            revert LengthMismatch();
        }

        for (uint256 x = 0; x <= addrs.length - 1; x++) {
            if (addrs[x] == address(0)) {
                revert NonZeroOnly();
            }
            if (amounts[x] == 0) {
                revert NonZeroOnly();
            }

            safeMint(addrs[x], amounts[x], true);
        }
    }

    /// @notice allows TEAM to transfer funds from contract
    /// @dev callable by anyone at any point but always to the TEAM address
    function withdraw() public {
        (bool ok, ) = TEAM.call{value: address(this).balance}("");
        require(ok, "failed to withdraw");
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

    /// @notice adds `who` to the team
    function addTeam(address _who) public isTeam {
        teamAddrs[_who] = true;
    }

    /// @notice gets the next token id to be minted
    function getNextId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
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
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    receive() external payable {}

    fallback() external payable {}
}
