import type { ComponentType, SVGProps } from "react";
import {
  Activity,
  Ambulance,
  ArrowRight,
  Baby,
  Bone,
  BookOpenText,
  Brain,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Globe,
  HandHeart,
  Heart,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  Microscope,
  Phone,
  Pill,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  UserRound,
  Users,
} from "lucide-react";

import type { CmsIconName } from "./types";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const cmsIcons: Record<CmsIconName, IconComponent> = {
  activity: Activity,
  ambulance: Ambulance,
  "arrow-right": ArrowRight,
  baby: Baby,
  bone: Bone,
  "book-open": BookOpenText,
  brain: Brain,
  building: Building2,
  calendar: CalendarDays,
  camera: Camera,
  "check-circle": CheckCircle2,
  clock: Clock3,
  eye: Eye,
  "file-text": FileText,
  globe: Globe,
  "hand-heart": HandHeart,
  heart: Heart,
  lock: Lock,
  mail: Mail,
  "map-pin": MapPin,
  megaphone: Megaphone,
  "message-square": MessageSquare,
  microscope: Microscope,
  phone: Phone,
  pill: Pill,
  shield: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  stethoscope: Stethoscope,
  target: Target,
  "user-round": UserRound,
  users: Users,
};

export const cmsIconOptions = Object.keys(cmsIcons) as CmsIconName[];

export function getCmsIcon(name?: CmsIconName) {
  return cmsIcons[name ?? "sparkles"] ?? Sparkles;
}
