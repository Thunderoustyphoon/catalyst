import { useState, useEffect } from "react";

interface CatalystIntroAnimationProps {
  onComplete: () => void;
}

export function CatalystIntroAnimation({ onComplete }: CatalystIntroAnimationProps) {
  const [stage, setStage] = useState<"initial" | "logo" | "tagline" | "fadeOut">("initial");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage("logo"), 200),
      setTimeout(() => setStage("tagline"), 1000),
      setTimeout(() => setStage("fadeOut"), 1800),
      setTimeout(() => onComplete(), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Content */}
      <div className="text-center">
        {/* Logo text */}
        <h1
          className="text-white tracking-[0.2em] transition-all duration-700 ease-out"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 600,
            opacity: stage === "initial" ? 0 : stage === "fadeOut" ? 0 : 1,
            transform: stage === "initial" ? "translateY(12px)" : "translateY(0)",
          }}
        >
          CATALYST
        </h1>

        {/* Underline */}
        <div
          className="h-[1px] bg-white/60 mx-auto mt-4 transition-all duration-500 ease-out"
          style={{
            width: stage === "tagline" ? "100%" : "0%",
            opacity: stage === "fadeOut" ? 0 : 1,
            maxWidth: "200px",
          }}
        />

        {/* Tagline */}
        <p
          className="text-white/70 tracking-[0.1em] mt-4 text-sm transition-all duration-500 ease-out"
          style={{
            opacity: stage === "tagline" ? 1 : 0,
            transform: stage === "tagline" ? "translateY(0)" : "translateY(8px)",
          }}
        >
          Learning to Earning
        </p>
      </div>

      {/* Fade out overlay */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-600"
        style={{ opacity: stage === "fadeOut" ? 1 : 0 }}
      />
    </div>
  );
}
