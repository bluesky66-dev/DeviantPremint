import { useEffect, useState } from "react";
import { useContract, useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import Navbar from "../components/navigation/navbar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import abi from "../utils/abi.json";
import { PremintAddr } from "../utils/addr";
import Background from "../components/navigation/background";

export default function Home() {
	const [selectedAmount, setSelectedAmount] = useState(1);
	const [balance, setBalance] = useState(0);
	const [amountSold, setAmountSold] = useState(0);
	const [userAddr, setUserAddr] = useState("");
	const [price, setPrice] = useState(0);
	const [whitelisted, setWhitelisted] = useState(false);
	const [isHidden, setIsHidden] = useState(true);
	const [ethPrice, setEthPrice] = useState();
	const [numChecks, setNumChecks] = useState(0);
	const [hash, setHash] = useState("0x");
	const { data: signer } = useSigner();
	const account = useAccount();

	const sigGiver = "0x7C5D8BC73041B16d6Fac2E3F2a8dE2F6397eC839";

	const premintInstance = useContract({
		address: PremintAddr,
		abi: abi,
		signerOrProvider: signer,
	});

	const domain = {
		name: "Deviants Silver Pass",
		version: "1",
		chainId: 80001,
		verifyingContract: PremintAddr,
	};

	const types = {
		NFT: [
			{
				name: "account",
				type: "address",
			},
		],
	};

	const socials = [
		{
			name: "DeviantsTwitter",
			href: "https://twitter.com/TheDeviantsNFT",
			icon: "/twitter.svg",
		},
		{
			name: "AstraNovaTwitter",
			href: "https://twitter.com/Astra__Nova",
			icon: "/twitter.svg",
		},
		{
			name: "Instagram",
			href: "https://www.instagram.com/astranova",
			icon: "/instagramSvg.svg",
		},
		{
			name: "Medium",
			href: "https://www.medium.com/astranova",
			icon: "/mediumSvg.svg",
		},
		{
			name: "Discord",
			href: "https://www.github.com/astranova",
			icon: "/discordSvg.svg",
		},
	];
	async function getBal(){
		try {
			let balSDK = await premintInstance.balanceOf(
				account.address
			);
			setBalance(balSDK.toNumber());
			let tokenIds = await premintInstance.getNextId();
			setAmountSold(tokenIds.toNumber());
		} catch (e) {}
	};
	async function openWindow() {
		await new Promise(resolve => setTimeout(resolve, 1000));
		window.open("https://testnets.opensea.io/account", "_blank");
	  }

	async function handleMint(e) {
		e.stopPropagation();
		e.preventDefault();

		const bal = await premintInstance.balanceOf(account.address);
		if (bal == 0x01 || selectedAmount === 2) {
			let costCharge = 3500000000000000;
			let receipt = await premintInstance.redeem(
				account.address,
				selectedAmount,
				hash,
				{ value: costCharge }
			);
			console.log(receipt);
			await getBal();
			
			await openWindow();

		} else if (selectedAmount === 1) {
			let receipt = await premintInstance.redeem(
				account.address,
				selectedAmount,
				hash,
				{ value: 0 }
			);
			await getBal();
			console.log(receipt);
			(() => {
        		window.open("https://opensea.io/collections", "_blank");
    		})();
		} else {
			let receipt = await premintInstance.redeem(
				account.address,
				1,
				hash,
				{ value: 0 }
			);
			await getBal();
			console.log(receipt);
			await openWindow();
		}
	}

	function priceSetter() {
		if(balance === 0 && selectedAmount === 0) {
			setSelectedAmount(0)
			setPrice(0)
		}


		if (selectedAmount === 1) {
			if(balance === 0){
				setSelectedAmount(2);
				setPrice(0.0035);
			}else if(balance === 1){
				setSelectedAmount(1);
				setPrice(0.0035);
			}
		} else if (selectedAmount === 2) {
			if(balance === 0){
				setSelectedAmount(1);
				setPrice(0);
			}else if(balance === 1){
				setSelectedAmount(1);
				setPrice(0.0035);
			}
		}
	}

	function priceDecreaser() {
		if(balance === 0 && selectedAmount === 0) {
			setSelectedAmount(1)
			setPrice(0)
		}


		if (selectedAmount === 2) {
			if(balance === 0){
				setSelectedAmount(1);
				setPrice(0);
			}else if(balance === 1){
				setSelectedAmount(1);
				setPrice(0.0035);
			}
		} else if (selectedAmount === 1) {
			if(balance === 0){
				setSelectedAmount(2);
				setPrice(0.0035);
			}else if(balance === 1){
				setSelectedAmount(1);
				setPrice(0.0035);
			}
		}
	}


	function verify() {
		if (userAddr == "" || userAddr == "0x") {
			window.alert("No address entered!");
			return;
		}
		setNumChecks(numChecks + 1);
		const msgParams = {
			account: userAddr,
		};
		try {
			const recovered = ethers.utils.verifyTypedData(
				domain,
				types,
				msgParams,
				hash
			);

			if (recovered == sigGiver) {
				setWhitelisted(true);
			} else {
				setWhitelisted(false);
			}
			setIsHidden(false);
		} catch (e) {
			setIsHidden(false);
			setWhitelisted(false);
		}
	}

	async function getAddrStatus(addr) {
		try {
			const isWL = await fetch(
				`https://dmb-six.vercel.app/api/getSignature?address=${addr}`,
				{ method: "GET" }
			);

			const WL = await isWL.json();

			if (WL.signature !== null) {
				setHash(WL.signature);
			} else if (WL.status === null) {
				console.log("something went wrong fetching the signature.");
			}
		} catch (err) {
			if (err) {
				try {
					setIsHidden(false);
					document.getElementById("wlStatus").style =
						"color: #FE3301";
					document.getElementById("wlStatus").innerHTML =
						"❌ Sorry, there was an issue accessing the server, please try again later!";
				} catch (err) {
					console.log(err);
				}
			}
		}
	}


	useEffect(() => {
		getAddrStatus(account.address);
		try {
			let priceOfEth = async () => {
				try {
					let price = await fetch(
						"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
					);
					let priceObj = await price.json();
					let ethPrice = await priceObj.ethereum.usd;
					setEthPrice(ethPrice);

				} catch (e) {}
			};
			priceOfEth();



			
			getBal();
		} catch (e) {}
		return () => {};
	}, [account, ethPrice, amountSold]);

	function handleAddr(e) {
		e.stopPropagation();
		e.preventDefault();
		setUserAddr(e.target.value.toLowerCase());
	}

	return (
		<>
		<head>
			<title>Deviant Silver Pass</title>
		</head>
			<Background style={{ minHeight: "100vh" }}>
				<Navbar />

				<div className="flex mt-52 h-full relative float-right mr-2 align-middle md:justify-end">
					<ul>
						{socials?.map((item) => (
							<li key={item.name}>
								<a href={item.href}>
									<img
										className="w-8 m-2"
										src={item.icon}
										alt={item.name}
									/>
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="w-full h-full flex flex-col justify-center bottom-0 text-center items-center">


					<div className="w-full relative items-center justify-center text-center">
						<div className="bg-black w-96 border rounded-2xl  border-black">
							<div className="text-white w-auto mt-8 h-auto whitespace-pre font-bold text-2xl">
								Whitelist Checker
							</div>

							<div className="text-gray-500 text-sm w-auto text-center mt-6 h-auto whitespace-pre font-bol">
								Please enter your wallet address to check your
								status
							</div>
							<div className="text-center mt-4 mb-2 p-5 ">
								<input
									type="text"
									placeholder="Wallet Address"
									className="bg-gray-800 w-full text-white hover:bg-gray-900 px-2 py-2 rounded-lg font-thin mb-2"
									onChange={(e) => handleAddr(e)}
								/>

								{isHidden ? (
									<div className="text-gray-300 text-sm w-auto text-center mt-4 h-auto whitespace-pre font-bol"></div>
								) : whitelisted ? (
									<>
										<div
											id="wlStatus"
											className="ml-2 mt-2"
											style={{ color: "#3DDBA9" }}
										>
											✅ Congratulations, you are
											whitelisted!
										</div>
									</>
								) : (
									<>
										<div
											id="wlStatus"
											style={{ color: "#FE3301" }}
											className="ml-2 mt-2 mb-2"
										>
											❌ Sorry, you are not on the
											whitelist.
										</div>
									</>
								)}

								<button
									onClick={() => verify()}
									style={{ backgroundColor: "#FE3301" }}
									className="text-black mb-1 w-36 py-2 px-1 border-red-500 rounded-3xl text-base hover:bg-red-400"
								>
									Check Address
								</button>
							</div>
						</div>
					</div>

					<div className="w-full h-full flex justify-center text-center items-center">
						<div
							className="bottom-10 w-full fixed inline-flex items-center justify-center text-center"
							style={{ width: "494px", height: "439px" }}
						>
							<div className="bg-black w-96 border rounded-2xl bottom-5 border-black">
								<div className="text-white w-auto mt-8 h-auto whitespace-pre font-bolb text-2xl">
									Silver Mint Pass
								</div>
								<div className="text-white mt-8 p-5 grid grid-cols-1 ">
									<CircularProgressbar
										styles={buildStyles({
											pathColor: "#FE3301",
											trailColor: "#132135",
											textColor: "#FE3301",
										})}
										className="h-28 w-28"
										value={amountSold}
										maxValue={5555}
										text={`${(
											(amountSold / 5555) *
											100
										).toPrecision(2)}%`}
									></CircularProgressbar>
									<p className="text-md mt-1 text-slate-500">
										{amountSold}/5555 already minted
									</p>
								</div>
								<div className="justify-between flex p-2"></div>
								<div className="">
									<div className="flex flex-col h-full justify-between">
										<div className="flex flex-row items-center justify-center mt-2">
											<button className="flex mx-auto text-red-500 hover:border-gray-500 hover:text-gray-600 h-10 w-10 justify-center items-center outline-none">
												<span
													className="text-2xl text-white font-thin"
													onClick={() =>
														priceDecreaser()
													}
												>
													−
												</span>
											</button>
											{balance === 0 || balance === 1 ? (<input
												type="select"
												disabled
												className="w-20 font-semibold text-white text-center justify-center align-middle bg-transparent outline-none"
												value={
													selectedAmount
														? selectedAmount.toString()
														: '0'
												}
												
											/>):(
												<input
												type="select"
												disabled
												className="w-20 font-semibold text-white text-center justify-center align-middle bg-transparent outline-none"
												value='0'
												
											/>
											)}
											<button className="flex mx-auto text-red-500 hover:border-gray-500 hover:text-gray-600 h-10 w-10 justify-center items-center outline-none">
												<span
													className="text-2xl text-white font-thin"
													onClick={() =>
														priceSetter()
													}
												>
													+
												</span>
											</button>
										</div>
									</div>
									{balance === 1 ? (
										<div className="text-xl my-1 text-white text-center">
											Total Cost: {0.0035}Ξ{" "}
											<div className="inline-flex text-slate-500">
												(
												{`$${(
													ethPrice * 0.0035
												).toPrecision(3)} USD`}
												)
											</div>
										</div>
									) : (
										<div className="text-xl my-1 text-white text-center">
											Total Cost: {price ? price : 0}Ξ{" "}
											<div className="inline-flex text-slate-500">
												(
												{`$${(
													ethPrice * price
												).toPrecision(3)} USD`}
												)
											</div>
										</div>
									)}

									<button
										className="text-black mb-8 mt-2 w-36 py-2 px-1 bg-red rounded-3xl text-base hover:bg-red-400 disabled:bg-slate-800 disabled:cursor-not-allowed"
										onClick={(e) => handleMint(e)}
										disabled={balance === 2 ? true : false}
									>
										Mint Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Background>
		</>
	);
}
