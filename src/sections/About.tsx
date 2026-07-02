import { motion } from "framer-motion";
import useAnimatedInView from "../hooks/useAnimatedInView";
import useAbout from "../hooks/useAbout";
import useEducation from "../hooks/useEducation";
import Experience from "./Experience";

const MotionText = motion.div;

const TimelineNode = () => (
  <div
    className="absolute left-3 md:left-1/2 top-1.5 md:-translate-x-1/2 w-3 h-3 rounded-full z-10"
    style={{
      background: "var(--primary)",
      boxShadow: "0 0 0 4px rgba(0,157,255,0.15), 0 0 14px rgba(0,157,255,0.6)",
      animation: "nodePulse 2.4s ease-in-out infinite",
    }}
  />
);

const EducationCard = ({
  institution,
  faculty,
  qualification,
  description,
  start_year,
  end_year,
  reverse,
}: {
  institution: string;
  faculty: string | null;
  qualification: string;
  description: string | null;
  start_year: number;
  end_year: number;
  reverse: boolean;
}) => {
  const { ref, isInView } = useAnimatedInView<HTMLDivElement>();

  return (
    <div className={`relative md:flex md:items-start ${reverse ? "md:flex-row-reverse" : ""}`}>
      <TimelineNode />
      <div className={`pl-10 md:w-1/2 ${reverse ? "md:pl-12" : "md:pl-0 md:pr-12"}`}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? 40 : -40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[var(--secondbackground)] rounded-2xl p-6 pt-5"
          style={{ border: `1px solid ${reverse ? "rgba(255,255,255,0.06)" : "rgba(0,157,255,0.25)"}` }}
        >
          <span
            className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--primary)",
              background: "rgba(0,157,255,0.1)",
            }}
          >
            {start_year} — {end_year}
          </span>
          <h2 className="text-[var(--secondary)] text-xl md:text-2xl font-bold">
            {institution}
          </h2>
          {faculty && (
            <p className="text-[var(--secondary)] mt-3 text-md md:text-lg">{faculty}</p>
          )}
          <p className="mt-1 text-md md:text-lg font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
            {qualification}
          </p>
          {description && (
            <p className="mt-2 text-sm md:text-base font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
              {description}
            </p>
          )}
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

const About = () => {
  const { ref: divRef, isInView: isDivInView } = useAnimatedInView<HTMLDivElement>();
  const { ref: railRef, isInView: isRailInView } = useAnimatedInView<HTMLDivElement>();

  const { data: about, loading: aboutLoading, error: aboutError } = useAbout();
  const { data: education, loading: eduLoading, error: eduError } = useEducation();

  return (
    <div>
      <section className="section-container pt-12 lg:pt-20" id="about">
        <div className="overflow-hidden">
          <MotionText
            ref={divRef}
            initial={{ opacity: 0, x: -100 }}
            animate={isDivInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >


            <h1
              className="text-center text-[var(--secondary)] font-semibold text-4xl md:text-5xl/20"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              About
              <span className="text-[var(--primary)]"> Me</span>
            </h1>

            <div className="max-w-4xl mx-auto mt-8 px-2">
              {aboutLoading && (
                <p className="text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Loading...
                </p>
              )}
              {aboutError && (
                <p className="text-center" style={{ color: "#f87171" }}>
                  Couldn&rsquo;t load About content. Please try again later.
                </p>
              )}
              {about && (
                <div
                  className="text-[var(--secondary)] lg:text-xl text-lg text-justify leading-8 font-normal pl-6"
                  style={{ borderLeft: "2px solid rgba(0,157,255,0.3)" }}
                >
                  {about.description}
                </div>
              )}
            </div>
          </MotionText>
        </div>

        <Experience />

        {/* ── Education timeline ── */}
        <div className="items-center justify-center px-2 mt-20">
          <h1
            className="text-center text-[var(--secondary)] md:text-4xl mt-8 text-3xl mb-16 font-bold"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Education
          </h1>

          {eduLoading && (
            <p className="text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
              Loading...
            </p>
          )}
          {eduError && (
            <p className="text-center" style={{ color: "#f87171" }}>
              Couldn&rsquo;t load Education content. Please try again later.
            </p>
          )}

          {education && (
            <div ref={railRef} className="relative max-w-4xl mx-auto pb-2">
              {/* Rail track */}
              <div
                className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-full origin-top"
                  style={{
                    background:
                      "linear-gradient(to bottom, var(--primary), var(--gradient_1), var(--gradient_2))",
                  }}
                  initial={{ height: "0%" }}
                  animate={isRailInView ? { height: "100%" } : { height: "0%" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </div>

              <div className="flex flex-col gap-14 md:gap-8">
                {education.map((edu, index) => (
                  <EducationCard
                    key={edu.id}
                    institution={edu.institution}
                    faculty={edu.faculty}
                    qualification={edu.qualification}
                    description={edu.description}
                    start_year={edu.start_year}
                    end_year={edu.end_year}
                    reverse={index % 2 === 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;