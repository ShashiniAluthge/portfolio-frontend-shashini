import API from './axios';

export interface Project {
    id: number;
    title: string;
    description: string;
    tech_stack: string[];
    github_url: string | null;
    live_url: string | null;
    image_url: string | null;
    category_name: string;
    category_slug: string;
    created_at: string;
}

export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
    const response = await API.get(`/projects?category=${category}`);
    return response.data;
};