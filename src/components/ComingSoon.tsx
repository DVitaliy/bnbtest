import ReactDOM from "react-dom"
import MasCotte from '../assets/mascotte.png'
const ComingSoon = () => {
  return ReactDOM.createPortal(<div className="fixed inset-0 flex justify-center items-center bg-[#191E2EF2]">
    <div className="flex flex-col text-[#FCD800] font-marker">
      <div className="flex items-baseline">
        <span className='text-[4vw] md:text-3xl'>
          BNB Party
        </span>
        <img src={MasCotte} alt="" className='w-[15vw] md:w-[129px] inline' />
      </div>
      <h1 className="text-[14vw] md:text-[125px] whitespace-nowrap leading-none">Coming Soon</h1>
    </div>
  </div>,
    document.querySelector("#root") as HTMLElement)
};

export default ComingSoon
