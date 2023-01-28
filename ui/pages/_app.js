import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { darkTheme, getDefaultWallets, RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, useConnect } from "wagmi";
import { polygonMumbai, foundry } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import MainLayout from "../layout/mainLayout";


const { chains, provider } = configureChains(
	[polygonMumbai],
	[
		alchemyProvider({ apiKey: 'TM_2HoUNaGB5IX6grUxMx9dWOti85Kff', infuraId: 'ded2c8aa580d44d2b63c2b88c03fe3a3' }),
		publicProvider(),
	],
	jsonRpcProvider
);

const { wallets } = getDefaultWallets({
	appName: "My Alchemy DApp",
	chains,
});

const connectors = connectorsForWallets([
	...wallets,
])



const wagmiClient = createClient({
	autoConnect: true,
	wallets,
	provider,
	connectors
});

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {

	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider modalSize="large" coolMode chains={chains} theme={darkTheme({
				accentColor: "#FF3300"
			})}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
