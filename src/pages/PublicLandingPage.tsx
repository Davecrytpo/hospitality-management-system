import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Building2, ShieldCheck, Activity, ChevronRight, Lock, Globe, Heart,
  Stethoscope, Microscope, Database, Zap, Users, BedDouble, Pill,
  FlaskConical, Monitor, Phone, Clock, CheckCircle2, Star, MapPin,
  Fingerprint, Eye, Server, Wifi, BarChart3, HeartPulse, Ambulance,
  Baby, Brain, Bone, Syringe, ArrowRight, Play, Shield, Sparkles
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
  { name: "Cardiology", icon: HeartPulse, desc: "Advanced cardiac care with state-of-the-art catheterization labs.", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10", link: "/doctors/specializations" },
  { name: "Neurology", icon: Brain, desc: "Comprehensive neurological diagnostics and neuroimaging.", color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10", link: "/doctors/specializations" },
  { name: "Orthopedics", icon: Bone, desc: "Joint replacement, sports medicine, and spinal surgery.", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", link: "/doctors/specializations" },
  { name: "Pediatrics", icon: Baby, desc: "Pediatric ward with specialized NICU.", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", link: "/doctors/specializations" },
  { name: "Emergency", icon: Ambulance, desc: "24/7 Level-1 trauma center with rapid response.", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10", link: "/departments/emergency" },
  { name: "Oncology", icon: Syringe, desc: "Multi-disciplinary cancer treatment programs.", color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10", link: "/doctors/specializations" },
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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

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

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-primary">
                <Heart className="h-4.5 w-4.5 text-primary-foreground" fill="currentColor" />
              </div>
              <div>
                <span className="text-sm font-display font-bold tracking-tight text-foreground block leading-none">HMS Enterprise</span>
                <span className="text-[9px] font-medium text-muted-foreground tracking-wider uppercase">Hospital System</span>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center gap-8">
              {["Technology", "Specialties", "Network", "Security", "Services"].map((label, i) => (
                <motion.a key={label} href={`#${label.toLowerCase()}`} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </motion.a>
              ))}
            </div>

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="text-xs font-medium text-muted-foreground hover:text-foreground">
                <Link to="/patient-portal/login">Patient Portal</Link>
              </Button>
              <Button size="sm" asChild className="text-xs font-semibold rounded-lg h-9 px-4 bg-primary hover:bg-primary/90">
                <Link to="/auth"><Lock className="mr-1.5 h-3 w-3" /> Staff Login</Link>
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(162 63% 41% / 0.15) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, hsl(199 89% 48% / 0.12) 0%, transparent 70%)" }} />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 text-center lg:text-left">
                <motion.div {...fadeUp}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-6">
                  <Sparkles className="h-3.5 w-3.5" /> Next-Gen Healthcare Platform
                </motion.div>

                <motion.h1 {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-[1.08] text-foreground mb-6">
                  With the Patient{" "}
                  <span className="text-primary">at the Heart</span>
                </motion.h1>

                <motion.p {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-base lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                  An intelligent hospital management ecosystem that empowers clinicians, streamlines operations, and delivers exceptional patient care — all on one unified platform.
                </motion.p>

                <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button size="lg" className="h-12 px-7 text-sm font-semibold rounded-xl shadow-glow bg-primary hover:bg-primary/90" asChild>
                    <Link to="/patient-portal/login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-7 text-sm font-semibold rounded-xl" asChild>
                    <a href="#technology"><Play className="mr-2 h-4 w-4" /> Watch Demo</a>
                  </Button>
                </motion.div>
              </div>

              {/* Hero visual — medical dashboard preview */}
              <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.7 }}
                className="flex-1 relative max-w-lg w-full">
                <div className="relative rounded-2xl border border-border bg-card p-6 shadow-premium">
                  {/* Mini dashboard preview */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-2.5 w-2.5 rounded-full bg-medical-success" />
                    <span className="text-xs font-medium text-muted-foreground">Live Dashboard</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: "Heart Rate", value: "72 BPM", color: "text-rose-500" },
                      { label: "O₂ Sat", value: "98.4%", color: "text-primary" },
                      { label: "Blood Pressure", value: "120/80", color: "text-medical-info" },
                      { label: "Temperature", value: "36.6°C", color: "text-amber-500" },
                    ].map((v, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="p-3.5 rounded-xl bg-muted/50 border border-border/50">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">{v.label}</p>
                        <p className={`text-lg font-bold font-display ${v.color}`}>{v.value}</p>
                      </motion.div>
                    ))}
                  </div>
                  {/* Mini chart placeholder */}
                  <div className="h-24 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 flex items-center justify-center">
                    <Activity className="h-8 w-8 text-primary/30" />
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl bg-card border border-border shadow-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">HIPAA Compliant</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative z-10 border-y border-border bg-muted/30">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="text-center">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-display font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">Core Infrastructure</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight mt-3">Hospital-Grade Technology</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Engineered for high-availability medical environments with zero downtime.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "AI Diagnostics", icon: Microscope, desc: "AI-powered lab analysis with 99.9% accuracy and smart abnormal flagging." },
                { title: "Real-time Records", icon: Database, desc: "Digital Medication Administration Records with barcode verification." },
                { title: "Enterprise Security", icon: ShieldCheck, desc: "Military-grade encryption for all records and communications." },
              ].map((tech, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card-hover transition-all duration-300">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <tech.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 text-foreground">{tech.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties */}
        <section id="specialties" className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">Medical Departments</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight mt-3">World-Class Specialties</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">15+ departments staffed by board-certified physicians.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {specialties.map((s, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.06 }}
                  onClick={() => navigate(s.link)}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card-hover transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className={`h-11 w-11 rounded-xl ${s.bg} flex items-center justify-center ${s.color} shrink-0`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{s.name}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Network */}
        <section id="network" className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="text-xs font-semibold text-medical-info tracking-wider uppercase">Connected Infrastructure</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight mt-3">Hospital Network</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-5">
              {networkFeatures.map((f, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-medical-info/20 transition-all">
                  <div className="h-11 w-11 rounded-xl bg-medical-info/10 flex items-center justify-center text-medical-info shrink-0">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-foreground mb-1">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: "Connected Devices", value: "2,400+", icon: Wifi },
                { label: "Data/Day", value: "1.2 TB", icon: BarChart3 },
                { label: "Response Time", value: "< 200ms", icon: Clock },
              ].map((ns, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                  className="text-center p-5 rounded-2xl bg-card border border-border">
                  <ns.icon className="h-5 w-5 text-medical-info mx-auto mb-2" />
                  <div className="text-xl font-display font-bold text-foreground">{ns.value}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">{ns.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="text-xs font-semibold text-medical-warning tracking-wider uppercase">Data Protection</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight mt-3">Enterprise Security</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {securityFeatures.map((f, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-medical-warning/20 transition-all">
                  <div className="h-10 w-10 rounded-xl bg-medical-warning/10 flex items-center justify-center text-medical-warning mb-4">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-display font-bold text-foreground mb-1.5">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="text-xs font-semibold text-medical-accent tracking-wider uppercase">Patient Services</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight mt-3">Quick Access</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((s, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <Link to={s.link} className="block p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card-hover transition-all h-full group">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-display font-bold text-foreground mb-1">{s.name}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">Testimonials</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight mt-3">Trusted by Thousands</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Sarah M.", role: "Patient", text: "Managing appointments and viewing lab results has never been easier. The portal is incredibly intuitive." },
                { name: "Dr. James K.", role: "Cardiologist", text: "Real-time monitoring and integrated prescribing has transformed our workflow completely." },
                { name: "Maria L.", role: "Patient", text: "Kiosk check-in and online bill payment saved me hours of waiting. Outstanding experience." },
              ].map((t, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-medical-warning text-medical-warning" />
                    ))}
                  </div>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div>
                    <div className="text-foreground font-display font-semibold text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-medical-info/5" />
          <div className="container mx-auto px-6 relative text-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground tracking-tight mb-5">
                The Future of Hospital<br />Management is Here.
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">Join healthcare professionals who trust our platform for secure, intelligent operations.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="h-12 px-8 text-sm font-semibold rounded-xl shadow-glow bg-primary hover:bg-primary/90" asChild>
                  <Link to="/patient-portal/login">Patient Portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-sm font-semibold rounded-xl" asChild>
                  <Link to="/auth">Staff Portal</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-14 pb-8 border-t border-border bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-primary">
                    <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
                  </div>
                  <span className="text-sm font-display font-bold tracking-tight text-foreground">HMS Enterprise</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">Enterprise-grade hospital management for modern healthcare.</p>
              </div>
              <div>
                <h4 className="text-xs font-display font-semibold text-foreground mb-3">Quick Links</h4>
                <div className="space-y-1.5">
                  {[{ label: "Patient Portal", to: "/patient-portal/login" }, { label: "Staff Login", to: "/auth" }, { label: "Kiosk", to: "/kiosk" }, { label: "Verify", to: "/verify" }].map(l => (
                    <Link key={l.to} to={l.to} className="block text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-display font-semibold text-foreground mb-3">Departments</h4>
                <div className="space-y-1.5">
                  {["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency"].map(d => (
                    <a key={d} href="#specialties" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">{d}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-display font-semibold text-foreground mb-3">Contact</h4>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p>Emergency: <span className="text-medical-danger font-semibold">911</span></p>
                  <p>Reception: +1 (555) 123-4567</p>
                  <p>Email: info@hms-hospital.com</p>
                  <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> Open 24/7</p>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-6 text-center">
              <p className="text-xs text-muted-foreground">
                © 2026 HMS Enterprise. All Rights Reserved. • HIPAA Compliant • ISO 27001
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
