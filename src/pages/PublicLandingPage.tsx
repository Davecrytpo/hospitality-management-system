import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
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
  Zap,
  Users,
  BedDouble,
  Pill,
  FlaskConical,
  Monitor,
  Phone,
  Clock,
  CheckCircle2,
  Star,
  MapPin,
  Fingerprint,
  Eye,
  Server,
  Wifi,
  BarChart3,
  HeartPulse,
  Ambulance,
  Baby,
  Brain,
  Bone,
  Syringe
} from "lucide-react";
import { useState, useEffect } from "react";

const EKGLine = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <svg className="w-full h-full" viewBox="0 0 1000 100">
      <motion.path
        d="M 0 50 L 100 50 L 110 30 L 120 70 L 130 50 L 250 50 L 260 10 L 270 90 L 280 50 L 400 50 L 410 40 L 420 60 L 430 50 L 600 50 L 610 20 L 620 80 L 630 50 L 1000 50"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1], opacity: [0, 1, 0], translateX: [0, 1000] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

const stats = [
  { value: "50,000+", label: "Patients Treated", icon: Users },
  { value: "200+", label: "Medical Staff", icon: Stethoscope },
  { value: "15+", label: "Departments", icon: Building2 },
  { value: "99.9%", label: "System Uptime", icon: Server },
];

const specialties = [
  { name: "Cardiology", icon: HeartPulse, desc: "Advanced cardiac care with state-of-the-art catheterization labs and electrophysiology studies.", color: "text-red-400" },
  { name: "Neurology", icon: Brain, desc: "Comprehensive neurological diagnostics including EEG, EMG, and advanced neuroimaging.", color: "text-purple-400" },
  { name: "Orthopedics", icon: Bone, desc: "Joint replacement, sports medicine, and minimally invasive spinal surgery.", color: "text-amber-400" },
  { name: "Pediatrics", icon: Baby, desc: "Dedicated pediatric ward with specialized neonatal intensive care unit (NICU).", color: "text-green-400" },
  { name: "Emergency Medicine", icon: Ambulance, desc: "24/7 Level-1 trauma center with rapid response teams and helicopter landing pad.", color: "text-orange-400" },
  { name: "Oncology", icon: Syringe, desc: "Multi-disciplinary cancer treatment including chemotherapy, radiation, and immunotherapy.", color: "text-pink-400" },
];

const networkFeatures = [
  { title: "Multi-Location Sync", desc: "Real-time data synchronization across all hospital branches and satellite clinics.", icon: Globe },
  { title: "Telemedicine Ready", desc: "Integrated video consultation platform connecting patients with specialists remotely.", icon: Monitor },
  { title: "Ambulance GPS Tracking", desc: "Live fleet monitoring with automatic nearest-hospital routing and ETA calculations.", icon: MapPin },
  { title: "Lab Network Integration", desc: "Connected laboratory information system with auto-result delivery to physician portals.", icon: FlaskConical },
];

const securityFeatures = [
  { title: "End-to-End Encryption", desc: "All patient data encrypted at rest and in transit using AES-256 military-grade encryption.", icon: Lock },
  { title: "Biometric Access Control", desc: "Fingerprint and facial recognition for staff portal access and medication dispensing.", icon: Fingerprint },
  { title: "Role-Based Permissions", desc: "Granular access control ensuring staff only see data relevant to their department and role.", icon: Eye },
  { title: "HIPAA Compliant", desc: "Full compliance with healthcare data protection regulations and audit trail logging.", icon: ShieldCheck },
  { title: "Real-Time Monitoring", desc: "24/7 intrusion detection and automated threat response with instant alert notifications.", icon: Wifi },
  { title: "Disaster Recovery", desc: "Automated backups with 99.99% data recovery guarantee and geo-redundant storage.", icon: Database },
];

const services = [
  { name: "Patient Portal", desc: "Access records, book appointments, and pay bills online 24/7.", icon: Users, link: "/patient-portal/login" },
  { name: "Kiosk Check-in", desc: "Self-service arrival kiosks for fast walk-in registration.", icon: Monitor, link: "/kiosk" },
  { name: "Verify Results", desc: "Check your lab results or prescription status with a tracking code.", icon: CheckCircle2, link: "/verify" },
  { name: "Emergency", desc: "24/7 Emergency department. Call for critical situations.", icon: Phone, link: "#" },
];

