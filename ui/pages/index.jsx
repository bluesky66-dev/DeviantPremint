import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useContract, useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";

export default function Home() {
	const [selectedAmount, setSelectedAmount] = useState(1);
	const [userAddr, setUserAddr] = useState("");
	const [addrs, setAddrs] = useState("");
	const [amounts, setAmounts] = useState(0);
	const [price, setPrice] = useState(0);
	const [whitelisted, setWhitelisted] = useState(false);
	const [numChecks, setNumChecks] = useState(0);
	const [wlAddr, setWlAddr] = useState('');
	const [hash, setHash] = useState(null);
	const { data: signer } = useSigner();
	const account = useAccount();

	const sigGiver = '0x7C5D8BC73041B16d6Fac2E3F2a8dE2F6397eC839';

	const premintInstance = useContract({
		address: "0x5966ad8d46B416811b10b836832D789113F08ee6",
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
		signerOrProvider: signer,
	});

	async function handleAirdrop(e) {
		e.stopPropagation();
		e.preventDefault();

		if (!addrs || !amounts) {
			console.log("address or amount error");
		}

		let receipt = await premintInstance.airdrop(addrs, amounts);
		console.log(receipt);
	}

	function collectAddressArray(addressArray) {
		addressArray = addressArray.split(",");
		setAddrs(addressArray);
		console.log(addressArray);
	}

	function collectAmountArray(amountArray) {
		amountArray = amountArray.split(",");
		setAmounts(amountArray);
		console.log(amountArray);
	}



	const domain = {
		name: "Deviants Silver Pass",
		version: "1",
		chainId: 80001,
		verifyingContract: "0x5966ad8d46B416811b10b836832D789113F08ee6",
	};

	const types = {
		NFT: [
			{
				name: "account",
				type: "address",
			},
		],
	};

	async function handleMint(e) {
		e.stopPropagation();
		e.preventDefault();

		const bal = await premintInstance.balanceOf(account.address);
		if (bal == 0x01) {
			let costCharge = 3500000000000000;
			let receipt = await premintInstance.redeem(
				account.address,
				selectedAmount,
				hash,
				{ value: costCharge }
			);
			console.log(receipt);
		} else {
			let receipt = await premintInstance.redeem(
				account.address,
				selectedAmount,
				hash,
				{ value: 0 }
			);
			console.log(receipt);
		}
	}

	function priceSetter() {
		if (selectedAmount == 1) {
			setSelectedAmount(2);
			setPrice(0.0035);
		} else if (selectedAmount == 2) {
			setSelectedAmount(1);
			setPrice(0);
		}
	}

	function priceDecreaser() {
		if (selectedAmount == 2) {
			setSelectedAmount(1);
			setPrice(0);
		} else {
			setSelectedAmount(2);
			setPrice(0.0035);
		}
	}

	function verify() {
		setNumChecks(numChecks+1);
		const msgParams = {
			account: account.address,
		};
		try{
			const recovered = ethers.utils.verifyTypedData(
				domain,
				types,
				msgParams,
				hash
			);
			
			if(recovered == sigGiver) {
				setWhitelisted(true);
				alert("Whitelist status: You're in!")
			}else{
				setWhitelisted(false);
				alert("Whitelist status: You never made the cut!")
			}
		}catch(e){
			setWhitelisted(false);
			alert("Whitelist status: You never made the cut!")
		}
	}

	async function getAddrStatus(addr) {
		const isWL = await fetch(`https://dmb-six.vercel.app/api/getSignature?address=${addr}`, {method:'GET'})
		
		const WL = await isWL.json();

		if(WL.signature !== null){
			setWhitelisted(true)
			setHash(WL.signature);
		}else if(WL.status === 205){
			setWhitelisted(false)
		}
	}

	useEffect(() => {
		getAddrStatus(account.address);
	},[account])


	return (
		<div>
			<div>
				<div>
					<header className="">
						<h1 className="text-3xl mt-10 pt-14 text-yellow-400 text-left font-medium ">
							🔥 Whitelist Checker 🔥
						</h1>
					</header>
					<div>
						<div>
							<div className="w-2/5">

								<div className="flex">
								<button
									onClick={(e) => {
										verify(e);
									}}
									className="w-36 p-3 rounded-2xl text-white bg-gradient-to-t from-red-400 to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-red-500"
								>
									Check Status
								</button>
								{/* Ticker that counts how many times the check status button has been clicked */}
									<div className="ml-5 p-3 border rounded-2xl bg-gradient-to-t from-red-400 to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-red-500">
									<p className="text-base text-white font-semibold">
									Number of Checks: {numChecks}
									</p>										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<main className={styles.main}>
				<div className="container mt-5  mx-auto w-44 items-center text-center bg-red-600 bg-opacity-25">
					<div className="">
						<div className="container border p-2">
							<div className="flex flex-col h-full justify-between">
								<div className="text-center text-white text-xl">
									Pass Quantity:
									<div className="flex flex-row items-center justify-center mt-2">
										<button className="flex mx-auto text-gray-500 border rounded border-gray-400 hover:border-gray-500 hover:text-gray-600 h-10 w-10 justify-center items-center outline-none">
											<span
												className="text-2xl text-white font-thin"
												onClick={() => priceDecreaser()}
											>
												−
											</span>
										</button>
										<input
											type="number"
											className="w-20 font-semibold text-white text-center justify-center align-middle text-gray-700 bg-red-200 outline-none focus:bg-white hover:text-black focus:text-black"
											value={
												selectedAmount
													? selectedAmount.toString()
													: "0"
											}
											onChange={() => {
												setSelectedAmount(
													e.target.value
												);
											}}
										/>
										<button className="flex text-red-500 border rounded border-gray-400 hover:border-gray-500 hover:text-gray-600 h-10 w-10 justify-center items-center outline-none">
											<span
												className="text-2xl text-white font-thin"
												onClick={() => priceSetter()}
											>
												+
											</span>
										</button>
									</div>
								</div>
								<div className="text-xl text-white text-center">
									Price: {price ? price : "0"}Ξ
								</div>

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
