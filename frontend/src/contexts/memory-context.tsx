import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface memoryCotextType {
    store: Record<string,unknown>;
    setStore : Dispatch<SetStateAction<Record<string,unknown>>>;

}
export const MemoryContext = createContext<memoryCotextType>({
   store : {},
   setStore: ()=>{} 
});

interface MemoryProviderType{
    children: ReactNode,
}
const MemoryProvider = ({children}:MemoryProviderType)=>{
    const [store,setStore] = useState<Record<string,unknown>>({});
    /**
     * store  structure - 
     *     { 
     *   key 1 : {},
     *   key 2 : {},
     *   key 3 : {},
     * ..
     *    }
     */
    return <MemoryContext.Provider value={{store,setStore}}>{children}</MemoryContext.Provider>

}
export default MemoryProvider;