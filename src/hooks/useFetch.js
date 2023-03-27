import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios(url, options);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [url, options]);

    return { data, isLoading, error };
};

export default useFetch;
