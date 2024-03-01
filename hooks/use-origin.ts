import { useEffect, useState } from "react"

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
    // origin is a type of windows, and if the windows has the location , otherwise render an empty string

    if(!mounted) {
        return "";
    }

    return origin;
}