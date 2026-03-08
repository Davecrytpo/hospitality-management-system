import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, ShieldCheck, ActivitySquare } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const statusSteps = [
  "Initializing clinical core",
  "Syncing emergency workflows",
  "Verifying security posture",
  "Launching command surface",
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 550),
      setTimeout(() => setPhase(2), 1250),
      setTimeout(() => setPhase(3), 2050),
      setTimeout(() => onComplete(), 3200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.7;
      });
    }, 85);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-sidebar overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="ambient-orb -top-20 left-1/2 -translate-x-1/2 h-72 w-72" />
      <div className="ambient-orb -bottom-20 right-10 h-64 w-64" />

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-dark rounded-3xl border border-sidebar-border/80 p-7"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="h-11 w-11 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center"
              >
                <HeartPulse className="h-5 w-5 text-primary" />
              </motion.div>
              <div>
                <h1 className="font-display text-lg font-bold text-sidebar-foreground">HMS Enterprise</h1>
                <p className="text-[11px] tracking-[0.16em] uppercase text-sidebar-foreground/55">Clinical Boot Sequence</p>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full border border-primary/35 bg-primary/10 text-[10px] font-semibold text-primary">LIVE</div>
          </div>

          <div className="mt-6 rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/60 p-4 scanline">
            <div className="flex items-center justify-between text-[11px] text-sidebar-foreground/70 mb-2">
              <span>System readiness</span>
              <span>{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-sidebar-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.12 }}
              />
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-sidebar-foreground/75">
              <ShieldCheck className="h-3.5 w-3.5 text-medical-success" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {statusSteps[Math.min(phase, statusSteps.length - 1)]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { icon: ActivitySquare, label: "Vitals" },
              { icon: ShieldCheck, label: "Security" },
              { icon: HeartPulse, label: "Systems" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/45 p-2.5 text-center"
              >
                <item.icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
                <p className="text-[10px] text-sidebar-foreground/75">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
