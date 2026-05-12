import { useState } from "react";
import { motion } from "framer-motion";
import useAnimatedInView from "../hooks/useAnimatedInView";
import useProjects from "../hooks/useProjects";
import { Project } from "../api/projectsService";
import GitIcon from "../assets/github.png";
import closeIcon from "../assets/Close.png";

const MotionDiv = motion.div;

interface ProjectSectionProps {
    category: string;       // 'web-development' | 'mobile-app-development' | 'ui-ux-design'
    title: string;          // 'Web Development' | 'Mobile App Development' | 'UI/UX Design'
    icon: string;           // icon image import
    figmaIcon?: string;     // optional figma icon for ui/ux section
}

const ProjectSection = ({ category, title, icon, figmaIcon }: ProjectSectionProps) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { projects, loading, error } = useProjects(category);
    const { ref: divRef, isInView: isDivInView } = useAnimatedInView<HTMLDivElement>();

    const isUIUX = category === 'ui-ux-design';

    return (
        <div className="flex flex-col justify-center items-center">
            {/* Section heading */}
            <h1 className="text-center text-[var(--secondary)] md:text-3xl lg:text-3xl mt-8 text-2xl mb-5 font-bold flex justify-center">
                <img src={icon} className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-10" />
                {title}
            </h1>

            {/* Loading */}
            {loading && (
                <p className="text-[var(--secondary)] text-lg mt-4">Loading projects...</p>
            )}

            {/* Error */}
            {error && (
                <p className="text-red-400 text-lg mt-4">{error}</p>
            )}

            {/* Grid */}
            {!loading && !error && (
                <MotionDiv
                    ref={divRef}
                    key={projects.length}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="w-full min-w-[280px] max-w-[370px] flex flex-col h-auto mx-auto px-2 py-5 bg-[var(--footerbg)] rounded-xl shadow-xl shadow-[var(--primary)] cursor-pointer hover:border-2 hover:border-[var(--primary)] transition-all ease-in-out duration-300 hover:shadow-xl hover:translate-y-[-5px] projectcard_shadow"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Image */}
                            <div className="flex p-2 items-center justify-center">
                                {project.image_url ? (
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="object-contain lg:rounded-2xl rounded-lg w-full h-[200px] hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-[200px] bg-[var(--secondbackground)] rounded-lg flex items-center justify-center">
                                        <p className="text-[var(--secondary)] text-sm">No image</p>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div className="p-4 flex flex-col flex-1">
                                <div className="h-20 flex items-center">
                                    <p className="text-[var(--primary)] font-semibold text-xl md:text-2xl text-left">
                                        {project.title}
                                    </p>
                                </div>

                                <hr className="border-1 border-[var(--secondary)] mt-5 mb-2" />

                                {/* Card bottom link */}
                                <div className="flex gap-3 mt-1">
                                    {/* GitHub — shown for web and mobile */}
                                    {!isUIUX && project.github_url && (
                                        <div className="border-2 rounded-full w-10 p-2 border-[var(--secondbackground)] button_shadow hover:button_shadow-hover hover:scale-105 cursor-pointer">
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <img src={GitIcon} className="w-full h-full" />
                                            </a>
                                        </div>
                                    )}

                                    {/* Figma link — shown for UI/UX */}
                                    {isUIUX && project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center text-[var(--primary)] text-sm font-semibold border-2 rounded-lg px-3 py-1  hover:text-white transition-all"
                                        >
                                            {figmaIcon && (
                                                <img src={figmaIcon} className="w-4 h-4 mr-2" />
                                            )}
                                            View Design
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </MotionDiv>
            )}

            {/* Modal */}
            {selectedProject && (
                <Modal
                    project={selectedProject}
                    isUIUX={isUIUX}
                    figmaIcon={figmaIcon}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
};

// ─── Modal ───────────────────────────────────────────────────────────────────

const Modal = ({
    project,
    isUIUX,
    figmaIcon,
    onClose,
}: {
    project: Project;
    isUIUX: boolean;
    figmaIcon?: string;
    onClose: () => void;
}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[var(--footerbg)] bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
            <div className="flex flex-col lg:flex-row bg-[var(--secondbackground)] rounded-2xl relative w-[80%] lg:w-[60%] pt-5 p-2 md:p-5 modalcard_shadow mt-40 mb-10 lg:mt-0 lg:mb-0">

                {/* Close button */}
                <button
                    className="md:w-11 md:h-11 w-9 h-9 cursor-pointer absolute right-4 top-3 p-3 bg-[var(--secondbackground)] rounded-full shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 flex justify-center items-center hover:bg-[var(--primary)]"
                    onClick={onClose}
                >
                    <img src={closeIcon} />
                </button>

                <div className="w-full flex flex-col lg:flex-row container mx-auto md:px-2 lg:mt-5 gap-6">

                    {/* Image */}
                    <div className="w-full lg:w-1/3 flex-shrink-0 flex items-center justify-center p-4">
                        {project.image_url ? (
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full max-w-[320px] h-auto object-contain rounded-2xl"
                            />
                        ) : (
                            <div className="w-full max-w-[320px] h-[200px] bg-[var(--footerbg)] rounded-2xl flex items-center justify-center">
                                <p className="text-[var(--secondary)] text-sm">No image</p>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 p-4">
                        {/* Title */}
                        <p className="text-[var(--primary)] font-semibold text-xl md:text-2xl">
                            {project.title}
                        </p>

                        {/* Description */}
                        <p className="text-[var(--secondary)] lg:text-lg md:text-md text-sm lg:mt-2 mt-3 font-light text-justify">
                            {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                            {project.tech_stack.map((tech, index) => (
                                <p
                                    key={index}
                                    className="flex justify-center items-center text-[var(--primary)] text-sm font-semibold border-2 rounded-lg px-3 py-1 text-center whitespace-nowrap"
                                >
                                    {tech}
                                </p>
                            ))}
                        </div>

                        <hr className="border-1 border-[var(--secondary)] mt-5 mb-2" />

                        {/* Modal links */}
                        <div className="flex gap-3 flex-wrap">

                            {/* GitHub — web and mobile only */}
                            {!isUIUX && project.github_url && (
                                <div className="border-2 rounded-full w-10 p-2 border-[var(--secondbackground)] button_shadow hover:button_shadow-hover hover:scale-105 cursor-pointer">
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={GitIcon} className="w-full h-full" />
                                    </a>
                                </div>
                            )}

                            {/* Live demo — web and mobile only */}
                            {!isUIUX && project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-[var(--primary)] text-sm font-semibold border-2 rounded-lg px-3 py-1  hover:text-white transition-all"
                                >
                                    Visit Site
                                </a>
                            )}

                            {/* Figma — UI/UX only */}
                            {isUIUX && project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[var(--primary)] text-sm font-semibold border-2 rounded-lg px-3 py-1  hover:text-white transition-all"
                                >
                                    {figmaIcon && <img src={figmaIcon} className="w-4 h-4" />}
                                    View in Figma
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;