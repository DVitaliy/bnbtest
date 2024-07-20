import ChartIframe from '../components/ChartIframe'
import BuySell from '../components/BuySell'
import { useParams } from 'react-router-dom'
import { useThePoolz } from '../poolz'
import { useEffect, useState } from 'react'

function TokenDetails() {
  const [mockTokenDetails, setMockTokenDetails] = useState<{ tokenAddress: string }>()
  const { tokenId } = useParams()
  const thePoolz = useThePoolz()

  useEffect(() => {
    if (tokenId)
      setMockTokenDetails({ tokenAddress: "0x58673562ee62ca7dfd8bc5570629bd2b521a2756" })

    const erc20Info = async () => {
      if (!thePoolz.account) return
      const tokenDetails = await thePoolz.ERC20Info("0x58673562ee62ca7dfd8bc5570629bd2b521a2756")
      const balance = await thePoolz.ERC20Balance("0x58673562ee62ca7dfd8bc5570629bd2b521a2756", thePoolz.account)
      // const allowance = await thePoolz.ERC20Allowance()
      console.log(balance, tokenDetails)
    }
    erc20Info()
  }, [tokenId, thePoolz])

  if (!mockTokenDetails) return <div>Loading...</div>

  return (
    <div className='grid grid-cols-1 md:grid-cols-[55%_1fr] gap-4'>
      <div className='col-[1_/_-1]'>Token details: {mockTokenDetails.tokenAddress}
        <pre>
          {typeof window.ethereum}
          <br />
          {(window.ethereum ?? "not").toString()}

        </pre>
      </div>
      <div>ChartIframe
        <ChartIframe />
      </div>
      <div><BuySell /></div>
    </div>
  )
}

export default TokenDetails
