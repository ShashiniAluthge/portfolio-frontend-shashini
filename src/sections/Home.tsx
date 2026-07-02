import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SocialIcons from "../components/SocialIcons";
import profileImage from "../assets/profile.png";
import { motion } from "framer-motion";

const roles = ["Software Engineer", "Full Stack Developer", "Programmer", "UI/UX Designer"];

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingInterval = setTimeout(() => {
      if (!isDeleting) {
        if (characterIndex < currentRole.length) {
          setCharacterIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        if (characterIndex > 0) {
          setCharacterIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(typingInterval);
  }, [characterIndex, isDeleting, roleIndex]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--background)" }}
      id="home"
    >
      {/* ── Stars ── */}
      <Stars />

      {/* ── Background orbs ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: -100, left: -80,
            background: "radial-gradient(circle, rgba(0,157,255,0.18) 0%, rgba(0,157,255,0.04) 60%, transparent 100%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            bottom: -100, right: -60,
            background: "radial-gradient(circle, rgba(0,157,255,0.14) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,157,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,157,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,157,255,0.4), transparent)" }}
        />
      </div>

      {/* ── Navbar ── */}
      <NavBar />

      {/* ── Main split layout ── */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen pt-20 lg:pt-0">

        {/* ── LEFT — text content ── */}
        <div className="flex flex-col justify-center lg:w-1/2 px-8 md:px-14 lg:px-16 xl:px-24 pt-10 lg:pt-0 pb-10 lg:pb-0">

          {/* Status pill */}
          <motion.div
            className="flex items-center gap-2 mb-8 w-fit px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>
              Available For Work
            </span>
          </motion.div>

          {/* Hello text */}
          <motion.p
            className="mb-1"
            style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", fontWeight: 300 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Hello, It's Me
          </motion.p>

          {/* Name */}
          <motion.h1
            className="font-bold mb-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "var(--secondary)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Shashini Aluthge
          </motion.h1>

          {/* Typing role */}
          <motion.h2
            className="font-semibold mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(18px, 2.5vw, 32px)",
              color: "var(--secondary)",
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            And I'm a{" "}
            <span style={{ color: "var(--primary)" }}>
              {roles[roleIndex].substring(0, characterIndex)}
            </span>
            <span className="typing-cursor">|</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="mb-8 max-w-lg"
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.9,
              fontWeight: 300,
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I'm a Software Engineer skilled in full stack development —
            building intuitive, responsive web and mobile applications
            with a strong focus on clean design and user experience.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-row gap-4 flex-wrap mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="https://drive.google.com/file/d/1fVGnWLFz54AU5Y4Y0QKt07jRt5D_Mie_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-semibold rounded-full text-sm text-white"
              style={{
                background: "var(--primary)",
                boxShadow: "0 6px 24px rgba(0,157,255,0.35)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Download CV
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-3 font-semibold rounded-full text-sm"
              style={{
                color: "var(--primary)",
                border: "1px solid rgba(0,157,255,0.35)",
                background: "rgba(0,157,255,0.06)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <SocialIcons />
          </motion.div>
        </div>

        {/* ── RIGHT — profile image full height ── */}
        <div className="relative lg:w-1/2 flex items-end justify-center lg:justify-end overflow-hidden min-h-[400px] lg:min-h-screen">

          {/* Glow behind image */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "70%",
              height: "70%",
              background: "radial-gradient(ellipse, rgba(0,157,255,0.2) 0%, transparent 65%)",
              filter: "blur(50px)",
              zIndex: 0,
            }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Vertical glow line on left edge of right panel */}
          <div
            className="absolute left-0 top-1/4 bottom-1/4 w-px hidden lg:block"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(0,157,255,0.3), transparent)",
            }}
          />

          {/* Floating badge */}
          <motion.div
            className="absolute top-1/3 left-6 glass-badge px-4 py-2 rounded-2xl z-20 hidden lg:flex items-center gap-2"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
              Open to Work
            </span>
          </motion.div>

          {/* Profile image — full height, anchored to bottom */}
          <motion.img
            src={profileImage}
            alt="Shashini Aluthge"
            className="relative z-10 object-contain object-bottom w-full"
            style={{
              height: "100vh",
              maxHeight: "100vh",
              filter: "drop-shadow(0 0 50px rgba(0,157,255,0.35))",
            }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            whileHover={{
              filter: "drop-shadow(0 0 70px rgba(0,157,255,0.5))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ── Stars ── */
const Stars = () => {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 4,
    minOp: 0.1 + Math.random() * 0.15,
    maxOp: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
          }}
          animate={{ opacity: [s.minOp, s.maxOp, s.minOp] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Home;