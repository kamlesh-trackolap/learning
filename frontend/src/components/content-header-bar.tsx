import type { ReactNode } from "react"
const ContentHeaderBar = ({children}:{children:ReactNode}) => {
  return (
    <div className=" flex justify-between items-center shadow-xl h-[80px] rounded px-[10px] top-2 bg-main mt-[20px] sticky">
        {children}
    </div>
  )
}

export default ContentHeaderBar
