import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Lock,
  ArrowRight,
  ShieldCheck,
  Activity,
  Building2,
  Users,
  Stethoscope,
  Clock3,
  Brain,
  HeartPulse,
  Bone,
  Ambulance,
  Microscope,
  Server,
  Radar,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import heroImage from "@/assets/hospital-command-hero.jpg";

const specialties = [
  { name: "Emergency Medicine", icon: Ambulance, detail: "Triage-to-care workflows with second-level escalation.", link: "/departments/emergency" },
  { name: "Cardiology", icon: HeartPulse, detail: "Continuous telemetry and intervention coordination.", link: "/doctors/specializations" },
  { name: "Neurology", icon: Brain, detail: "High-resolution diagnostics with integrated reports.", link: "/doctors/specializations" },
  { name: "Orthopedics", icon: Bone, detail: "Surgical planning, implants, and recovery tracking.", link: "/doctors/specializations" },
];

const pillars = [
  { title: "Clinical Precision", value: "99.9%", desc: "Decision-support consistency", icon: Microscope },
  { title: "Live Availability", value: "24/7", desc: "Critical systems monitoring", icon: Radar },
  { title: "Enterprise Uptime", value: "99.99%", desc: "Resilient hospital infrastructure", icon: Server },
  { title: "Care Throughput", value: "50K+", desc: "Patients managed annually", icon: Users },
];

export default function PublicLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen onComplete={handleSplashComplete} />}</AnimatePresence>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-glow-sm">
                <Heart className="h-4.5 w-4.5 text-primary-foreground" fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-display font-bold leading-none">HMS Enterprise</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Hospital Intelligence</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-muted-foreground">
              <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
              <a href="#specialties" className="hover:text-foreground transition-colors">Specialties</a>
              <a href="#metrics" className="hover:text-foreground transition-colors">Metrics</a>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="text-xs"><Link to="/patient-portal/login">Patient Portal</Link></Button>
              <Button size="sm" asChild className="text-xs rounded-lg px-4">
                <Link to="/auth"><Lock className="h-3 w-3 mr-1.5" /> Staff Login</Link>
              </Button>
            </div>
          </div>
        </header>

        <section className="relative min-h-[80vh] flex items-stretch" aria-label="Hero">
          <img
            src={heroImage}
            alt="Hospital operations center with connected clinical monitoring systems"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-background/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/40" />
          <div className="ambient-orb top-8 right-8 h-64 w-64" />

          <div className="container mx-auto px-6 relative z-10 py-16 lg:py-24 flex items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/75 px-4 py-1.5 text-xs font-semibold text-primary mb-6"
              >
                <ShieldCheck className="h-3.5 w-3.5" /> Certified clinical operations platform
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.65 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05] text-balance"
              >
                Built for hospitals that demand <span className="gradient-text">precision under pressure</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.65 }}
                className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl"
              >
                Coordinate ER, inpatient, diagnostics, billing, and patient communication in one clinical command system with live visibility across every department.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.65 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button size="lg" className="h-12 px-7 rounded-xl" asChild>
                  <Link to="/auth">Enter Staff Console <ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-7 rounded-xl" asChild>
                  <a href="#platform">Explore Platform</a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.65 }}
                className="mt-10 glass rounded-2xl p-4 max-w-lg scanline"
              >
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl bg-muted/70 p-3 border border-border/60">
                    <p className="text-muted-foreground">ER queue</p>
                    <p className="text-lg font-display font-bold text-foreground">08</p>
                  </div>
                  <div className="rounded-xl bg-muted/70 p-3 border border-border/60">
                    <p className="text-muted-foreground">OR ready</p>
                    <p className="text-lg font-display font-bold text-medical-success">03</p>
                  </div>
                  <div className="rounded-xl bg-muted/70 p-3 border border-border/60">
                    <p className="text-muted-foreground">Lab SLA</p>
                    <p className="text-lg font-display font-bold text-medical-info">11m</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="metrics" className="border-y border-border bg-medical-surface/70">
          <div className="container mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <item.icon className="h-5 w-5 text-primary mb-3" />
                <p className="text-2xl font-display font-bold">{item.value}</p>
                <p className="text-sm font-semibold mt-1">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="platform" className="py-20 lg:py-24 relative">
          <div className="absolute inset-0 medical-grid opacity-40" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Platform DNA</p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold tracking-tight mt-3">Operational clarity for every clinical decision</h2>
            </div>

            <div className="mt-10 grid lg:grid-cols-3 gap-5">
              {[
                { icon: Activity, title: "Real-time command board", desc: "Bed flow, emergency load, and consult velocity in one live surface." },
                { icon: Clock3, title: "Automated care timing", desc: "SLA-aware reminders for triage, diagnostics, pharmacy, and discharge." },
                { icon: Building2, title: "Multi-site consistency", desc: "Standardized workflows across campuses with role-aware visibility." },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass rounded-2xl p-6 card-hover"
                >
                  <div className="h-11 w-11 rounded-xl bg-primary/12 flex items-center justify-center text-primary mb-4">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="specialties" className="py-20 lg:py-24 bg-muted/40">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Clinical departments</p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mt-3">Specialty workflows built in</h2>
              <p className="mt-3 text-muted-foreground">Each service line has purpose-built routing, alerts, and patient timelines.</p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-5">
              {specialties.map((specialty, i) => (
                <motion.button
                  key={specialty.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  onClick={() => navigate(specialty.link)}
                  className="text-left rounded-2xl border border-border bg-card p-6 card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-primary/12 text-primary flex items-center justify-center shrink-0">
                      <specialty.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold">{specialty.name}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{specialty.detail}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-background">
          <div className="container mx-auto px-6 py-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-primary-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">HMS Enterprise — Clinical operations, elevated.</p>
            </div>
            <Button variant="outline" className="rounded-lg" asChild>
              <Link to="/patient-portal/login">Patient Access</Link>
            </Button>
          </div>
        </footer>
      </div>
    </>
  );
}
