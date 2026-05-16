import { motion } from 'framer-motion';
import useAnimatedInView from '../hooks/useAnimatedInView';
import TechGrid from '../components/TechGrid';
import HorizontalLine from '../components/HorizontalLine';
import useTechnologies from '../hooks/useTechnologies';

const MotionText = motion.h1;

const TechStack = () => {
  const { ref: textRef, isInView: isTextInView } =
    useAnimatedInView<HTMLHeadingElement>();

  const { data, loading, error } = useTechnologies();

  return (
    <section
      className="lg:ml-30 lg:mr-30 pt-12 lg:pt-20 md:ml-10 md:mr-10 ml-2 mr-2"
      id="techstack"
    >
      <div className="overflow-hidden">
        <MotionText
          ref={textRef}
          className="text-center text-[var(--secondary)] font-semibold text-4xl md:text-5xl/20"
          initial={{ opacity: 0, x: 100 }}
          animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Tools &<span className="text-[var(--primary)]"> Technologies</span>
        </MotionText>
      </div>

      <HorizontalLine />

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <p className="text-center text-red-400 py-10">
          Failed to load technologies: {error}
        </p>
      )}

      {/* Data */}
      {data && !loading && (
        <>
          <TechGrid
            topic="Frontend Development"
            technologies={data.frontend ?? []}
          />
          <TechGrid
            topic="Backend Development"
            technologies={data.backend ?? []}
          />
          <TechGrid
            topic="Programming Languages"
            technologies={data.languages ?? []}
          />
          <TechGrid
            topic="Tools"
            technologies={data.tools ?? []}
          />
        </>
      )}

      <HorizontalLine />
    </section>
  );
};

export default TechStack;