"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";



const useFilterHook = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace, push, refresh} = useRouter();

    const params = new URLSearchParams(searchParams);
    const setQuery = (key: string, value: string) => {
        params.set(key, value);
        replace(`${pathname}?${params.toString()}`, {scroll: false});
    }

    const clearQuery = (key: string) => {
        params.delete(key);
        replace(`${pathname}?${params.toString()}`,  {scroll: false});
    }
    const clearAllQuery = () => {
        let path = pathname;
        if(params.get("viewType")) {
            path = `${path}?viewType=${params.get("viewType")}`;
        }
        replace(path,  {scroll: false});
    }

    return { setQuery, clearQuery, clearAllQuery, searchParams}

}

export default useFilterHook;