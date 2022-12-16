import {useEffect, useState} from "react";

export const useViewportWidth = (): number => {
    let [width, setWidth] = useState<number>(0)

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    return width
}