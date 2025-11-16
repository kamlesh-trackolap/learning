import { createContext, useContext, type ReactNode } from "react";
import { message } from "antd"  
const ToastContext = createContext<any>(null);

const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, contextHolder] = message.useMessage();
    return <ToastContext.Provider value={toast}>
        {contextHolder}
        {children}
    </ToastContext.Provider>

}
export const useToast = () => useContext(ToastContext)
export default ToastProvider;