import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Image from 'next/image'
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
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
			<ConnectButton></ConnectButton>
		</nav>
	);
}
