import { createContext, useContext } from "react"
import { type IThePoolzContext } from "./types"

const ThePoolzContext = createContext<IThePoolzContext>(null as any)
export const useThePoolz = () => {
  const { thePoolz } = useContext(ThePoolzContext)
  return thePoolz
}

export const useSetProvider = () => {
  const { setProvider } = useContext(ThePoolzContext)
  return setProvider
}
export default ThePoolzContext
