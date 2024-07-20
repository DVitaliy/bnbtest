// import {
//   Link,
// } from "react-router-dom"

// function Items() {
//   return (
//     <div className="p-4 bg-gray-800 rounded border border-yellow">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-xl font-bold">MadDogs</h2>
//         <span className="text-yellow">$4.92k</span>
//       </div>
//       <p className="text-gray-400">Created by DevilMC</p>
//       <div className="flex justify-between items-center mt-4">
//         <span className="text-red-500">❤️ 327</span>
//         <span className="text-gray-400">💬 12</span>
//         <button className="py-1 px-2 bg-yellow text-gray-900 rounded font-semibold">Buy</button>
//       </div>
//     </div>)
// }
// import Exploration from 'assets/exploration.jpg'
function App() {

  return (<>
    <style>
      {`html, body, #root,#comingsoon {
      height: 100%;
      width: 100%;
    }`}
    </style>
    <div id="comingsoon" className={`flex bg-[url('assets/exploration.jpg')] bg-no-repeat bg-cover`}>
      {/* <aside className="w-1/5 bg-[#1c1e24] p-4">
        <div className="text-yellow text-2xl font-bold mb-8 font-marker text-[#FCD800]">BNB Party</div>
        <nav className="space-y-4">
          <a href="#" className="block py-2 px-4 rounded bg-yellow text-gray-900 font-semibold">Party</a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800">Profile</a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800">Following</a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800">My Pools</a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800">How it works</a>
        </nav>
        <div className="mt-auto">
          <button className="w-full py-2 px-4 bg-yellow text-gray-900 rounded font-semibold">Create Token</button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Hot Party</h1>
          <button className="py-2 px-4 bg-yellow text-gray-900 rounded font-marker">Connect Wallet</button>
        </div>
        <div className="flex items-center mb-8">
          <input type="text" placeholder="Write your token symbol" className="w-full p-2 rounded bg-gray-800 text-white border border-yellow" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
          <Items />
        </div>
      </main> */}
      {/* <img src={Exploration} className='h-full w-full ' /> */}
    </div>
  </>
  )
}

export default App
