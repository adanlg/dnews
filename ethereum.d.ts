// ethereum.d.ts
import { ExternalProvider } from '@ethersproject/providers';

interface EthereumProvider extends ExternalProvider {
    isMetaMask?: boolean;
    // any other properties or methods you need
}

declare global {
    interface Window {
        ethereum?: EthereumProvider;
    }
}
