import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Building2, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin,
  Heart,
  Stethoscope,
  FlaskConical,
  Ambulance,
  Lock,
  Globe,
  Award,
  Users
} from "lucide-react";

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      {/* Modern Glass Navbar */}
      <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tighter text-white block leading-none">MEDICARE</span>
              <span className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase">Enterprise HMS</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-xs font-bold tracking-widest text-slate-400 uppercase">
            <a href="#medical-tech" className="hover:text-white transition-colors">Technology</a>
            <a href="#specialties" className="hover:text-white transition-colors">Specialties</a>
            <a href="#about" className="hover:text-white transition-colors">Global Network</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
            <Button variant="ghost" asChild className="text-xs font-bold tracking-widest uppercase hover:bg-white/5 text-slate-300">
              <Link to="/auth">
                <Lock className="mr-2 h-3 w-3" /> Staff Access
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section: High-Tech Arrival */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48">
        <div className="container mx-auto px-6 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10 max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase animate-in fade-in slide-in-from-left-10 duration-700">
                <Globe className="h-4 w-4 animate-spin-slow" /> 
                World-Class Medical Excellence
              </div>
              
              <h1 className="text-5xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
                Precision Medicine <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Driven by Data.
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                Welcome to the next generation of healthcare. MediCare Enterprise provides a seamless, high-security ecosystem for elite medical institutions and their patients.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
                <Button size="lg" className="h-16 px-10 text-sm font-black tracking-widest uppercase rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all hover:scale-105" asChild>
                  <a href="#medical-tech">
                    Explore Ecosystem <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <div className="flex items-center gap-4 px-6 border-l border-white/10 ml-2 hidden md:flex">
                  <div className="text-left">
                    <div className="text-2xl font-black text-white">24/7</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Emergency Core</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative animate-in fade-in zoom-in duration-1000">
              <div className="relative z-10 rounded-[40px] border border-white/10 bg-slate-900/50 p-4 backdrop-blur-2xl shadow-2xl">
                <div className="absolute -top-10 -right-10 h-32 w-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-indigo-500/20 rounded-full blur-3xl" />
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
                  alt="Future Hospital" 
                  className="rounded-[32px] w-full aspect-[4/3] object-cover border border-white/5 grayscale-[0.2] contrast-125"
                />
                
                {/* HUD Elements */}
                <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 space-y-2 hidden xl:block">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase">Neural Link Active</span>
                  </div>
                  <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[70%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section id="medical-tech" className="py-32 bg-slate-950/50 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-10 bg-white/5 border-white/5 rounded-[32px] hover:bg-white/10 transition-all duration-500 group">
              <div className="h-16 w-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">Biometric Integration</h3>
              <p className="text-slate-400 leading-relaxed">Real-time monitoring of patient vitals across all specialized departments with zero latency.</p>
            </Card>
            
            <Card className="p-10 bg-white/5 border-white/5 rounded-[32px] hover:bg-white/10 transition-all duration-500 group">
              <div className="h-16 w-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform">
                <FlaskConical className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">Molecular Laboratory</h3>
              <p className="text-slate-400 leading-relaxed">High-precision diagnostic tools powered by advanced AI for rapid and accurate test results.</p>
            </Card>

            <Card className="p-10 bg-white/5 border-white/5 rounded-[32px] hover:bg-white/10 transition-all duration-500 group">
              <div className="h-16 w-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">Encrypted Core</h3>
              <p className="text-slate-400 leading-relaxed">Enterprise-grade security protocols ensuring absolute confidentiality of all medical records.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">The Trusted Standard in Global Healthcare</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-10">
              <div className="space-y-2">
                <div className="text-5xl font-black text-blue-500">150+</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Facilities</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-indigo-500">4.2k</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Specialists</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-blue-500">99.9%</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Uptime</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-indigo-500">12M+</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Patients Yearly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer id="contact" className="bg-slate-950 pt-32 pb-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-20 mb-20">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter text-white uppercase">Medicare</span>
              </div>
              <p className="text-slate-500 max-w-md leading-relaxed font-medium">
                Established in 1998, MediCare Enterprise has grown into a world-leader in healthcare innovation and management systems.
              </p>
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5 text-slate-400" />
                </div>
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                  <Award className="h-5 w-5 text-slate-400" />
                </div>
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                  <Users className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Headquarters</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                  123 Healthcare Avenue <br />Medical District, IL 60601
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                  +1 (800) MEDICARE
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                  global@medicare-enterprise.com
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Global Support</h4>
              <div className="p-6 rounded-[24px] bg-white/5 border border-white/5 space-y-4">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Institutional Hotline</p>
                <p className="text-2xl font-black text-white tracking-tighter leading-none">1-800-CORE-HMS</p>
                <p className="text-[10px] text-slate-500 font-bold">Standard rates apply. Available 24/7/365.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              © 2026 MEDICARE ENTERPRISE HMS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <a href="#" className="hover:text-blue-500">Security Policy</a>
              <a href="#" className="hover:text-blue-500">Terms of Operation</a>
              <a href="#" className="hover:text-blue-500">Privacy Core</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
