import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Building2, ShieldCheck, Activity, ChevronRight, Lock, Globe, Heart,
  Stethoscope, Microscope, Cpu, Database, Zap, Users, BedDouble, Pill,
  FlaskConical, Monitor, Phone, Clock, CheckCircle2, Star, MapPin,
  Fingerprint, Eye, Server, Wifi, BarChart3, HeartPulse, Ambulance,
  Baby, Brain, Bone, Syringe, Hospital
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";

const stats = [
  { value: "50,000+", label: "Patients Treated", icon: Users },
  { value: "200+", label: "Medical Staff", icon: Stethoscope },
  { value: "15+", label: "Departments", icon: Building2 },
  { value: "99.9%", label: "System Uptime", icon: Server },
];

const specialties = [
  { name: "Cardiology", icon: HeartPulse, desc: "Advanced cardiac care with state-of-the-art catheterization labs.", color: "text-red-400", bg: "bg-red-500/10", link: "/doctors/specializations" },
  { name: "Neurology", icon: Brain, desc: "Comprehensive neurological diagnostics and neuroimaging.", color: "text-purple-400", bg: "bg-purple-500/10", link: "/doctors/specializations" },
  { name: "Orthopedics", icon: Bone, desc: "Joint replacement, sports medicine, and spinal surgery.", color: "text-amber-400", bg: "bg-amber-500/10", link: "/doctors/specializations" },
  { name: "Pediatrics", icon: Baby, desc: "Pediatric ward with specialized NICU.", color: "text-emerald-400", bg: "bg-emerald-500/10", link: "/doctors/specializations" },
  { name: "Emergency", icon: Ambulance, desc: "24/7 Level-1 trauma center with rapid response.", color: "text-orange-400", bg: "bg-orange-500/10", link: "/departments/emergency" },
  { name: "Oncology", icon: Syringe, desc: "Multi-disciplinary cancer treatment programs.", color: "text-pink-400", bg: "bg-pink-500/10", link: "/doctors/specializations" },
];

const networkFeatures = [
  { title: "Multi-Location Sync", desc: "Real-time data synchronization across all branches.", icon: Globe },
  { title: "Telemedicine Ready", desc: "Integrated video consultation platform.", icon: Monitor },
  { title: "Ambulance GPS", desc: "Live fleet monitoring with nearest-hospital routing.", icon: MapPin },
  { title: "Lab Integration", desc: "Connected lab system with auto-result delivery.", icon: FlaskConical },
];

const securityFeatures = [
  { title: "End-to-End Encryption", desc: "AES-256 military-grade encryption for all data.", icon: Lock },
  { title: "Biometric Access", desc: "Fingerprint and facial recognition for staff.", icon: Fingerprint },
  { title: "Role-Based Permissions", desc: "Granular access control per department.", icon: Eye },
  { title: "HIPAA Compliant", desc: "Full healthcare data protection compliance.", icon: ShieldCheck },
  { title: "Real-Time Monitoring", desc: "24/7 intrusion detection with instant alerts.", icon: Wifi },
  { title: "Disaster Recovery", desc: "Automated backups with geo-redundant storage.", icon: Database },
];

const services = [
  { name: "Patient Portal", desc: "Access records, book appointments, pay bills.", icon: Users, link: "/patient-portal/login" },
  { name: "Kiosk Check-in", desc: "Self-service registration kiosks.", icon: Monitor, link: "/kiosk" },
  { name: "Verify Results", desc: "Check lab results with tracking code.", icon: CheckCircle2, link: "/verify" },
  { name: "Emergency", desc: "24/7 Emergency department.", icon: Phone, link: "#" },
];

