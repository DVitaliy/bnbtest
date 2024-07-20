import { useEffect/*, useState, useRef*/ } from 'react'
// import abiLP from '../abi/lp.json'
// import { type AbiItem } from "web3-utils"
// import { type EventData } from 'web3-eth-contract'

//56
// const lpAddress = "0x9f037651C9175FDE748Bc9C473d1819636EA2222"
const ChartIframe = () => {

    // const thePoolz = useThePoolz()

    // const iframeRef = useRef<HTMLIFrameElement | null>(null);
    // const [dealData, setDealData] = useState<[string, string, Date] | []>([]);
    useEffect(() => {

        const fetchDeals = async () => {

            // const contract = new thePoolz.web3.eth.Contract(abiLP as AbiItem[], lpAddress);

            try {
                // console.log("contract----", await contract.methods.fee().call({ from: account }))

                // const blockNumber = await thePoolz.web3.eth.getBlockNumber()

                // console.log("blockNumber", blockNumber)
                // const log = await thePoolz.web3.eth.getPastLogs({
                //     // fromBlock: 40377087,
                //     // toBlock: 40377087,
                //     address: lpAddress,
                //     topics: ["0x19b47279256b2a23a1665c810c8d55a1758940ee09377d4f8d26497a3577dc83"]
                // })
                // console.log("log", log)

                // const pastEvents = await contract.getPastEvents('ALLEVENTS', {
                //     // const pastEvents = await contract.events.Swap({}, {
                //     fromBlock: 40367090,
                //     toBlock: 40367090,
                //     // topics: ["0x19b47279256b2a23a1665c810c8d55a1758940ee09377d4f8d26497a3577dc83"]
                // });

                // console.log("pastEvents", pastEvents)


                // const deals = pastEvents.map(event => ({
                //     amount0: event.returnValues.amount0 as string,
                //     amount1: event.returnValues.amount1 as string,
                //     date: new Date(event.returnValues.timestamp * 1000)
                // }));
                // // setDealData(deals);
                // if (iframeRef.current?.contentWindow) {
                //     iframeRef.current.contentWindow.postMessage({ type: 'Init', deals }, '*');
                // }

            } catch (e) { console.log("++", e) }
            // console.log("-", pastEvents)
        };

        fetchDeals();

        // Subscribe to new events
        /*
        const contract = new thePoolz.web3.eth.Contract(abiLP as AbiItem[], lpAddress);
        contract.events.Swap({
            fromBlock: 'latest'
        }).on('data', (event: EventData) => {
            const newDeal = {
                amount0: event.returnValues.amount0,
                amount1: event.returnValues.amount1,
                date: new Date(event.returnValues.timestamp * 1000)
            };
            // setDealData(prevDeals => [...prevDeals, newDeal]);
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage({ type: 'AddDeal', deal: newDeal }, '*');
            }
        });
        */

    }, []);

    return (<>
        <p>countProvider
        </p>
    </>
    );
};

export default ChartIframe;

// <iframe
//     ref={iframeRef}
//     src="https://chart.bnbparty.com"
//     title="BNB Party Chart"
//     style={{ width: '100%', height: '500px', border: 'none' }}
//     sandbox="allow-scripts allow-same-origin"
// />