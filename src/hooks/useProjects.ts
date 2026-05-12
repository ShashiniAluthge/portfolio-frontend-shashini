import { useState, useEffect } from 'react';
import { getProjectsByCategory, Project } from '../api/projectsService';

const useProjects = (category: string) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getProjectsByCategory(category);
                setProjects(data);
            } catch (err) {
                setError('Failed to load projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [category]);

    return { projects, loading, error };
};

export default useProjects;