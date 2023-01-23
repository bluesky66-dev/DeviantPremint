import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [selectedAmount, setSelectedAmount] = useState(1);
	const [price, setPrice] = useState(0);

	function handlePrice(e) {
		setPrice(e.target.value)
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

	return (
		<div>
			<header className={styles.header_container}>
				<div className={styles.logo_container}></div>
			</header>
			<main className={styles.main}>
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
									onClick={() => alert("Sent to wallet")}
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
