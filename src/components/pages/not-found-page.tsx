import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { CatalystLogo } from "../catalyst-logo";
import { ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <CatalystLogo size="md" className="mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Page not found</p>
        <Button onClick={() => navigate("/")} className="bg-foreground text-background hover:bg-foreground/90">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
