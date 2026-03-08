import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hospital, Activity, ShieldCheck, Cpu, Wifi, Heart } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4400),
      setTimeout(() => onComplete(), 5800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 1.8;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const statusMessages = [
    "Establishing secure connection...",
    "Loading clinical modules...",
    "Verifying HIPAA compliance...",
    "Synchronizing patient data...",
    "System ready. Welcome.",
  ];

  const modules = [
    { icon: Activity, label: "Diagnostics", delay: 0.8 },
    { icon: ShieldCheck, label: "Security", delay: 1.4 },
    { icon: Cpu, label: "Systems", delay: 2.0 },
    { icon: Wifi, label: "Network", delay: 2.6 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(145deg, hsl(222 47% 5%) 0%, hsl(222 47% 11%) 50%, hsl(217 91% 8%) 100%)" }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(217 91% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 50%) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(217 91% 50% / 0.08) 0%, transparent 70%)" }}
      />

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[240, 340, 440].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ 
              width: size, 
              height: size,
              border: `1px solid hsl(217 91% 50% / ${0.08 - i * 0.02})`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Scanning beam */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ 
          background: "linear-gradient(90deg, transparent, hsl(217 91% 50% / 0.4), transparent)",
          boxShadow: "0 0 40px 8px hsl(217 91% 50% / 0.15)"
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.1 }}
          className="relative mb-10"
        >
          <div className="h-20 w-20 rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(255 60% 58%))",
              boxShadow: "0 0 60px hsl(217 91% 50% / 0.3), 0 20px 40px -10px rgba(0,0,0,0.3)"
            }}>
            <Hospital className="h-10 w-10 text-white relative z-10" />
            <motion.div 
              className="absolute inset-0 bg-white/10"
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <motion.div
            className="absolute -inset-2 rounded-3xl"
            style={{ border: "1px solid hsl(217 91% 50% / 0.3)" }}
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
            HMS<span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(174,62%,48%)]">Enterprise</span>
          </h1>
          <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-white/40">
            Hospital Management System
          </p>
        </motion.div>

        {/* Module indicators */}
        <motion.div
          className="flex items-center gap-5 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {modules.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase > i ? 1 : 0.2, y: 0 }}
              transition={{ delay: item.delay, duration: 0.4 }}
            >
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-700 ${
                phase > i 
                  ? "bg-[hsl(217,91%,50%)]/15 text-[hsl(217,91%,60%)] shadow-[0_0_20px_hsl(217,91%,50%/0.15)]" 
                  : "bg-white/[0.03] text-white/20"
              }`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/30">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress */}
        <div className="w-72 md:w-80">
          <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                background: "linear-gradient(90deg, hsl(217 91% 50%), hsl(174 62% 48%), hsl(255 60% 58%))",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="text-[11px] text-white/40 font-medium"
              >
                {statusMessages[Math.min(phase, statusMessages.length - 1)]}
              </motion.p>
            </AnimatePresence>
            <span className="text-[10px] font-mono text-white/25">{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </div>

        {/* Heartbeat line */}
        <motion.div 
          className="mt-8 w-56 h-8 opacity-30" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.3 }} 
          transition={{ delay: 1.2 }}
        >
          <svg viewBox="0 0 300 40" className="w-full h-full">
            <motion.path
              d="M 0 20 L 80 20 L 90 8 L 100 32 L 110 20 L 190 20 L 200 5 L 210 35 L 220 20 L 300 20"
              fill="none"
              stroke="hsl(217 91% 50%)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1], opacity: [0, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
