import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAnimatedInView from "../hooks/useAnimatedInView";
import useProjects from "../hooks/useProjects";
import { Project } from "../api/projectsService";
import GitIcon from "../assets/github.png";
import closeIcon from "../assets/Close.png";

interface ProjectSectionProps {
    category: string;       // 'web-development' | 'mobile-app-development' | 'ui-ux-design'
    title: string;          // category name — displayed as the section heading
    icon: string;           // category icon — displayed next to the heading
    figmaIcon?: string;     // optional figma icon for ui/ux section
}

// Subtle alternating tilt so the grid reads like a pinned photo wall, not a rigid table
const tiltPattern = [-2, 2, -1.5, 1.5, -2.5, 2.5];

const ProjectSection = ({ category, title, icon, figmaIcon }: ProjectSectionProps) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { projects, loading, error } = useProjects(category);
    const { ref: headingRef, isInView: isHeadingInView } = useAnimatedInView<HTMLDivElement>();
    const isUIUX = category === 'ui-ux-design';

    return (
        <div className="flex flex-col justify-center items-center w-full">
            {/* Category heading */}
            <motion.div
                ref={headingRef}
                initial={{ opacity: 0, y: -16 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-3 mb-10"
            >
                <img src={icon} className="w-7 h-7 md:w-8 md:h-8" />
                <h2
                    className="text-[var(--secondary)] text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    {title}
                </h2>
            </motion.div>

            {loading && (
                <p className="text-[var(--secondary)] text-lg mt-4">Loading projects...</p>
            )}

            {error && (
                <p className="text-red-400 text-lg mt-4">{error}</p>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-[1400px] mx-auto pb-4">
                    {projects.map((project, index) => (
                        <ProjectSquare
                            key={project.id}
                            project={project}
                            tilt={tiltPattern[index % tiltPattern.length]}
                            isUIUX={isUIUX}
                            onOpen={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence>
                {selectedProject && (
                    <Modal
                        project={selectedProject}
                        isUIUX={isUIUX}
                        figmaIcon={figmaIcon}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Square project card (polaroid style) ──────────────────────────────────

const ProjectSquare = ({
    project,
    tilt,
    isUIUX,
    onOpen,
}: {
    project: Project;
    tilt: number;
    isUIUX: boolean;
    onOpen: () => void;
}) => {
    const { ref, isInView } = useAnimatedInView<HTMLDivElement>();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={onOpen}
            className="group rounded-2xl overflow-hidden cursor-pointer"
            style={{
                transform: `rotate(${tilt}deg)`,

                border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,157,255,0.25)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Image square */}
            <div
                className="relative aspect-square overflow-hidden flex items-center justify-center p-6 md:p-7"

            >
                {project.image_url ? (
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <p className="text-[var(--secondary)] text-sm">No image</p>
                )}

                {/* Hover overlay */}
                <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(5,21,31,0.72)" }}
                >
                    <span
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white scale-75 group-hover:scale-100 transition-transform duration-300"
                        style={{
                            background: "linear-gradient(135deg, var(--primary), var(--gradient_1))",
                            boxShadow: "0 4px 16px rgba(0,157,255,0.4)",
                        }}
                    >
                        {isUIUX ? "View Design" : "View Project"}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7 M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Caption — below the image */}
            <div className="px-4 py-4">
                <h3 className="text-[var(--secondary)] font-semibold text-base md:text-lg leading-snug line-clamp-2">
                    {project.title}
                </h3>
            </div>
        </motion.div>
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ background: "rgba(5,21,31,0.75)", backdropFilter: "blur(6px)" }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl rounded-3xl my-8 flex flex-col overflow-hidden"
                style={{
                    maxHeight: "88vh",
                    background: "var(--secondbackground)",
                    border: "1px solid rgba(0,157,255,0.2)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
                }}
            >
                {/* Close button — stays fixed in place, outside the scrolling content */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110"
                    style={{ background: "rgba(5,21,31,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                    <img src={closeIcon} className="w-4 h-4" />
                </button>

                {/* Scrollable content — hero image + details */}
                <div className="no-scrollbar overflow-y-auto min-h-0">
                    {/* Hero image banner */}
                    <div className="relative w-full aspect-video">
                        {project.image_url ? (
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center"
                                style={{ background: "var(--footerbg)" }}
                            >
                                <p className="text-[var(--secondary)] text-sm">No image</p>
                            </div>
                        )}
                        <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to top, var(--secondbackground) 0%, transparent 35%)" }}
                        />
                    </div>

                    {/* Content */}
                    <div className="px-6 md:px-8 pb-8 -mt-1">
                        <span
                            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                color: "var(--primary)",
                                background: "rgba(0,157,255,0.1)",
                            }}
                        >
                            {isUIUX ? "UI/UX Design" : "Full-Stack Project"}
                        </span>

                        <h2 className="text-[var(--secondary)] font-bold text-2xl md:text-3xl mb-4">
                            {project.title}
                        </h2>

                        <p
                            className="text-sm md:text-base font-light leading-7 mb-6"
                            style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-7">
                            {project.tech_stack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="text-xs md:text-sm px-3 py-1 rounded-full font-medium"
                                    style={{
                                        color: "rgba(255,255,255,0.7)",
                                        border: "1px solid rgba(255,255,255,0.14)",
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div
                            className="h-px w-full mb-6"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                        />

                        {/* Action buttons */}
                        <div className="flex gap-3 flex-wrap">
                            {!isUIUX && project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                                    style={{ color: "var(--secondary)", border: "1px solid rgba(255,255,255,0.2)" }}
                                >
                                    <img src={GitIcon} className="w-4 h-4" />
                                    View Code
                                </a>
                            )}

                            {!isUIUX && project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary), var(--gradient_1))",
                                        boxShadow: "0 4px 16px rgba(0,157,255,0.3)",
                                    }}
                                >
                                    Visit Site
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M7 17L17 7 M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            )}

                            {isUIUX && project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary), var(--gradient_1))",
                                        boxShadow: "0 4px 16px rgba(0,157,255,0.3)",
                                    }}
                                >
                                    {figmaIcon && <img src={figmaIcon} className="w-4 h-4" />}
                                    View in Figma
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectSection;