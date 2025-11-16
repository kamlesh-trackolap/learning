const Footer = () => {
  return (
    <div className=" flex h-[50px] items-center justify-between shadow-2xl z-50  px-[10px]">
        <div className="flex justify-center items-center gap-[8px]">
            <h3 className="text-white hover:text-base hover:border-b-2 border-white  cursor-pointer">Powered by kreatop</h3>
            <div className="w-[1px] h-[20px] bg-third-white"></div>
            <span className="text-white hover:text-base hover:border-b-2 border-white cursor-pointer">2.6.531</span>
            <div className="w-[1px] h-[20px] bg-third-white"></div>
             <span className="text-white hover:text-base hover:border-b-2 border-white  cursor-pointer">Privacy</span>
               <div className="w-[1px] h-[20px] bg-third-white"></div>
             <span className="text-white hover:text-base hover:border-b-2 border-white  cursor-pointer">Terms & conditions</span>
        </div>
        <div>
            <span className="text-red-500">Ofline</span>
        </div>
    </div>
  )
}

export default Footer
