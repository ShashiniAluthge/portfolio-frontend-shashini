import { motion } from "framer-motion";
import useAnimatedInView from "../hooks/useAnimatedInView";
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

const About = () => {
  const { ref: divRef, isInView: isDivInView } =
    useAnimatedInView<HTMLDivElement>();
  const { ref: railRef, isInView: isRailInView } =
    useAnimatedInView<HTMLDivElement>();
  const { ref: card1Ref, isInView: isCard1InView } =
    useAnimatedInView<HTMLDivElement>();
  const { ref: card2Ref, isInView: isCard2InView } =
    useAnimatedInView<HTMLDivElement>();
  const { ref: card3Ref, isInView: isCard3InView } =
    useAnimatedInView<HTMLDivElement>();

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
              <div
                className="text-[var(--secondary)] lg:text-xl text-lg text-justify leading-8 font-normal pl-6"
                style={{ borderLeft: "2px solid rgba(0,157,255,0.3)" }}
              >
                I&rsquo;m a final-year B.Sc. (Hons) Information Technology undergraduate at the
                University of Moratuwa (CGPA 3.54, Dean&rsquo;s List), with hands-on experience
                building full-stack and cross-platform mobile applications. Outside of work,
                I&rsquo;ve built a full-stack issue tracker with Next.js and Prisma, a courier
                management app in React Native, and several React/TypeScript frontends using
                state tools like React Query and Zustand. On the research side, I&rsquo;m
                developing the Intelligent Solution Recommendation System for FedSAST, a
                federated learning platform that classifies security alerts and recommends
                secure remediation strategies. I like working across the full stack &mdash;
                frontend, backend, and the decisions that connect them &mdash; and I&rsquo;m
                currently looking for full-stack or frontend engineering roles.
              </div>
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

          <div ref={railRef} className="relative max-w-4xl mx-auto pb-2">
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
              {/* University of Moratuwa */}
              <div className="relative md:flex md:items-start">
                <TimelineNode />
                <div className="pl-10 md:pl-0 md:w-1/2 md:pr-12">
                  <motion.div
                    ref={card1Ref}
                    initial={{ opacity: 0, x: -40 }}
                    animate={isCard1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="bg-[var(--secondbackground)] rounded-2xl p-6 pt-5"
                    style={{ border: "1px solid rgba(0,157,255,0.25)" }}
                  >
                    <span
                      className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "var(--primary)",
                        background: "rgba(0,157,255,0.1)",
                      }}
                    >
                      2022 — 2026
                    </span>
                    <h2 className="text-[var(--secondary)] text-xl md:text-2xl font-bold">
                      University of Moratuwa
                    </h2>
                    <p className="text-[var(--secondary)] mt-3 text-md md:text-lg">
                      Faculty of Information Technology
                    </p>
                    <p className="mt-1 text-md md:text-lg font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
                      Bachelor of Science (Hons) in Information Technology
                    </p>
                  </motion.div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>

              {/* IMBS Green Campus */}
              <div className="relative md:flex md:items-start md:flex-row-reverse">
                <TimelineNode />
                <div className="pl-10 md:pl-12 md:w-1/2">
                  <motion.div
                    ref={card2Ref}
                    initial={{ opacity: 0, x: 40 }}
                    animate={isCard2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="bg-[var(--secondbackground)] rounded-2xl p-6 pt-5"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span
                      className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "var(--primary)",
                        background: "rgba(0,157,255,0.1)",
                      }}
                    >
                      2021 — 2022
                    </span>
                    <h2 className="text-[var(--secondary)] text-xl md:text-2xl font-bold">
                      IMBS Green Campus
                    </h2>
                    <p className="text-[var(--secondary)] mt-3 text-md md:text-lg">
                      Diploma in Information Technology
                    </p>
                    <p className="mt-1 text-md md:text-lg font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
                      GPA: 3.4
                    </p>
                  </motion.div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>

              {/* Dhammapala Girls' School */}
              <div className="relative md:flex md:items-start">
                <TimelineNode />
                <div className="pl-10 md:pl-0 md:w-1/2 md:pr-12">
                  <motion.div
                    ref={card3Ref}
                    initial={{ opacity: 0, x: -40 }}
                    animate={isCard3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="bg-[var(--secondbackground)] rounded-2xl p-6 pt-5"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span
                      className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "var(--primary)",
                        background: "rgba(0,157,255,0.1)",
                      }}
                    >
                      2011 — 2020
                    </span>
                    <h2 className="text-[var(--secondary)] text-xl md:text-2xl font-bold">
                      Dhammapala Girls&rsquo; School, Beliatta
                    </h2>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-[var(--secondary)] text-md md:text-lg">
                          G.C.E. Advanced Level Examination &mdash; 2020
                        </p>
                        <p className="text-sm md:text-base font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
                          Passed with 2A&rsquo;s &amp; 1C in Physical Science Stream
                        </p>
                      </div>
                      <div>
                        <p className="text-[var(--secondary)] text-md md:text-lg">
                          G.C.E. Ordinary Level Examination &mdash; 2016
                        </p>
                        <p className="text-sm md:text-base font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
                          Passed with 9A&rsquo;s
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;