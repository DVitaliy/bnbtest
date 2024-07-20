import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './pages/Routes'
import {
  RouterProvider,
} from "react-router-dom"
import ConnectWallet from './components/ConnectWallet'
import { ThePoolzProvider } from './poolz'
import './index.css'


if (import.meta.env.PROD && !~location.hash.indexOf("debug")) console.log = () => { }

const externalContracts = {
  "BNBPartyFactory": {
    chains: [97],
    address: ["0xc749a516dd2e69f3475a93dc012220ce5159b42d"],
    abi: async () => (await import('./abi/BNBPartyFactory.json')).default,
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThePoolzProvider config={{ externalContracts }}>
      <ConnectWallet />
      <RouterProvider router={Routes} />
    </ThePoolzProvider>
  </React.StrictMode>,
)
