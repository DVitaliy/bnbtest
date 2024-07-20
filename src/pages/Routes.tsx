// import App from './App.tsx'
import TokenDetails from './TokenDetails.tsx'

import {
  createBrowserRouter,
} from "react-router-dom"
// import ComingSoon from '../components/ComingSoon'

const pages: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <>Hola</>,
    // element: <><ComingSoon /><App /></>,
  },
  {
    path: "token/:tokenId",
    element: <TokenDetails />,
  },
]);

export default pages