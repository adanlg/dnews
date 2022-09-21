import { httpsCallable } from '@firebase/functions';
import { MoralisAuth } from './getMoralisAuth';
import { NetworkType } from './NetworkType';

export interface RequestEvmMessageParams {
  /**
   * @description Network type.
   * @example "evm"
   */
  networkType: 'evm';

  /**
   * @description Wallet address.
   * @example "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"
   */
  address: string;

  /**
   * @description Chain ID.
   * @example "0x1"
   * @example 0x1
   */
  chain: string | number;
}

export interface RequestSolanaMessageParams {
  /**
   * @description Network type.
   * @example "solana"
   */
  networkType: 'solana';

  /**
   * @description Solana wallet address.
   * @example "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
   */
  address: string;

  /**
   * @description Solana network type.
   * @example "mainnet"
   */
  network: 'mainnet' | 'devnet';
}

export interface SignInContext {
  /**
   * @description Network type.
   * @example "evm"
   * @example "solana"
   */
  networkType: NetworkType;

  /**
   * @description Message to sign by user's wallet.
   */
  message: string;

  /**
   * @description Unique user id.
   */
  uid: string;
}

interface RequestMessageRawResponse {
  id: string;
  message: string;
  profileId: string;
}

export async function requestMessage(
  auth: MoralisAuth,
  params: RequestEvmMessageParams | RequestSolanaMessageParams,
): Promise<SignInContext> {
  const functionName = auth.functionNamePrefix.concat('requestMessage');
  const response = await httpsCallable<unknown, RequestMessageRawResponse>(auth.functions, functionName)(params);
  return {
    networkType: params.networkType,
    message: response.data.message,
    uid: response.data.profileId,
  };
}
