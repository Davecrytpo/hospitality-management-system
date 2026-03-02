import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Activity, ShieldCheck, Cpu } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 3800);
    const t4 = setTimeout(() => onComplete(), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const statusMessages = [
    "Initializing secure connection...",
    "Loading medical modules...",
    "Verifying HIPAA compliance...",
    "System ready. Welcome."
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 40%, #020617 100%)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        style={{ boxShadow: "0 0 30px 10px rgba(59,130,246,0.3)" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[200, 280, 360].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-blue-500/20"
            style={{ width: size, height: size }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="h-24 w-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-[0_0_80px_rgba(37,99,235,0.5)]">
            <Building2 className="h-12 w-12 text-white" />
          </div>
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-blue-400"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2">
            HMS<span className="text-blue-400">Enterprise</span>
          </h1>
          <p className="text-[10px] font-bold text-blue-400/70 tracking-[0.5em] uppercase">
            Hospital Management System
          </p>
        </motion.div>

        {/* Status icons */}
        <motion.div
          className="flex items-center gap-6 mt-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { icon: Activity, label: "Diagnostics", delay: 1.2 },
            { icon: ShieldCheck, label: "Security", delay: 1.6 },
            { icon: Cpu, label: "Systems", delay: 2.0 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase > i ? 1 : 0.3, y: 0 }}
              transition={{ delay: item.delay }}
            >
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                phase > i ? "bg-blue-600/30 text-blue-400" : "bg-white/5 text-slate-600"
              }`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 md:w-80">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[11px] text-slate-400 font-medium tracking-wide"
            >
              {statusMessages[phase]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Heartbeat line */}
        <motion.div className="mt-10 w-64 h-12 opacity-40" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }}>
          <svg viewBox="0 0 300 50" className="w-full h-full">
            <motion.path
              d="M 0 25 L 60 25 L 70 10 L 80 40 L 90 25 L 150 25 L 160 5 L 170 45 L 180 25 L 240 25 L 250 15 L 260 35 L 270 25 L 300 25"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
