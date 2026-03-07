interface CatalystLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "minimal";
  showTagline?: boolean;
  className?: string;
}

export function CatalystLogo({
  size = "md",
  variant = "default",
  showTagline = true,
  className = "",
}: CatalystLogoProps) {
  const sizeMap = {
    sm: { main: "text-base", tagline: "text-[10px]", gap: "gap-0.5" },
    md: { main: "text-xl", tagline: "text-xs", gap: "gap-0.5" },
    lg: { main: "text-3xl", tagline: "text-sm", gap: "gap-1" },
    xl: { main: "text-5xl", tagline: "text-lg", gap: "gap-1.5" },
  };

  const variantMap = {
    default: { main: "text-foreground", tagline: "text-muted-foreground" },
    white: { main: "text-white", tagline: "text-white/60" },
    minimal: { main: "text-foreground", tagline: "text-muted-foreground" },
  };

  const s = sizeMap[size];
  const v = variantMap[variant];

  return (
    <div className={`flex flex-col ${s.gap} ${className} min-w-0`}>
      <div
        className={`font-bold tracking-[0.12em] uppercase ${s.main} ${v.main} leading-none whitespace-nowrap`}
      >
        CATALYST
      </div>
      {showTagline && (
        <div
          className={`font-medium tracking-[0.04em] ${s.tagline} ${v.tagline} leading-none whitespace-nowrap`}
        >
          Learning to Earning
        </div>
      )}
    </div>
  );
}
