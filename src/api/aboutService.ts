import API from './axios';

export interface About {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Education {
    id: number;
    institution: string;
    faculty: string | null;
    qualification: string;
    description: string | null;
    start_year: number;
    end_year: number;
}

export interface ExperienceContribution {
    icon: string;
    title: string;
    description: string;
}

export interface Experience {
    id: number;
    company: string;
    position: string;
    start_date: string;
    end_date: string | null;
    currently_working: boolean;
    contributions: ExperienceContribution[];
    technologies: string[];
}

export const getAbout = async (): Promise<About> => {
    const response = await API.get('/about');
    return response.data;
};

export const getEducation = async (): Promise<Education[]> => {
    const response = await API.get('/about/education');
    return response.data;
};

export const getExperience = async (): Promise<Experience[]> => {
    const response = await API.get('/about/experience');
    return response.data;
};