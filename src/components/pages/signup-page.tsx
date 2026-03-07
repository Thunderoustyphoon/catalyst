import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Alert, AlertDescription } from "../ui/alert";
import { ArrowLeft, GraduationCap, Building, UserPlus, AlertCircle, CheckCircle, Shield } from "lucide-react";
import { CatalystLogo } from "../catalyst-logo";
import { useAuth } from "../../hooks/use-auth";
import type { UserType } from "../../utils/supabase-auth";

export function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", phone: "", organization: "" });
  const [userType, setUserType] = useState<UserType>("student");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const set = (k: string, v: string) => { setForm((p) => ({ ...p, [k]: v })); setErrors([]); setSuccess(""); };

  const handleSignup = async () => {
    setIsLoading(true);
    setErrors([]);
    const errs: string[] = [];
    if (!form.firstName.trim()) errs.push("First name is required");
    if (!form.lastName.trim()) errs.push("Last name is required");
    if (!form.email.trim()) errs.push("Email is required");
    if (form.password.length < 8) errs.push("Password must be at least 8 characters");
    if (form.password !== form.confirmPassword) errs.push("Passwords do not match");
    if (!form.phone.trim()) errs.push("Phone is required");
    if (!agreed) errs.push("You must agree to Terms of Service");
    if (userType === "client" && !form.organization.trim()) errs.push("Organization is required");
    if (errs.length) { setErrors(errs); setIsLoading(false); return; }

    const result = await register({
      email: form.email, password: form.password,
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      userType, phone: form.phone.trim(), organization: form.organization.trim(),
    });
    setIsLoading(false);
    if (result.success) {
      // Clear onboarding flag so tour shows
      localStorage.removeItem("catalyst-onboarding-done");
      setSuccess("Account created!");
      setTimeout(() => navigate(userType === "student" ? "/student/dashboard" : "/client/dashboard"), 800);
    } else {
      setErrors([result.error || "Signup failed"]);
    }
  };

  const typeOptions = [
    { value: "student" as UserType, label: "Student / Freelancer", icon: GraduationCap, desc: "Learn skills, build portfolio, and work on projects" },
    { value: "client" as UserType, label: "Client", icon: Building, desc: "Post projects and hire talent" },
  ];

  const isValid = form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.password && form.confirmPassword && form.phone.trim() && agreed && (userType !== "client" || form.organization.trim());

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Button variant="ghost" onClick={() => navigate("/")} className="absolute top-5 left-5 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
      </Button>

      <Card className="w-full max-w-lg border-border animate-fade-in">
        <CardHeader className="text-center pb-4 pt-8">
          <div className="flex justify-center mb-2"><CatalystLogo size="md" /></div>
          <h2 className="text-lg font-semibold text-foreground">Create Your Account</h2>
          <p className="text-sm text-muted-foreground">Join thousands transforming their careers</p>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pb-8">
          {errors.length > 0 && (
            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm text-destructive">
                <ul className="list-disc list-inside space-y-0.5">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-500/50 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-sm text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-medium">I want to join as a</Label>
            <RadioGroup value={userType} onValueChange={(v) => setUserType(v as UserType)}>
              {typeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div key={opt.value} className="flex items-center gap-2.5">
                    <RadioGroupItem value={opt.value} id={`s-${opt.value}`} />
                    <Label htmlFor={`s-${opt.value}`} className={`flex items-center gap-3 flex-1 p-3 rounded-lg border cursor-pointer transition-colors ${userType === opt.value ? "border-foreground bg-muted/30" : "border-border hover:border-foreground/20"}`}>
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

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-sm">First Name</Label><Input placeholder="First name" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="h-10" /></div>
              <div className="space-y-1.5"><Label className="text-sm">Last Name</Label><Input placeholder="Last name" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="h-10" /></div>
            </div>
            <div className="space-y-1.5"><Label className="text-sm">Email</Label><Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} className="h-10" /></div>
            <div className="space-y-1.5"><Label className="text-sm">Phone</Label><Input type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="h-10" /></div>
            {userType === "client" && <div className="space-y-1.5"><Label className="text-sm">Organization</Label><Input placeholder="Company name" value={form.organization} onChange={(e) => set("organization", e.target.value)} className="h-10" /></div>}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-sm">Password</Label><Input type="password" placeholder="Create password" value={form.password} onChange={(e) => set("password", e.target.value)} className="h-10" /></div>
              <div className="space-y-1.5"><Label className="text-sm">Confirm</Label><Input type="password" placeholder="Confirm" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} className="h-10" /></div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <span className="font-medium">Password:</span> Min 8 chars, uppercase, lowercase, and a number.
          </div>

          <div className="flex items-start gap-2.5">
            <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-foreground" />
            <Label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
              I agree to the <span className="text-foreground font-medium">Terms of Service</span> and <span className="text-foreground font-medium">Privacy Policy</span>
            </Label>
          </div>

          <div className="space-y-2.5 pt-1">
            <Button onClick={handleSignup} className="w-full bg-foreground text-background hover:bg-foreground/90 h-10" disabled={!isValid || isLoading}>
              {isLoading ? <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
            <Button variant="outline" className="w-full h-10 border-border" disabled={isLoading}>
              <Shield className="w-4 h-4 mr-2" /> Sign up with Aadhaar
            </Button>
          </div>

          <div className="text-center pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">Already have an account?{" "}<button onClick={() => navigate("/login")} className="text-foreground font-medium hover:underline">Sign in</button></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
