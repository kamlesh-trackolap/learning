import { useContext, useCallback } from 'react';
import { MemoryContext } from '../contexts/memory-context';
export function useSharedMemory(key:string) {
	const { store, setStore } = useContext(MemoryContext);
	const state = store[key] ?? {};

	const setMemory = useCallback((value:Record<string,unknown>) => {
			setStore((prev)=>({...prev,...value}));
		},[key]);
	return [state, setMemory];
}
