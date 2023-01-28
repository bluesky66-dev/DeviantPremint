import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Image from 'next/image'



export default function Navbar() {
	return (
		
		<nav className={styles.navbar}>
			<a href="/">
			<div className="w-36 h-36">
	                      <Image
                            src='/logo.svg'
                            alt="deviantLogo Logo"
							width={120}
							height={120}
                            style={{  display: 'flex', objectFit: "contain", objectPosition: 'center' }}
							/>
							
                    </div>
			</a>
			<ConnectButton/>
		</nav>
	);
}
