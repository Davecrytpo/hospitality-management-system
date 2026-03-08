import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => onComplete(), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 3.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const messages = [
    "Initializing system...",
    "Loading modules...",
    "Securing connection...",
    "Welcome.",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[hsl(220,27%,14%)]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(162 63% 41% / 0.4) 0%, transparent 70%)" }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative mb-8"
        >
          <div className="h-20 w-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[hsl(162,63%,41%)] to-[hsl(162,63%,30%)]"
            style={{ boxShadow: "0 0 60px hsl(162 63% 41% / 0.4), 0 20px 40px -10px rgba(0,0,0,0.4)" }}>
            <Heart className="h-9 w-9 text-white" fill="currentColor" />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-display font-bold tracking-tight text-white mb-1.5">
            HMS<span className="text-[hsl(162,63%,48%)]">Enterprise</span>
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium">
            Hospital Management System
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[hsl(162,63%,41%)] to-[hsl(162,63%,55%)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-white/35 font-medium"
            >
              {messages[Math.min(phase, messages.length - 1)]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
