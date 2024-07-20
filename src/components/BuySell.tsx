import { useEffect, useState } from "react"
import { useThePoolz, type TContract } from "../poolz";
import BigNumber from "bignumber.js"

function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return <button {...props} className={`font-poppins text-black font-extrabold capitalize bg-white ${props.className}`}>{props.children}</button>
}

function BigButton(props: React.ComponentPropsWithoutRef<"button">) {
  return <Button {...props} className={`h-12 text-sm ${props.className}`}>{props.children}</Button>
}
function SmallButton(props: React.ComponentPropsWithoutRef<"button">) {
  return <Button {...props} className={`h-8 text-xs ${props.className}`}>{props.children}</Button>
}


function BuySell() {
  const thePoolz = useThePoolz()
  const { account } = thePoolz
  const [swapMode, setSwapMode] = useState<"buy" | "sell">('buy')
  const [BNBPartyFactoryContract, setBNBPartyFactoryContract] = useState<TContract | undefined>()
  const [inputVal, setInputVal] = useState("0")
  const [selectedToken/*, setSelectedToken*/] = useState<{ address: string, decimals: number }>()

  const handleSwapMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSwapMode(e.currentTarget.dataset.swapkey as "buy" | "sell")
  }

  const changeInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if (!value) return setInputVal("")

    const bn = BigNumber(value)
    if (bn.isNaN()) return

    const toWei = bn.multipliedBy(BigNumber(10).pow(selectedToken?.decimals ?? 18)).toString()
    if (toWei.includes(".")) return

    setInputVal(value)
  }

  const handleTradeButton = async () => {
    if (!BNBPartyFactoryContract) throw new Error(`Contract not installed`)

    if (swapMode === "buy") {
      try {
        await BNBPartyFactoryContract.methods
          .joinParty("0x58673562ee62ca7dfd8bc5570629bd2b521a2756", '0')
          .send({ from: account, value: thePoolz.web3.utils.toWei(inputVal, "ether") })
      } catch (e) {
        console.error(e)
      }
    } else {

    }
  }

  useEffect(() => {
    const loadContract = async () => {
      const contract = await thePoolz.getContract("BNBPartyFactory")
      setBNBPartyFactoryContract(contract)
    }
    loadContract()
  }, [thePoolz, setBNBPartyFactoryContract])


  return (
    <div className='flex flex-col gap-y-4 bg-[#2a2b3294] p-4' data-swapmode={swapMode}>
      <div className='flex gap-x-2'>
        <BigButton onClick={handleSwapMode} className="basis-1/2" data-swapkey="buy">buy</BigButton>
        <BigButton onClick={handleSwapMode} className="basis-1/2" data-swapkey="sell">sell</BigButton>
      </div>
      <div className="flex font-hand text-lg flex-col gap-y-2">
        <span className="capitalize">{swapMode} Amount</span>
        <div className="flex items-center border border-[#606060] bg-[#2a2b32] px-4 h-12">
          <input type="text" placeholder="0.0" className="bg-transparent w-full outline-none hover:bg-[#1A192B] focus:bg-[#1A192B] px-1" value={inputVal} onChange={changeInputHandler} />
          <span>BNB</span>
        </div>
        <div className="flex justify-between gap-x-2">
          <SmallButton className="basis-1/4">reset</SmallButton>
          <SmallButton className="basis-1/4">1</SmallButton>
          <SmallButton className="basis-1/4">2</SmallButton>
          <SmallButton className="basis-1/4">3</SmallButton>
        </div>
      </div>
      <BigButton onClick={handleTradeButton}>Place Trade</BigButton>
    </div>
  )
}

export default BuySell
