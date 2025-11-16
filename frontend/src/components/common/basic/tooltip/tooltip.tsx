import { Tooltip } from "antd"
import type { ReactNode } from "react"
interface PropsType {
    children: ReactNode,
    title: string | ReactNode,
    color: string;
    placement: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
    arrow: boolean | { pointAtCenter: true }
}
const TooTipField = ({ children, title = '', color = '', placement, arrow,...rest }: PropsType) => {
    return (
        <Tooltip title={title} color={color} key={color} placement={placement} arrow={arrow} {...rest}>
            {children}
        </Tooltip>
    )
}

export default TooTipField;
