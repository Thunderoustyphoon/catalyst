import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Alert, AlertDescription } from "./ui/alert";
import { Shield, ArrowLeft, GraduationCap, Building, UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import { createUser, validateEmail, validatePassword, setCurrentUser, type UserType } from "../utils/auth";
import { CatalystLogo } from "./catalyst-logo";

interface SignupScreenProps {
  onLogin: (userType: UserType) => void;
  onBack?: () => void;
  onNavigateToLogin?: () => void;
}

export function SignupScreen({ onLogin, onBack, onNavigateToLogin }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "",
    confirmPassword: "", phone: "", organization: "",
  });
  const [userType, setUserType] = useState<UserType>("student");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors.length) setErrors([]);
    if (success) setSuccess("");
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!formData.firstName.trim()) errs.push("First name is required");
    if (!formData.lastName.trim()) errs.push("Last name is required");
    if (!formData.phone.trim()) errs.push("Phone number is required");
    const ev = validateEmail(formData.email);
    if (!ev.isValid) errs.push(...ev.errors);
    const pv = validatePassword(formData.password);
    if (!pv.isValid) errs.push(...pv.errors);
    if (formData.password !== formData.confirmPassword) errs.push("Passwords do not match");
    if (!agreedToTerms) errs.push("You must agree to the Terms of Service");
    if (userType === "client" && !formData.organization.trim()) errs.push("Organization name is required");
    return errs;
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setErrors([]);
    setSuccess("");
    try {
      const v = validate();
      if (v.length) { setErrors(v); setIsLoading(false); return; }
      const result = createUser(
        formData.email, formData.password, userType,
        `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        { phone: formData.phone.trim(), ...(userType === "client" && { organization: formData.organization.trim() }) }
      );
      if (!result.success) { setErrors([result.error || "Failed to create account"]); setIsLoading(false); return; }
      setCurrentUser(result.user!);
      setSuccess("Account created! Signing you in...");
      setTimeout(() => { setIsLoading(false); onLogin(userType); }, 1000);
    } catch {
      setErrors(["An unexpected error occurred."]); setIsLoading(false);
    }
  };

  const typeOptions = [
    { value: "student" as UserType, label: "Student / Freelancer", icon: GraduationCap, desc: "Learn skills, build portfolio, and work on projects" },
    { value: "client" as UserType, label: "Client", icon: Building, desc: "Post projects and hire talent" },
  ];

  const isValid = formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() &&
    formData.password && formData.confirmPassword && formData.phone.trim() && agreedToTerms &&
    (userType !== "client" || formData.organization.trim());

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="absolute top-5 left-5 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back
        </Button>
      )}

      <Card className="w-full max-w-lg border-border animate-fade-in">
        <CardHeader className="text-center pb-4 pt-8">
          <div className="flex justify-center mb-2">
            <CatalystLogo size="md" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Create Your Account</h2>
          <p className="text-sm text-muted-foreground">Join thousands transforming their careers</p>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-8">
          {errors.length > 0 && (
            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm text-destructive">
                <ul className="list-disc list-inside space-y-0.5">
                  {errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-500/50 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-sm text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          {/* Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">I want to join as a</Label>
            <RadioGroup value={userType} onValueChange={(v) => setUserType(v as UserType)}>
              {typeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div key={opt.value} className="flex items-center gap-2.5">
                    <RadioGroupItem value={opt.value} id={`s-${opt.value}`} />
                    <Label
                      htmlFor={`s-${opt.value}`}
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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">First Name</Label>
                <Input placeholder="First name" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Last Name</Label>
                <Input placeholder="Last name" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="h-10" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Email</Label>
              <Input type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Phone</Label>
              <Input type="tel" placeholder="Phone number" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="h-10" />
            </div>
            {userType === "client" && (
              <div className="space-y-1.5">
                <Label className="text-sm">Organization</Label>
                <Input placeholder="Organization name" value={formData.organization} onChange={(e) => handleChange("organization", e.target.value)} className="h-10" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Password</Label>
                <Input type="password" placeholder="Create password" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Confirm</Label>
                <Input type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} className="h-10" />
              </div>
            </div>
          </div>

          {/* Password hint */}
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <span className="font-medium">Password:</span> Min 8 chars, uppercase, lowercase, and a number.
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 appearance-none bg-background border border-border rounded checked:bg-foreground checked:border-foreground focus:ring-2 focus:ring-ring relative checked:after:content-['✓'] checked:after:text-background checked:after:text-xs checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center"
            />
            <Label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
              I agree to the <span className="text-foreground font-medium">Terms of Service</span> and <span className="text-foreground font-medium">Privacy Policy</span>
            </Label>
          </div>

          {/* Actions */}
          <div className="space-y-2.5 pt-1">
            <Button
              onClick={handleSignup}
              className="w-full bg-foreground text-background hover:bg-foreground/90 h-10"
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <UserPlus className="w-4 h-4 mr-2" />
              )}
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
            <Button variant="outline" className="w-full h-10 border-border" disabled={isLoading}>
              <Shield className="w-4 h-4 mr-2" />
              Sign up with Aadhaar
            </Button>
          </div>

          <div className="text-center pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={onNavigateToLogin} className="text-foreground font-medium hover:underline">
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
