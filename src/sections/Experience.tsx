import { motion } from "framer-motion";
import useAnimatedInView from "../hooks/useAnimatedInView";
import useExperience from "../hooks/useExperience";
import { Experience as ExperienceType } from "../api/aboutService";
import { JSX } from "react";

const MotionText = motion.div;

const icons: Record<string, JSX.Element> = {
    mobile: (
        <path
            d="M9 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M11 18h2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    calendar: (
        <path
            d="M4 5h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z M3 9h18 M8 3v4 M16 3v4 M8 13h2 M8 17h2 M14 13h2 M14 17h2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    api: (
        <path
            d="M4 12a8 8 0 1 1 8 8 M4 12a8 8 0 0 1 8-8 M4 12h4 M4 12l2.5-2.5 M4 12l2.5 2.5 M12 4v16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    cart: (
        <path
            d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6 M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M17 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    design: (
        <path
            d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.6 1.6-1.4 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.8.6-1.4 1.4-1.4H15a4.5 4.5 0 0 0 4.5-4.5C19.5 6.8 16.1 3 12 3Z M7.5 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M8.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M12.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M16 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
};

const IconBadge = ({ name }: { name: string }) => (
    <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(0,157,255,0.1)", color: "var(--primary)" }}
    >
        <svg width="20" height="20" viewBox="0 0 24 24">
            {icons[name] ?? icons["api"]}
        </svg>
    </div>
);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const ExperienceCard = ({ exp }: { exp: ExperienceType }) => {
    const { ref: cardRef, isInView: isCardInView } = useAnimatedInView<HTMLDivElement>();
    const isOdd = exp.contributions.length % 2 === 1;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden mb-10 last:mb-0"
            style={{
                background: "var(--secondbackground)",
                border: "1px solid rgba(0,157,255,0.18)",
            }}
        >
            {/* Role header strip */}
            <div
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-6 md:px-8 md:py-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                <div>
                    <h2 className="text-[var(--secondary)] text-xl md:text-2xl font-bold">
                        {exp.position}
                    </h2>
                    <p className="mt-1 text-md md:text-lg" style={{ color: "var(--primary)" }}>
                        {exp.company}
                    </p>
                </div>
                <span
                    className="inline-block self-start md:self-auto text-sm font-semibold px-3 py-1 rounded-full"
                    style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "var(--primary)",
                        background: "rgba(0,157,255,0.1)",
                    }}
                >
                    {formatDate(exp.start_date)} — {exp.currently_working ? "Present" : formatDate(exp.end_date ?? exp.start_date)}
                </span>
            </div>

            {/* Contribution grid */}
            <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
                {exp.contributions.map((area, index) => {
                    const isLastOdd = isOdd && index === exp.contributions.length - 1;
                    return (
                        <div
                            key={area.title}
                            className={`p-6 md:p-7 flex gap-4 ${isLastOdd ? "md:col-span-2" : ""}`}
                            style={{ background: "var(--secondbackground)" }}
                        >
                            <IconBadge name={area.icon} />
                            <div>
                                <h3 className="text-[var(--secondary)] font-semibold text-md md:text-lg mb-1.5">
                                    {area.title}
                                </h3>
                                <p
                                    className="text-sm md:text-base font-light leading-6"
                                    style={{ color: "rgba(255,255,255,0.6)" }}
                                >
                                    {area.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tech stack strip */}
            <div
                className="flex flex-wrap gap-2 p-6 md:px-8 md:py-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
                {exp.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs md:text-sm px-3 py-1 rounded-full"
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            color: "rgba(255,255,255,0.7)",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const { ref: headerRef, isInView: isHeaderInView } = useAnimatedInView<HTMLDivElement>();
    const { data: experiences, loading, error } = useExperience();

    return (
        <div className="items-center justify-center px-2 mt-20">
            <div className="overflow-hidden">
                <MotionText
                    ref={headerRef}
                    initial={{ opacity: 0, x: -100 }}
                    animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1
                        className="text-center text-[var(--secondary)] md:text-4xl text-3xl mb-14 font-bold"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Work Experience
                    </h1>
                </MotionText>
            </div>

            {loading && (
                <p className="text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Loading...
                </p>
            )}
            {error && (
                <p className="text-center" style={{ color: "#f87171" }}>
                    Couldn&rsquo;t load Experience content. Please try again later.
                </p>
            )}

            {experiences && experiences.map((exp) => <ExperienceCard key={exp.id} exp={exp} />)}
        </div>
    );
};

export default Experience;