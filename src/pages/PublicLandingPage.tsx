import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Lock, 
  Globe, 
  Heart,
  Stethoscope,
  Microscope,
  Cpu,
  Database,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";

const EKGLine = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1000 100">
        <motion.path
          d="M 0 50 L 100 50 L 110 30 L 120 70 L 130 50 L 250 50 L 260 10 L 270 90 L 280 50 L 400 50 L 410 40 L 420 60 L 430 50 L 600 50 L 610 20 L 620 80 L 630 50 L 1000 50"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1],
            opacity: [0, 1, 0],
            translateX: [0, 1000]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </svg>
    </div>
  );
};

export default function PublicLandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      {/* Background HUD Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <EKGLine />
      </div>

      {/* Futuristic Navbar */}
      <nav className="relative z-50 border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="h-14 w-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter text-white block leading-none">MEDICARE</span>
              <span className="text-[10px] font-bold text-blue-400 tracking-[0.3em] uppercase">Enterprise Core</span>
            </div>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-12">
            {["Technology", "Specialties", "Network", "Security"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-6"
          >
            <Button variant="ghost" asChild className="text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white/5 text-blue-400">
              <Link to="/auth">
                <Lock className="mr-2 h-3 w-3" /> Institutional Login
              </Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero: The "WOW" Section */}
      <section className="relative z-10 pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8"
              >
                <Zap className="h-3 w-3 animate-pulse" /> Precision Healthcare Infrastructure
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl lg:text-[100px] font-black tracking-tighter leading-[0.85] text-white mb-10"
              >
                Data-First <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                  Medical Logic.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12 font-medium"
              >
                A high-fidelity management ecosystem for modern medical institutions. Synchronized biometrics, real-time clinical queues, and encrypted patient data.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              >
                <Button size="lg" className="h-16 px-10 text-xs font-black tracking-[0.2em] uppercase rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105" asChild>
                  <a href="#medical-tech">
                    View Network Status <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Visual HUD Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex-1 relative"
            >
              <div className="relative rounded-[40px] border border-white/10 bg-slate-900/40 p-2 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                
                {/* Animated Scanner Line */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-blue-400/50 blur-[2px] z-20 shadow-[0_0_15px_#3b82f6]"
                />

                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                  alt="Medical Tech" 
                  className="rounded-[32px] w-full aspect-square object-cover opacity-60 grayscale brightness-125"
                />

                {/* Floating Data Points */}
                <div className="absolute top-10 left-10 space-y-4">
                  {[1, 2].map((i) => (
                    <motion.div 
                      key={i}
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                      className="p-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 min-w-[180px]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biometric_Feed_{i}</span>
                      </div>
                      <div className="mt-2 text-xl font-black text-white font-mono">
                        {i === 1 ? "120/80" : "98.2°F"}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Infrastructure */}
      <section id="technology" className="relative z-10 py-32 border-y border-white/5 bg-slate-950/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Neural Diagnostics", icon: Microscope, color: "text-blue-400", desc: "Automated analysis of lab results using institutional AI models for 99.9% accuracy." },
              { title: "Real-time MAR", icon: Database, color: "text-indigo-400", desc: "Digital Medication Administration Records synchronized across all nursing stations." },
              { title: "Encrypted Core", icon: ShieldCheck, color: "text-emerald-400", desc: "Military-grade encryption for all medical records and financial transactions." }
            ].map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500 group"
              >
                <div className={`h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center ${tech.color} mb-8 shadow-inner`}>
                  <tech.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white tracking-tight">{tech.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-40 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-12"
          >
            The Future of Hospital <br />Management is Here.
          </motion.h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="outline" className="h-16 px-12 border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-[0.2em] rounded-2xl" asChild>
              <Link to="/auth">Access Staff Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="relative z-10 bg-slate-950 pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">MEDICARE</span>
            </div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
              Institutional Infrastructure • Secure Medical Logic • Global Excellence
            </p>
            <div className="h-[1px] w-20 bg-white/10" />
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
              © 2026 MediCare Enterprise HMS. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
