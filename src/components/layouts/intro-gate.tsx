import { useState, ReactNode } from "react";
import { CatalystIntroAnimation } from "../catalyst-intro-animation";
import { useAuth } from "../../hooks/use-auth";
import { CatalystLogo } from "../catalyst-logo";

export function IntroGate({ children }: { children: ReactNode }) {
  const { loading } = useAuth();
  const [showIntro, setShowIntro] = useState(true);

  // Show intro animation first
  if (showIntro) {
    return <CatalystIntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  // Then show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CatalystLogo size="md" className="mx-auto mb-6" />
          <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
