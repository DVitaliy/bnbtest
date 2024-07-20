import ThePoolz from "./ThePoolz"
import ThePoolzProvider from "./Provider"
import { useThePoolz, useSetProvider } from "./Context"

import { useSyncProviders } from "./useSyncProviders"
import { type EIP6963ProviderDetail } from "./EIP6963Providers"

export * from "./types"
export { ThePoolzProvider, useThePoolz, useSetProvider, useSyncProviders, EIP6963ProviderDetail }
export default ThePoolz
