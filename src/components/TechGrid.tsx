import type { Technology } from '../api/technologiesService';

interface TechGridProps {
  topic: string;
  technologies: Technology[];
}

const TechGrid = ({ topic, technologies }: TechGridProps) => {
  if (technologies.length === 0) return null;

  return (
    <div>
      <h1 className="text-center text-[var(--secondary)] md:text-3xl lg:text-3xl mt-8 text-2xl mb-5 font-bold">
        {topic}
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 lg:gap-4 sm:px-8 md:px-20 lg:px-0">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className="bg-[var(--secondbackground)] flex flex-col items-center justify-center lg:w-40 lg:h-24 w-30 h-20 p-4 rounded-xl border border-[var(--primary)] shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200"
            >
              {tech.image_url ? (
                <img
                  src={tech.image_url}
                  alt={tech.name}
                  className="w-10 h-10 mb-2 object-contain"
                />
              ) : (
                <div className="w-10 h-10 mb-2 rounded-md bg-[var(--primary)] bg-opacity-10 flex items-center justify-center text-[var(--primary)] text-xs font-bold">
                  {tech.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <p className="text-[var(--secondary)] lg:text-lg text-sm text-center">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechGrid;