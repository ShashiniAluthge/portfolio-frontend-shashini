import { useEffect, useState } from 'react';
import {
    getGroupedTechnologies,
    GroupedTechnologies,
} from '../api/technologiesService';

interface UseTechnologiesReturn {
    data: GroupedTechnologies | null;
    loading: boolean;
    error: string | null;
}

const useTechnologies = (): UseTechnologiesReturn => {
    const [data, setData] = useState<GroupedTechnologies | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getGroupedTechnologies();
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

export default useTechnologies;