export default function PublicLandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <EKGLine />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tighter text-white block leading-none">HMS</span>
              <span className="text-[9px] font-bold text-blue-400 tracking-[0.3em] uppercase">Enterprise Core</span>
            </div>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: "Technology", href: "#technology" },
              { label: "Specialties", href: "#specialties" },
              { label: "Network", href: "#network" },
              { label: "Security", href: "#security" },
              { label: "Services", href: "#services" },
            ].map((item, i) => (
              <motion.a key={item.label} href={item.href} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 * i }}
                className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase hover:text-white transition-colors">
                {item.label}
              </motion.a>
            ))}
          </div>

          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-4">
            <Button variant="ghost" asChild className="text-[10px] font-black tracking-[0.15em] uppercase hover:bg-white/5 text-slate-400">
              <Link to="/patient-portal/login">Patient Portal</Link>
            </Button>
            <Button asChild className="text-[10px] font-black tracking-[0.15em] uppercase bg-blue-600 hover:bg-blue-500 rounded-xl">
              <Link to="/auth"><Lock className="mr-2 h-3 w-3" /> Staff Login</Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-32 lg:pt-28 lg:pb-36">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8">
                <Zap className="h-3 w-3 animate-pulse" /> Precision Healthcare Infrastructure
              </motion.div>
              
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-5xl lg:text-[90px] font-black tracking-tighter leading-[0.85] text-white mb-10">
                Data-First <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Medical Logic.</span>
              </motion.h1>
              
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 font-medium">
                A high-fidelity management ecosystem for modern medical institutions. Synchronized biometrics, real-time clinical queues, and encrypted patient data — all in one platform.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 text-xs font-black tracking-[0.15em] uppercase rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)]" asChild>
                  <Link to="/patient-portal/login">Access Patient Portal <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-xs font-black tracking-[0.15em] uppercase rounded-2xl border-white/10 hover:bg-white/5" asChild>
                  <a href="#services">Our Services</a>
                </Button>
              </motion.div>
            </div>

            {/* HUD Mockup */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="flex-1 relative">
              <div className="relative rounded-[32px] border border-white/10 bg-slate-900/40 p-2 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-blue-400/50 blur-[2px] z-20 shadow-[0_0_15px_#3b82f6]" />
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                  alt="Medical Technology" className="rounded-[28px] w-full aspect-square object-cover opacity-60 grayscale brightness-125" />
                <div className="absolute top-8 left-8 space-y-3">
                  {[{ label: "Heart_Rate", val: "72 BPM" }, { label: "O2_Sat", val: "98.4%" }].map((d, i) => (
                    <motion.div key={i} animate={{ x: [0, 8, 0] }} transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                      className="p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{d.label}</span>
                      </div>
                      <div className="mt-1 text-lg font-black text-white font-mono">{d.val}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Stats Banner */}
      <section className="relative z-10 border-y border-white/5 bg-slate-950/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <s.icon className="h-6 w-6 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative z-10 py-28 border-b border-white/5">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-[10px] font-black text-blue-400 tracking-[0.3em] uppercase">Core Infrastructure</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">Built for Hospital-Grade Performance</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Our platform is engineered from the ground up for high-availability medical environments with zero-downtime requirements.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Neural Diagnostics", icon: Microscope, color: "text-blue-400", desc: "Automated analysis of lab results with institutional AI models for 99.9% accuracy. Smart flagging of abnormal values." },
              { title: "Real-time MAR", icon: Database, color: "text-indigo-400", desc: "Digital Medication Administration Records synchronized across all nursing stations with barcode verification." },
              { title: "Encrypted Core", icon: ShieldCheck, color: "text-emerald-400", desc: "Military-grade encryption for all medical records, financial transactions, and inter-department communications." }
            ].map((tech, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[24px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500">
                <div className={`h-14 w-14 rounded-xl bg-white/5 flex items-center justify-center ${tech.color} mb-6`}>
                  <tech.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black mb-3 text-white tracking-tight">{tech.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="relative z-10 py-28 border-b border-white/5 bg-slate-950/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase">Medical Departments</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">World-Class Specialties</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Our hospital houses over 15 specialized departments staffed by board-certified physicians and cutting-edge equipment.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center ${s.color} shrink-0`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{s.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section id="network" className="relative z-10 py-28 border-b border-white/5">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-[10px] font-black text-green-400 tracking-[0.3em] uppercase">Connected Infrastructure</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">Hospital Network</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">A unified system connecting every department, clinic, ambulance, and laboratory in real-time for seamless patient care.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {networkFeatures.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                  <f.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Network Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { label: "Connected Devices", value: "2,400+", icon: Wifi },
              { label: "Data Processed/Day", value: "1.2 TB", icon: BarChart3 },
              { label: "Avg Response Time", value: "< 200ms", icon: Clock },
            ].map((ns, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <ns.icon className="h-5 w-5 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">{ns.value}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{ns.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative z-10 py-28 border-b border-white/5 bg-slate-950/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-[10px] font-black text-amber-400 tracking-[0.3em] uppercase">Data Protection</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">Enterprise Security</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Patient data is our most sacred responsibility. Our multi-layered security architecture exceeds industry standards.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Quick Access Section */}
      <section id="services" className="relative z-10 py-28 border-b border-white/5">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-[10px] font-black text-indigo-400 tracking-[0.3em] uppercase">Patient Services</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">Quick Access</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Everything you need as a patient — accessible from anywhere, at any time.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={s.link} className="block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-indigo-500/20 transition-all h-full group">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.name}</h3>
                  <p className="text-slate-400 text-sm">{s.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section className="relative z-10 py-28 border-b border-white/5 bg-slate-950/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <span className="text-[10px] font-black text-yellow-400 tracking-[0.3em] uppercase">Trusted By</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">Patient Testimonials</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", role: "Patient", text: "The online portal made managing my appointments and viewing lab results incredibly easy. I could access everything from my phone.", rating: 5 },
              { name: "Dr. James K.", role: "Cardiologist", text: "The real-time patient monitoring and integrated prescribing system has dramatically improved our department's efficiency.", rating: 5 },
              { name: "Maria L.", role: "Patient", text: "Being able to check in via the kiosk and pay bills online saved me hours of waiting. The staff notification system kept me informed throughout.", rating: 5 },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-6">
            The Future of Hospital<br />Management is Here.
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">Join thousands of healthcare professionals who trust our platform for secure, efficient, and intelligent hospital operations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 text-xs font-black tracking-[0.15em] uppercase rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)]" asChild>
              <Link to="/patient-portal/login">Patient Portal</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-[0.15em] rounded-2xl" asChild>
              <Link to="/auth">Staff Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950 pt-16 pb-8 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-black tracking-tighter text-white uppercase">HMS</span>
              </div>
              <p className="text-slate-500 text-sm">Enterprise-grade hospital management for modern healthcare institutions.</p>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/patient-portal/login" className="block text-sm text-slate-400 hover:text-white transition-colors">Patient Portal</Link>
                <Link to="/auth" className="block text-sm text-slate-400 hover:text-white transition-colors">Staff Login</Link>
                <Link to="/kiosk" className="block text-sm text-slate-400 hover:text-white transition-colors">Kiosk Check-in</Link>
                <Link to="/verify" className="block text-sm text-slate-400 hover:text-white transition-colors">Verify Results</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Departments</h4>
              <div className="space-y-2">
                {["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency"].map(d => (
                  <a key={d} href="#specialties" className="block text-sm text-slate-400 hover:text-white transition-colors">{d}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Emergency: <span className="text-red-400 font-bold">911</span></p>
                <p>Reception: +1 (555) 123-4567</p>
                <p>Email: info@hms-hospital.com</p>
                <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> Open 24/7</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
              © 2026 Hospitality Management System. All Rights Reserved. • HIPAA Compliant • ISO 27001 Certified
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
