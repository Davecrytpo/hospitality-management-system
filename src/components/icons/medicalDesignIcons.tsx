import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

export const GlucoseMeterIcon: LucideIcon = forwardRef<SVGSVGElement, Omit<LucideProps, "ref">>(
  ({ color = "currentColor", strokeWidth = 2, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="5" y="3" width="14" height="18" rx="3" />
      <rect x="8" y="6.5" width="8" height="5.5" rx="1.2" />
      <path d="M10.2 15.8h3.6" />
      <circle cx="12" cy="18" r="1.1" />
      <path d="m16 12.6 2.4-2.4" />
    </svg>
  ),
);

GlucoseMeterIcon.displayName = "GlucoseMeterIcon";

export const LungsIcon: LucideIcon = forwardRef<SVGSVGElement, Omit<LucideProps, "ref">>(
  ({ color = "currentColor", strokeWidth = 2, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3v7" />
      <path d="M12 10c-1.3-2.7-2.8-4.2-4.6-4.2-2 0-3.4 1.5-3.4 3.6 0 4.7 2.1 8.6 5.8 10.8" />
      <path d="M12 10c1.3-2.7 2.8-4.2 4.6-4.2 2 0 3.4 1.5 3.4 3.6 0 4.7-2.1 8.6-5.8 10.8" />
      <path d="M12 14v6" />
    </svg>
  ),
);

LungsIcon.displayName = "LungsIcon";

export const MaleSymbolIcon: LucideIcon = forwardRef<SVGSVGElement, Omit<LucideProps, "ref">>(
  ({ color = "currentColor", strokeWidth = 2, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="10" cy="14" r="4.5" />
      <path d="m13.1 10.9 6.4-6.4" />
      <path d="M15.8 4.5H19.5V8.2" />
    </svg>
  ),
);

MaleSymbolIcon.displayName = "MaleSymbolIcon";

export const UterusIcon: LucideIcon = forwardRef<SVGSVGElement, Omit<LucideProps, "ref">>(
  ({ color = "currentColor", strokeWidth = 2, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 6.5c-1.7 0-3 1.4-3 3.1 0 2.1 1.4 3.5 3.4 4.3" />
      <path d="M16 6.5c1.7 0 3 1.4 3 3.1 0 2.1-1.4 3.5-3.4 4.3" />
      <path d="M8.4 13.9c1.4 0 2.3-.4 3.6-2l0-1.9" />
      <path d="M15.6 13.9c-1.4 0-2.3-.4-3.6-2" />
      <path d="M12 10v8" />
      <path d="M10 20h4" />
    </svg>
  ),
);

UterusIcon.displayName = "UterusIcon";
