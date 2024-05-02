import React from 'react';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

// Define an interface for the component props
interface WalletConnectButtonProps {
    className: string;
    onConnect: (account: string) => void; // Define the type of the onConnect function
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ className, onConnect }) => {
    const connectWallet = async () => {
        // Initialize WalletConnect provider with options
        const provider = new WalletConnectProvider({
            rpc: {
                // Sepolia's public RPC URL
                11155111: 'https://ethereum-sepolia-rpc.publicnode.com'
            },
            chainId: 11155111, // Sepolia's chain ID
            bridge: "https://bridge.walletconnect.org" // Default bridge
        });

        try {
            // Enable session (triggers QR Code modal)
            await provider.enable();

            const web3 = new Web3(provider);

            // Get accounts
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                const account = accounts[0];
                // Handle the wallet connection
                console.log("Connected to account:", account);
                if (onConnect) {
                    onConnect(account);
                }
            } else {
                console.error("No accounts found");
            }
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    };

    return (
        <button onClick={connectWallet} className={className}>
            Sign in with WalletConnect
        </button>
    );
};

export default WalletConnectButton;
