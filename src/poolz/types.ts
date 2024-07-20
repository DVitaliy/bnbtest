import Web3, {
  type Web3APISpec,
  type Contract,
  type ContractAbi,
  type EIP1193Provider,
  NumberTypes,
  FMT_NUMBER
} from "web3"

export type TContract = Contract<ContractAbi>
export interface IThePoolzContext {
  thePoolz: IThePoolz
  setProvider: React.Dispatch<React.SetStateAction<EIP1193Provider<Web3APISpec> | undefined>>
}

export interface IThePoolz {
  web3: Web3
  chainId: number
  account?: string
  balance?: NumberTypes[FMT_NUMBER.STR]
  getContract: (name: string) => Promise<TContract | undefined>

  ERC20Balance(token: string, account: string): Promise<string>
  ERC20Info(token: string): Promise<{
    name: string
    symbol: string
    decimals: number
  }>
  ERC20Allowance(token: string, account: string, spender: string): Promise<string>
  ERC20Approve(token: string, account: string, spender: string, amount: string): Promise<unknown>
}

export type TExternalContract = {
  chains: number[]
  address: string[]
  abi: ContractAbi | (() => Promise<ContractAbi>) // | string -> fetch
}

export interface IProviderConfig {
  readonly externalContracts?: { [contractName in string]: TExternalContract }
}
