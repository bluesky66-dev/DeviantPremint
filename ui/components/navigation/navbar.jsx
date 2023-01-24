import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect, useState } from "react";
import {
	useContract,
	useAccount,
	useSigner
} from "wagmi";
import { ethers } from "ethers";



export default function Navbar() {
	const { asPath } = useRouter()
	const account = useAccount()
	const {data: signer} = useSigner()
	const [admin, setAdmin] = useState(false);
	const premintInstance = useContract({
		address: '0xb46621a17DD1e80BbB8940804509E5222D7c749b',
		abi: [
			{
			  "inputs": [],
			  "stateMutability": "nonpayable",
			  "type": "constructor"
			},
			{
			  "inputs": [],
			  "name": "AllSoldOut",
			  "type": "error"
			},
			{
			  "inputs": [],
			  "name": "LengthMismatch",
			  "type": "error"
			},
			{
			  "inputs": [],
			  "name": "MaxOfTwo",
			  "type": "error"
			},
			{
			  "inputs": [],
			  "name": "NonZeroOnly",
			  "type": "error"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "uint256",
				  "name": "passId",
				  "type": "uint256"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "airdroppedTo",
				  "type": "address"
				}
			  ],
			  "name": "Airdropped",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "owner",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "approved",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				}
			  ],
			  "name": "Approval",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "owner",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "operator",
				  "type": "address"
				},
				{
				  "indexed": false,
				  "internalType": "bool",
				  "name": "approved",
				  "type": "bool"
				}
			  ],
			  "name": "ApprovalForAll",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "uint256",
				  "name": "passId",
				  "type": "uint256"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "account",
				  "type": "address"
				}
			  ],
			  "name": "PassMinted",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "bytes32",
				  "name": "role",
				  "type": "bytes32"
				},
				{
				  "indexed": true,
				  "internalType": "bytes32",
				  "name": "previousAdminRole",
				  "type": "bytes32"
				},
				{
				  "indexed": true,
				  "internalType": "bytes32",
				  "name": "newAdminRole",
				  "type": "bytes32"
				}
			  ],
			  "name": "RoleAdminChanged",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "bytes32",
				  "name": "role",
				  "type": "bytes32"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "account",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "sender",
				  "type": "address"
				}
			  ],
			  "name": "RoleGranted",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "bytes32",
				  "name": "role",
				  "type": "bytes32"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "account",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "sender",
				  "type": "address"
				}
			  ],
			  "name": "RoleRevoked",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "from",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "internalType": "address",
				  "name": "to",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				}
			  ],
			  "name": "Transfer",
			  "type": "event"
			},
			{
			  "stateMutability": "payable",
			  "type": "fallback"
			},
			{
			  "inputs": [],
			  "name": "DEFAULT_ADMIN_ROLE",
			  "outputs": [
				{
				  "internalType": "bytes32",
				  "name": "",
				  "type": "bytes32"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "contract IERC20",
				  "name": "_token",
				  "type": "address"
				}
			  ],
			  "name": "ERC20Rescue",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "MAX_MINT",
			  "outputs": [
				{
				  "internalType": "uint256",
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "MAX_SUPPLY",
			  "outputs": [
				{
				  "internalType": "uint256",
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "MINTER_ROLE",
			  "outputs": [
				{
				  "internalType": "bytes32",
				  "name": "",
				  "type": "bytes32"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "PRICE",
			  "outputs": [
				{
				  "internalType": "uint256",
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "TEAM",
			  "outputs": [
				{
				  "internalType": "address",
				  "name": "",
				  "type": "address"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "bytes32",
				  "name": "structHash",
				  "type": "bytes32"
				}
			  ],
			  "name": "_hashTypedDataV4",
			  "outputs": [
				{
				  "internalType": "bytes32",
				  "name": "",
				  "type": "bytes32"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address[]",
				  "name": "addrs",
				  "type": "address[]"
				},
				{
				  "internalType": "uint256[]",
				  "name": "amounts",
				  "type": "uint256[]"
				}
			  ],
			  "name": "airdrop",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "to",
				  "type": "address"
				},
				{
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				}
			  ],
			  "name": "approve",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "owner",
				  "type": "address"
				}
			  ],
			  "name": "balanceOf",
			  "outputs": [
				{
				  "internalType": "uint256",
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				}
			  ],
			  "name": "getApproved",
			  "outputs": [
				{
				  "internalType": "address",
				  "name": "",
				  "type": "address"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "bytes32",
				  "name": "role",
				  "type": "bytes32"
				}
			  ],
			  "name": "getRoleAdmin",
			  "outputs": [
				{
				  "internalType": "bytes32",
				  "name": "",
				  "type": "bytes32"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "bytes32",
				  "name": "role",
				  "type": "bytes32"
				},
				{
				  "internalType": "address",
				  "name": "account",
				  "type": "address"
				}
			  ],
			  "name": "grantRole",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "bytes32",
				  "name": "role",
				  "type": "bytes32"
				},
				{
				  "internalType": "address",
				  "name": "account",
				  "type": "address"
				}
			  ],
			  "name": "hasRole",
			  "outputs": [
				{
				  "internalType": "bool",
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "owner",
				  "type": "address"
				},
				{
				  "internalType": "address",
				  "name": "operator",
				  "type": "address"
				}
			  ],
			  "name": "isApprovedForAll",
			  "outputs": [
				{
				  "internalType": "bool",
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "name",
			  "outputs": [
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				}
			  ],
			  "name": "ownerOf",
			  "outputs": [
				{
				  "internalType": "address",
				  "name": "",
				  "type": "address"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "account",
				  "type": "address"
				},
				{
				  "internalType": "uint256",
				  "name": "amount",
				  "type": "uint256"
				},
				{
				  "internalType": "bytes",
				  "name": "signature",
				  "type": "bytes"
				}
			  ],
			  "name": "redeem",
			  "outputs": [
				{
				  "internalType": "bool",
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "stateMutability": "payable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "bytes32",
				  "name": "role",
				  "type": "bytes32"
				},
				{
				  "internalType": "address",
				  "name": "account",
				  "type": "address"
				}
			  ],
			  "name": "renounceRole",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "bytes32",
				  "name": "role",
				  "type": "bytes32"
				},
				{
				  "internalType": "address",
				  "name": "account",
				  "type": "address"
				}
			  ],
			  "name": "revokeRole",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "from",
				  "type": "address"
				},
				{
				  "internalType": "address",
				  "name": "to",
				  "type": "address"
				},
				{
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				}
			  ],
			  "name": "safeTransferFrom",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "from",
				  "type": "address"
				},
				{
				  "internalType": "address",
				  "name": "to",
				  "type": "address"
				},
				{
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				},
				{
				  "internalType": "bytes",
				  "name": "data",
				  "type": "bytes"
				}
			  ],
			  "name": "safeTransferFrom",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "operator",
				  "type": "address"
				},
				{
				  "internalType": "bool",
				  "name": "approved",
				  "type": "bool"
				}
			  ],
			  "name": "setApprovalForAll",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "string",
				  "name": "baseURI_",
				  "type": "string"
				}
			  ],
			  "name": "setBaseURI",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "bytes4",
				  "name": "interfaceId",
				  "type": "bytes4"
				}
			  ],
			  "name": "supportsInterface",
			  "outputs": [
				{
				  "internalType": "bool",
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "symbol",
			  "outputs": [
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "",
				  "type": "address"
				}
			  ],
			  "name": "teamAddrs",
			  "outputs": [
				{
				  "internalType": "bool",
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				}
			  ],
			  "name": "tokenURI",
			  "outputs": [
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "from",
				  "type": "address"
				},
				{
				  "internalType": "address",
				  "name": "to",
				  "type": "address"
				},
				{
				  "internalType": "uint256",
				  "name": "tokenId",
				  "type": "uint256"
				}
			  ],
			  "name": "transferFrom",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "withdraw",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "stateMutability": "payable",
			  "type": "receive"
			}
		  ],
		signerOrProvider: signer
	});

useEffect(() => {
	async function run() {
			const isAdmin = await premintInstance.teamAddrs(account.address);
			console.log(isAdmin, "isAdmin")
				setAdmin(isAdmin);
		}
		run()
}, [account]);

	return (
		<nav className={styles.navbar}>
			<a href="/">
			<div className="w-12 h-12">
	                      <Image
                            src='/deviantLogo.svg'
                            alt="deviantLogo Logo"
							width={45}
							height={45}
                            style={{  display: 'block', objectFit: "contain", objectPosition: 'center' }}
							/>
                    </div>
			</a>
			{admin ? <Link href="admin">
				<button className="w-24 h-14 mb-4 ml-5 rounded-2xl text-lg p-3 bg-gradient-to-t from-red-400 to-red-700 items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inset focus:ring-red-500 focus:ring-offset-red-300"
				>
				Admin
			</button>
			</Link>
			: null
			}

			<div>
			<ConnectButton/>
			</div>
		</nav>
	);
}
