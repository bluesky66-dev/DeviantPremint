import { useState } from "react";
import styles from "../styles/Home.module.css";
import abi from "../utils/abi.json";
import addr from "../utils/addr.js";
import {
	useContract,
	useAccount,
	useSigner,
} from "wagmi";
import { ethers } from "ethers";


export default function Home() {
	const [selectedAmount, setSelectedAmount] = useState(1);
	const [price, setPrice] = useState(0);
	const [hash, setHash] = useState(null);
	const {data: signer} = useSigner();
	const account = useAccount();

	const premintInstance = useContract({
		address: '0x6241E4732147C5Ed2B6C1C602286D78a26b704fa',
		abi: [
			{
			  "inputs": [],
			  "stateMutability": "nonpayable",
			  "type": "constructor"
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
		signerOrProvider: signer,
	});

	async function handleMint(e) {
		e.stopPropagation();
		e.preventDefault();
		console.log(premintInstance)
		let receipt = await premintInstance.redeem(account.address, hash);
		console.log(receipt);
	}

	function priceSetter() {
		if(selectedAmount == 1) {
			setSelectedAmount(2)
			setPrice(0.0035)
		}else if(selectedAmount == 2) {
			setSelectedAmount(1)
			setPrice(0)
		}
	}

	function priceDecreaser() {
		if(selectedAmount == 2) {
			setSelectedAmount(1)
			setPrice(0)
		}else{
			setSelectedAmount(2)
			setPrice(0.0035)
		}
	}

	async function handleSignature(e) {
		e.stopPropagation();
		e.preventDefault();

		
		const msgParams = {
			account: '0x64349b7064c539187D79e3775823D713560c2e43',
		}



		const domain = {
			name: 'Deviants Silver Pass',
			version: '1',
			chainId: 80001,
			verifyingContract: '0x6241E4732147C5Ed2B6C1C602286D78a26b704fa'
		}




		const types = {
			NFT: [
				{
					name: 'account', type: 'address',
				},
			],
		} 

		try {
			const sign = await signer._signTypedData(domain, types, msgParams);
			console.log(sign);
			setHash(sign);

			const recovered = ethers.utils.verifyTypedData(
				domain,
				types,
				msgParams,
				sign
			)

			console.log("Recovered signer: " + recovered)
		} catch(err) {
			console.log(err);
		}
	}



	return (
		<div>
			<header className={styles.header_container}>
				<div className={styles.logo_container}></div>
			</header>
			<main className={styles.main}>
				<div className="flex">
				<button className="w-24 mb-4 rounded-lg p-3 bg-gradient-to-t from-red-400 to-red-700 items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inset focus:ring-red-500 focus:ring-offset-red-300"
						onClick={(e) => handleSignature(e)}
					> sign </button>
					
					</div>
				<div className="container mx-auto w-44 items-center text-center bg-red-600 bg-opacity-25">
					<div className="">
						<div className="container border p-2">
							<div className="flex flex-col h-full justify-between">
								<div className="text-center text-white text-xl">
									Pass Quantity:
									<div className="flex flex-row items-center justify-center mt-2">
										<button className="flex mx-auto text-gray-500 border rounded border-gray-400 hover:border-gray-500 hover:text-gray-600 h-10 w-10 justify-center items-center outline-none">
											<span className="text-2xl text-white font-thin" onClick={() => priceDecreaser()}>
												−
											</span>
										</button>
										<input
											type="number"
											className="w-20 font-semibold text-white text-center justify-center align-middle text-gray-700 bg-red-200 outline-none focus:bg-white hover:text-black focus:text-black"
											value={selectedAmount}
										/>
										<button className="flex text-red-500 border rounded border-gray-400 hover:border-gray-500 hover:text-gray-600 h-10 w-10 justify-center items-center outline-none"
										>
											<span className="text-2xl text-white font-thin" onClick={() => priceSetter()}>
												+
											</span>
										</button>
									</div>
								</div>
								{/* price */}
								<div className="text-xl text-white text-center">
									Price: {price ? price : "0"}Ξ
								</div>

								{/* Buy Button */}
								<button
									className="bg-red-500 text-white mb-1 w-full py-2 px-1 border border-red-200 rounded text-base hover:bg-red-400"
									onClick={(e) => handleMint(e)}
								>
									Mint Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
