import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    className={cn("text-foreground", className)}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Through Hardik's Eye Logo"
  >
    <g transform="translate(5, 5) scale(0.9)">
      {/* T shape */}
      <path d="M20 10 H 80 V 25 H 55 V 90 H 45 V 25 H 20 Z" />
      {/* E shape - fragmented */}
      <path d="M80 30 L 95 30 L 95 40 L 80 40 Z" />
      <path d="M80 55 L 95 55 L 95 65 L 80 65 Z" />
      <path d="M80 80 L 95 80 L 95 90 L 80 90 Z" />
      {/* H shape - abstract */}
      <path d="M5 30 L 20 30 L 20 40 L 5 40 Z" fillOpacity="0.7" />
      <path d="M5 70 L 20 70 L 20 80 L 5 80 Z" fillOpacity="0.7" />
      <path d="M12 40 L 12 70 L 25 70 L 25 40 Z" transform="skewY(-15)" />
    </g>
  </svg>
);
