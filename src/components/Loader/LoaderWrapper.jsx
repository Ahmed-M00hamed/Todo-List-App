import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PageLoader from "./Loader";

export default function LoaderWrapper({ children }) {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
            {children}
            {loading && <PageLoader />}
        </>
    );
}