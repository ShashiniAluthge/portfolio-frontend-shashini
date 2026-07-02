import { useEffect, useState } from 'react';
import { getExperience, Experience } from '../api/aboutService';

interface UseExperienceReturn {
    data: Experience[] | null;
    loading: boolean;
    error: string | null;
}

const useExperience = (): UseExperienceReturn => {
    const [data, setData] = useState<Experience[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getExperience();
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

export default useExperience;