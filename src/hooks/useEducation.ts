import { useEffect, useState } from 'react';
import { getEducation, Education } from '../api/aboutService';

interface UseEducationReturn {
    data: Education[] | null;
    loading: boolean;
    error: string | null;
}

const useEducation = (): UseEducationReturn => {
    const [data, setData] = useState<Education[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getEducation();
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

export default useEducation;