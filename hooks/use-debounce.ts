import { useEffect,useState } from "react";

export function useDebounce<T>(value:T, delay?:number): T{
    const [debouncedValue, setdebouncedValue] = useState<T>(value)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setdebouncedValue(value)

        },delay || 500)
        return ()=>{
            clearTimeout(timer)
        }
    },[value,delay])
    return debouncedValue
}