export default function PublicLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      <div className="min-h-screen text-white overflow-x-hidden"
        style={{ background: "linear-gradient(145deg, hsl(222 47% 5%) 0%, hsl(222 47% 11%) 40%, hsl(222 47% 5%) 100%)" }}>

        {/* Subtle grid bg */}
        <div className="fixed inset-0 z-0 opacity-[0.025]"
          style={{ backgroundImage: `linear-gradient(hsl(217 91% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 50%) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

        {/* Navbar */}
        <nav className="relative z-50 border-b border-white/[0.04] bg-white/[0.02] backdrop-blur-2xl">
          <div className="container mx-auto px-6 h-18 flex items-center justify-between py-4">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(255 60% 58%))" }}>
                <Hospital className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white block leading-none">HMS Enterprise</span>
                <span className="text-[9px] font-semibold text-white/30 tracking-[0.2em] uppercase">Hospital System</span>
              </div>
            </motion.div>
            
            <div className="hidden lg:flex items-center gap-8">
              {["Technology", "Specialties", "Network", "Security", "Services"].map((label, i) => (
                <motion.a key={label} href={`#${label.toLowerCase()}`} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}
                  className="text-[11px] font-semibold tracking-wider text-white/40 uppercase hover:text-white transition-colors duration-200">
                  {label}
                </motion.a>
              ))}
            </div>

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
              <Button variant="ghost" asChild className="text-xs font-semibold text-white/40 hover:text-white hover:bg-white/5">
                <Link to="/patient-portal/login">Patient Portal</Link>
              </Button>
              <Button asChild className="text-xs font-semibold rounded-lg h-9 px-5"
                style={{ background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(255 60% 58%))" }}>
                <Link to="/auth"><Lock className="mr-1.5 h-3 w-3" /> Staff Login</Link>
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative z-10 pt-20 pb-28 lg:pt-32 lg:pb-40">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(217 91% 50% / 0.06) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-[10px] font-semibold tracking-widest uppercase mb-8">
                  <Zap className="h-3 w-3 text-primary animate-pulse" /> Precision Healthcare
                </motion.div>
                
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="text-5xl lg:text-[80px] font-extrabold tracking-tighter leading-[0.9] text-white mb-8">
                  Data-First{" "}
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, hsl(217 91% 60%), hsl(174 62% 48%), hsl(255 60% 65%))" }}>
                    Medical Logic.
                  </span>
                </motion.h1>
                
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                  className="text-base text-white/40 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
                  A high-fidelity management ecosystem for modern medical institutions. Synchronized biometrics, real-time clinical queues, and encrypted patient data.
                </motion.p>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button size="lg" className="h-12 px-8 text-xs font-semibold rounded-xl shadow-glow" asChild
                    style={{ background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(255 60% 58%))" }}>
                    <Link to="/patient-portal/login">Access Portal <ChevronRight className="ml-1.5 h-4 w-4" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-xs font-semibold rounded-xl border-white/10 hover:bg-white/5 text-white/60" asChild>
                    <a href="#services">Explore Services</a>
                  </Button>
                </motion.div>
              </div>

              {/* HUD Display */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex-1 relative max-w-lg">
                <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1.5 backdrop-blur-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                    alt="Medical Technology" className="rounded-xl w-full aspect-[4/3] object-cover opacity-50 grayscale" />
                  <div className="absolute top-6 left-6 space-y-2.5">
                    {[{ label: "Heart_Rate", val: "72 BPM" }, { label: "O2_Sat", val: "98.4%" }].map((d, i) => (
                      <motion.div key={i} animate={{ x: [0, 4, 0] }} transition={{ duration: 4, delay: i * 0.6, repeat: Infinity }}
                        className="p-3 bg-black/70 backdrop-blur-xl rounded-lg border border-white/[0.08] min-w-[140px]">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="text-[9px] font-semibold text-white/40 uppercase tracking-widest">{d.label}</span>
                        </div>
                        <div className="mt-1 text-base font-bold text-white font-mono">{d.val}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative z-10 border-y border-white/[0.04] bg-white/[0.01] backdrop-blur-xl">
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="text-center">
                  <s.icon className="h-5 w-5 text-primary mx-auto mb-2.5 opacity-60" />
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="relative z-10 py-24 border-b border-white/[0.04]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-14">
              <span className="text-[10px] font-semibold text-primary tracking-[0.2em] uppercase">Core Infrastructure</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mt-3">Hospital-Grade Performance</h2>
              <p className="text-white/35 mt-3 max-w-xl mx-auto text-sm">Engineered for high-availability medical environments.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: "Neural Diagnostics", icon: Microscope, color: "text-primary", desc: "AI-powered lab analysis with 99.9% accuracy and smart abnormal flagging." },
                { title: "Real-time MAR", icon: Database, color: "text-secondary", desc: "Digital Medication Administration Records with barcode verification." },
                { title: "Encrypted Core", icon: ShieldCheck, color: "text-medical-success", desc: "Military-grade encryption for all records and communications." },
              ].map((tech, i) => (
                <motion.div key={i} whileHover={{ y: -4 }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="p-7 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
                  <div className={`h-11 w-11 rounded-lg bg-white/[0.04] flex items-center justify-center ${tech.color} mb-5`}>
                    <tech.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">{tech.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties */}
        <section id="specialties" className="relative z-10 py-24 border-b border-white/[0.04]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-14">
              <span className="text-[10px] font-semibold text-secondary tracking-[0.2em] uppercase">Medical Departments</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mt-3">World-Class Specialties</h2>
              <p className="text-white/35 mt-3 max-w-xl mx-auto text-sm">15+ departments staffed by board-certified physicians.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialties.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3 }} onClick={() => navigate(s.link)}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all group cursor-pointer">
                  <div className="flex items-start gap-3.5">
                    <div className={`h-10 w-10 rounded-lg ${s.bg} flex items-center justify-center ${s.color} shrink-0`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">{s.name}</h3>
                      <p className="text-white/35 text-xs leading-relaxed">{s.desc}</p>
                      <span className="text-[10px] font-semibold text-white/20 uppercase tracking-wider mt-2 inline-block group-hover:text-primary/60 transition-colors">View →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Network */}
        <section id="network" className="relative z-10 py-24 border-b border-white/[0.04]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-14">
              <span className="text-[10px] font-semibold text-medical-success tracking-[0.2em] uppercase">Connected Infrastructure</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mt-3">Hospital Network</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {networkFeatures.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all">
                  <div className="h-10 w-10 rounded-lg bg-medical-success/10 flex items-center justify-center text-medical-success shrink-0">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: "Connected Devices", value: "2,400+", icon: Wifi },
                { label: "Data/Day", value: "1.2 TB", icon: BarChart3 },
                { label: "Response Time", value: "< 200ms", icon: Clock },
              ].map((ns, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="text-center p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <ns.icon className="h-4 w-4 text-medical-success mx-auto mb-2 opacity-60" />
                  <div className="text-lg font-bold text-white">{ns.value}</div>
                  <div className="text-[9px] text-white/25 font-semibold uppercase tracking-widest mt-1">{ns.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="relative z-10 py-24 border-b border-white/[0.04]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-14">
              <span className="text-[10px] font-semibold text-medical-warning tracking-[0.2em] uppercase">Data Protection</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mt-3">Enterprise Security</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {securityFeatures.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-medical-warning/15 transition-all">
                  <div className="h-9 w-9 rounded-lg bg-medical-warning/10 flex items-center justify-center text-medical-warning mb-3.5">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{f.title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative z-10 py-24 border-b border-white/[0.04]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-14">
              <span className="text-[10px] font-semibold text-accent tracking-[0.2em] uppercase">Patient Services</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mt-3">Quick Access</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Link to={s.link} className="block p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent/15 transition-all h-full group">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-3.5 group-hover:scale-105 transition-transform">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{s.name}</h3>
                    <p className="text-white/35 text-xs">{s.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative z-10 py-24 border-b border-white/[0.04]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-14">
              <span className="text-[10px] font-semibold text-medical-warning tracking-[0.2em] uppercase">Testimonials</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mt-3">Trusted by Thousands</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { name: "Sarah M.", role: "Patient", text: "Managing appointments and viewing lab results has never been easier." },
                { name: "Dr. James K.", role: "Cardiologist", text: "Real-time monitoring and integrated prescribing has transformed our workflow." },
                { name: "Maria L.", role: "Patient", text: "Kiosk check-in and online bill payment saved me hours of waiting." },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-medical-warning text-medical-warning" />
                    ))}
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed mb-3 italic">"{t.text}"</p>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/25 text-xs">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 py-28 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(217 91% 50% / 0.08) 0%, transparent 60%)" }} />
          <div className="container mx-auto px-6 relative">
            <motion.h2 initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-5">
              The Future of Hospital<br />Management is Here.
            </motion.h2>
            <p className="text-white/35 max-w-md mx-auto mb-8 text-sm">Join healthcare professionals who trust our platform for secure, intelligent operations.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="h-12 px-8 text-xs font-semibold rounded-xl shadow-glow" asChild
                style={{ background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(255 60% 58%))" }}>
                <Link to="/patient-portal/login">Patient Portal</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 border-white/10 hover:bg-white/5 text-xs font-semibold rounded-xl text-white/60" asChild>
                <Link to="/auth">Staff Portal</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 pt-14 pb-8 border-t border-white/[0.04]">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(255 60% 58%))" }}>
                    <Hospital className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-white">HMS Enterprise</span>
                </div>
                <p className="text-white/25 text-xs leading-relaxed">Enterprise-grade hospital management for modern healthcare.</p>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-3">Quick Links</h4>
                <div className="space-y-1.5">
                  {[{ label: "Patient Portal", to: "/patient-portal/login" }, { label: "Staff Login", to: "/auth" }, { label: "Kiosk", to: "/kiosk" }, { label: "Verify", to: "/verify" }].map(l => (
                    <Link key={l.to} to={l.to} className="block text-xs text-white/30 hover:text-white/60 transition-colors">{l.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-3">Departments</h4>
                <div className="space-y-1.5">
                  {["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency"].map(d => (
                    <a key={d} href="#specialties" className="block text-xs text-white/30 hover:text-white/60 transition-colors">{d}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-3">Contact</h4>
                <div className="space-y-1.5 text-xs text-white/30">
                  <p>Emergency: <span className="text-medical-danger font-semibold">911</span></p>
                  <p>Reception: +1 (555) 123-4567</p>
                  <p>Email: info@hms-hospital.com</p>
                  <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> Open 24/7</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/[0.04] pt-6 text-center">
              <p className="text-[10px] text-white/15 font-semibold uppercase tracking-[0.2em]">
                © 2026 HMS Enterprise. All Rights Reserved. • HIPAA Compliant • ISO 27001
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
