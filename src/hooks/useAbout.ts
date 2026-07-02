import { useEffect, useState } from 'react';
import { getAbout, About } from '../api/aboutService';

interface UseAboutReturn {
    data: About | null;
    loading: boolean;
    error: string | null;
}

const useAbout = (): UseAboutReturn => {
    const [data, setData] = useState<About | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getAbout();
                if (!cancelled) setData(result);
            } catch (err) {
                if (!cancelled)
                    setError(err instanceof Error ? err.message : 'Something went wrong');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    return { data, loading, error };
};

export default useAbout;