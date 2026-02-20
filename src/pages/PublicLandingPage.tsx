import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Activity, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Heart,
  Stethoscope,
  FlaskConical,
  Ambulance
} from "lucide-react";

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">MediCare</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#about" className="hover:text-primary transition-colors">About Us</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/auth">Staff Portal</Link>
            </Button>
            <Button asChild>
              <Link to="/patient-portal/login">Patient Portal</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <ShieldCheck className="h-4 w-4" />
                Trusted by 50,000+ Patients
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
                Modern Healthcare <br />
                <span className="text-primary">Centred Around You</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Experience world-class medical facilities with compassionate care. Our digital-first approach ensures you get the best treatment, faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl" asChild>
                  <Link to="/patient-register">
                    Register Now <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl" asChild>
                  <Link to="/kiosk">Check-in at Hospital</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
                alt="Hospital Building" 
                className="rounded-3xl shadow-2xl border aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/50 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">450+</div>
              <div className="text-sm text-muted-foreground">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">120k+</div>
              <div className="text-sm text-muted-foreground">Successful Surgeries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Comprehensive Medical Services</h2>
            <p className="text-muted-foreground text-lg">We provide a wide range of medical specialties to cater to your every health need.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "General Consultation", icon: Stethoscope, desc: "Primary health care for all ages." },
              { title: "Cardiac Care", icon: Heart, desc: "Specialized treatment for heart health." },
              { title: "Advanced Diagnostics", icon: FlaskConical, desc: "Modern laboratory and imaging." },
              { title: "24/7 Emergency", icon: Ambulance, desc: "Immediate care for critical cases." }
            ].map((service) => (
              <Card key={service.title} className="p-6 hover:shadow-lg transition-shadow border-none bg-muted/50">
                <div className="h-12 w-12 bg-background rounded-lg flex items-center justify-center text-primary mb-4 shadow-sm">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-muted pt-20 pb-10 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4 col-span-1 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-primary">MediCare</span>
              </div>
              <p className="text-sm text-muted-foreground">Providing the best healthcare experience since 1998.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/patient-portal/login" className="hover:text-primary">Find a Doctor</Link></li>
                <li><Link to="/patient-portal/login" className="hover:text-primary">Book Appointment</Link></li>
                <li><Link to="/verify" className="hover:text-primary">Verify Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Healthcare Ave, IL</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 234-567-8900</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@medicare.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Emergency</h4>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-xs text-primary font-bold uppercase mb-1">24/7 Hotline</p>
                <p className="text-xl font-black text-primary">1-800-HEAL</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-10 text-center text-sm text-muted-foreground">
            <p>© 2026 MediCare General Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
