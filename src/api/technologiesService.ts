import API from './axios';

export interface Technology {
    id: number;
    name: string;
    image_url: string | null;
    category_name: string;
    category_slug: string;
    created_at: string;
}

export interface GroupedTechnologies {
    frontend: Technology[];
    backend: Technology[];
    languages: Technology[];
    tools: Technology[];
    [key: string]: Technology[];
}

export const getTechnologiesByCategory = async (category: string): Promise<Technology[]> => {
    const response = await API.get(`/technologies?category=${category}`);
    return response.data;
};

export const getGroupedTechnologies = async (): Promise<GroupedTechnologies> => {
    const response = await API.get('/technologies/grouped');
    return response.data;
};