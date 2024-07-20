import React from "react";
import { useThePoolz, useSyncProviders, useSetProvider, EIP6963ProviderDetail } from "../poolz";

function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return <button {...props} className={`px-2 py-1 bg-[#423b14] rounded ${props.className}`}>{props.children ?? "Connect Wallet"}</button>
}
function NoWallet() {
  return <Button>No wallet detected</Button>
}

function SelectedWallet({ providerInfo: info }: { providerInfo: EIP6963ProviderDetail["info"] }) {
  const thePoolz = useThePoolz()
  const { account, balance, web3 } = thePoolz
  const shortAccount = account ? account.replace(/(.{4})(.*)(.{2})/, "$1…$3") : "N/A"
  const walletBalance = balance ? web3.utils.fromWei(balance, "ether") : "0.0"

  return <Button className="cursor-default outline outline-2 outline-offset-4 outline-[#FCD800] flex pr-2 pl-4">
    <div className="relative flex flex-col items-end justify-between h-full">
      <img src={info.icon} alt={info.name} className="w-6 h-6 p-1 absolute top-[-12px] left-[-25px] rounded-full bg-[#FCD800]" />
      <span className="text-[11px]">{shortAccount}</span>
      <span className="text-xs font-semibold flex gap-x-[2px] max-w-[80px]">
        <div className="truncate">{walletBalance}</div>
        <div className="font-poppins text-[#FCD800]">BNB</div>
      </span>
    </div>
  </Button>
}

export function ConnectWallet() {
  const thePoolz = useThePoolz()
  const { web3, account } = thePoolz
  const setProvider = useSetProvider()
  const providers = useSyncProviders()

  const handleConnect = async <T extends EIP6963ProviderDetail["provider"]>(provider: T) => {
    try {
      await provider
        .request({ method: 'eth_requestAccounts' })
      setProvider(provider)
    } catch (e) { console.error(e) }
  }

  if (!providers.length)
    return <NoWallet />

  return <>{providers.map(({ info, provider }) => {
    const selectedWallet = account && web3 && web3.currentProvider === provider
    const walletName = info.name.replace(/wallet/i, '')

    if (selectedWallet)
      return <SelectedWallet key={info.name} providerInfo={info} />

    return (
      <Button key={info.name} onClick={() => handleConnect(provider)} className="flex flex-col items-center min-w-12">
        <img src={info.icon} alt={info.name} className="w-6 h-6" />
        <div className="text-[10px] text-slate-200">{walletName}</div>
      </Button>
    )
  })}
  </>
};

function ConnectWalletWRAPPER() {
  // const [providers, setProviders] = React.useState<
  //   Map<string, EVMProviderDetected>
  // >(new Map());

  React.useEffect(() => {
    function onAnnounceProvider(event: any) {
      console.log(event)
      alert(event.detail.info.name)
    }
    window.addEventListener(
      "eip6963:announceProvider",
      onAnnounceProvider as EventListener
    );

    window.dispatchEvent(new Event("eip6963:requestProvider"));
    return () => {
      window.removeEventListener(
        "eip6963:announceProvider",
        onAnnounceProvider as EventListener
      );
    };
  }, []);

  return <div className="flex justify-end gap-x-2 p-3">
    {/* <ConnectWallet /> */}
    <button onClick={() => { window.dispatchEvent(new Event("eip6963:requestProvider")) }}>ConnectWallet</button>
  </div>
}
export default ConnectWalletWRAPPER