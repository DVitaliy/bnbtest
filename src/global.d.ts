import { EIP1193Provider, Web3APISpec } from "web3"

declare global {
  interface EthereumProvider<API extends Web3APISpec> {
    isMetaMask?: boolean
    isCoinbaseWallet?: boolean
    isTrustWallet?: boolean
    overrideIsMetaMask?: boolean
    providerMap?: Record<string, unknown>
    providers?: EIP1193Provider<API>[]
    selectedProvider?: EIP1193Provider<API>
    request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    send?: (args: { method: string; params?: unknown[] }) => Promise<{ result: unknown }>
    sendAsync?: (
      args: { method: string; params?: unknown[] },
      callback: (error: Error, result: { result: unknown }) => void
    ) => void
  }
  interface Window {
    ethereum?: EthereumProvider<Web3APISpec> | EIP1193Provider<Web3APISpec>
  }
}

export {}
