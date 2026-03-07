import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, GraduationCap, Building, UserCheck, AlertCircle, Eye, EyeOff, Shield } from "lucide-react";
import { authenticateUser, setCurrentUser, type UserType } from "../utils/auth";
import { CatalystLogo } from "./catalyst-logo";

interface LoginScreenProps {
  onLogin: (userType: UserType) => void;
  onBack?: () => void;
  onNavigateToSignup?: () => void;
}

export function LoginScreen({ onLogin, onBack, onNavigateToSignup }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => { if (error) setError(""); };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = authenticateUser(email, password);
      if (!result.success || !result.user) {
        setError(result.error || "Login failed");
        setIsLoading(false);
        return;
      }
      if (result.user.type !== userType) {
        setError(`This account is registered as a ${result.user.type}. Please select the correct type.`);
        setIsLoading(false);
        return;
      }
      setCurrentUser(result.user);
      setTimeout(() => {
        setIsLoading(false);
        onLogin(result.user!.type);
      }, 600);
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const typeOptions = [
    { value: "student" as UserType, label: "Student / Freelancer", icon: GraduationCap, desc: "Learn skills, build portfolio, and work on projects" },
    { value: "client" as UserType, label: "Client", icon: Building, desc: "Post projects and hire talent" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="absolute top-5 left-5 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back
        </Button>
      )}

      <Card className="w-full max-w-md border-border animate-fade-in">
        <CardHeader className="text-center pb-6 pt-8">
          <div className="flex justify-center mb-2">
            <CatalystLogo size="md" />
          </div>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pb-8">
          {error && (
            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          {/* Account Type */}
          <div className="space-y-2.5">
            <Label className="text-sm font-medium">I am a</Label>
            <RadioGroup value={userType} onValueChange={(v) => setUserType(v as UserType)}>
              {typeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div key={opt.value} className="flex items-center gap-2.5">
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <Label
                      htmlFor={opt.value}
                      className={`flex items-center gap-3 flex-1 p-3 rounded-lg border cursor-pointer transition-colors ${
                        userType === opt.value ? "border-foreground bg-muted/30" : "border-border hover:border-foreground/20"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-foreground">{opt.label}</div>
                        <div className="text-xs text-muted-foreground">{opt.desc}</div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                className="h-10"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  className="h-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5 pt-1">
            <Button
              onClick={handleLogin}
              className="w-full bg-foreground text-background hover:bg-foreground/90 h-10"
              disabled={!email.trim() || !password || isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <UserCheck className="w-4 h-4 mr-2" />
              )}
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <Button
              variant="outline"
              className="w-full h-10 border-border"
              disabled={isLoading}
            >
              <Shield className="w-4 h-4 mr-2" />
              Login with Aadhaar
            </Button>
          </div>

          <div className="text-center pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={onNavigateToSignup}
                className="text-foreground font-medium hover:underline"
              >
                Create account
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
