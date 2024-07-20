import { type IThePoolz, type IProviderConfig /*, type TExternalContract*/ } from "./types"
import Web3, { Contract, ContractAbi, FMT_BYTES, FMT_NUMBER, Web3APISpec, EIP1193Provider } from "web3"
import ERC20 from "./abi/ERC20.json"

class ThePoolz implements IThePoolz {
  public web3: IThePoolz["web3"]
  public chainId: IThePoolz["chainId"] = 1
  public account: IThePoolz["account"]
  public balance: IThePoolz["balance"]

  #contracts = new Map<string, Contract<ContractAbi>>()
  #config: IProviderConfig | undefined

  constructor(provider: EIP1193Provider<Web3APISpec> | undefined) {
    this.web3 = new Web3(provider)
  }

  async init(config?: IProviderConfig) {
    await Promise.allSettled([this.initChainId(), this.initAccount(), this.initConfig(config)])
    await this.getBalance()
  }
  private async initChainId() {
    const chainId = await this.web3.eth.getChainId<{ number: FMT_NUMBER.NUMBER; bytes: FMT_BYTES.HEX }>()
    this.chainId = Number(chainId)
  }
  private async initAccount() {
    const accounts = await this.web3.eth.getAccounts()
    this.account = accounts[0]
  }
  private async initConfig(config?: IProviderConfig) {
    if (!config) return
    this.#config = config
  }

  private async getBalance() {
    if (!this.account) return
    this.balance = await this.web3.eth.getBalance<{ number: FMT_NUMBER.STR; bytes: FMT_BYTES.HEX }>(this.account)
  }

  public async getContract(name: string) {
    if (!this.#config?.externalContracts) return

    const contractDetails = this.#config.externalContracts[name]
    if (!contractDetails) throw new Error(`Contract ${name} not found`)

    const { chains, address, abi } = contractDetails
    const indexChain = chains.indexOf(this.chainId)
    const chainAvailable = !!~indexChain
    if (!chainAvailable) return

    const cacheData = this.#contracts.get(name + address[indexChain])
    if (cacheData) return cacheData

    const abiData = typeof abi === "function" ? await abi() : abi

    const contract = new this.web3.eth.Contract(abiData, address[indexChain])
    this.#contracts.set(name + address[indexChain], contract)
    return contract
  }

  private ERC20(token: string) {
    const cache = this.#contracts.get(token)
    if (cache) return cache

    const contract = new this.web3.eth.Contract(ERC20, token)
    this.#contracts.set(token, contract)
    return contract
  }

  public async ERC20Balance(token: string, account: string) {
    const balance = (await this.ERC20(token).methods.balanceOf(account).call()) as bigint
    return balance.toString()
  }

  public async ERC20Info(token: string) {
    const ERC20Contract = this.ERC20(token)

    const [name, symbol, decimals] = await Promise.all([
      ERC20Contract.methods.name().call() as Promise<string>,
      ERC20Contract.methods.symbol().call() as Promise<string>,
      ERC20Contract.methods.decimals().call() as Promise<string>
    ])

    return { name, symbol, decimals: Number(decimals) }
  }

  public async ERC20Allowance(token: string, account: string, spender: string) {
    return this.ERC20(token).methods.allowance(account, spender).call() as Promise<string>
  }

  public async ERC20Approve(token: string, account: string, spender: string, amount: string) {
    return this.ERC20(token).methods.approve(spender, amount).send({ from: account })
  }

  public static get givenProvider() {
    if (window.ethereum)
      if ("selectedProvider" in window.ethereum) return window.ethereum.selectedProvider
      else return window.ethereum as EIP1193Provider<Web3APISpec>
    return undefined
  }
}
export default ThePoolz
