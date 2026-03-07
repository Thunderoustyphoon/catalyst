import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Download,
  Upload,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Settings as SettingsIcon,
  Globe,
  Lock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
  HelpCircle,
  Sun,
  Moon,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useTheme } from "../hooks/use-theme";

interface SettingsProps {
  userType: 'student' | 'client' | 'admin';
  userName: string;
  userEmail: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
  onBack?: () => void;
  onRetakeDiagnostic?: () => void;
}

export function Settings({ userType, userName, userEmail, onNavigate, onLogout, onBack, onRetakeDiagnostic }: SettingsProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Form states
  const [profile, setProfile] = useState({
    firstName: userName.split(' ')[0] || '',
    lastName: userName.split(' ')[1] || '',
    email: userEmail,
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate learner focused on transitioning from education to employment through practical skills development.',
    website: '',
    linkedin: '',
    github: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
    projectUpdates: true,
    projectAlerts: true,
    language: 'en',
    timezone: 'UTC-5'
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessaging: true,
    showOnlineStatus: true,
    dataCollection: true
  });

  const handleSave = async (section: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(`${section} settings saved successfully!`);
    setIsLoading(false);
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode!`);
  };

  const getThemeIcon = (themeValue: "light" | "dark") => {
    switch (themeValue) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  const handleExportData = () => {
    toast.success("Data export initiated. You'll receive an email when ready.");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion requires additional verification. Contact support for assistance.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <div>
            <h1 className="flex items-center gap-3">
              <SettingsIcon className="w-8 h-8" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account preferences and platform settings
            </p>
          </div>
        </div>
        <Badge variant="outline" className="capitalize">
          {userType}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className={`grid w-full ${userType === 'student' ? 'grid-cols-4 lg:grid-cols-7' : 'grid-cols-4 lg:grid-cols-6'}`}>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          {userType === 'student' && (
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="modern-card-subtle">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="modern-button">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, GIF or PNG. Max size of 5MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="City, State/Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  placeholder="Tell others about yourself..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave('Profile')}
                  disabled={isLoading}
                  className="modern-button-primary"
                >
                  {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Tab - Only for students */}
        {userType === 'student' && (
          <TabsContent value="learning" className="space-y-6">
            <Card className="modern-card-subtle">
              <CardHeader>
                <CardTitle>Career Assessment</CardTitle>
                <CardDescription>
                  Retake your diagnostic test to get updated learning recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">Adaptive Tech Career Assessment</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Take our intelligent diagnostic test that adapts questions based on your answers to create the most accurate learning roadmap.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>• Adaptive questions (8-12 total)</span>
                        <span>• ~5-7 minutes to complete</span>
                        <span>• Personalized based on your answers</span>
                        <span>• Advanced career recommendations</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-primary" />
                      What makes this assessment adaptive?
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Questions change based on your experience level</li>
                      <li>• Technology choices influence career path options</li>
                      <li>• Learning style adapts project and skill recommendations</li>
                      <li>• Industry preferences shape relevant skill focuses</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="text-sm text-muted-foreground">
                      Retaking the assessment will update your learning path and course recommendations with improved accuracy.
                    </div>
                    <Button
                      onClick={() => {
                        if (onRetakeDiagnostic) {
                          onRetakeDiagnostic();
                        } else if (onNavigate) {
                          onNavigate('diagnostic-test');
                        }
                      }}
                      className="modern-button-primary"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retake Assessment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="modern-card-subtle">
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>
                  Customize how you learn and get recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Preferred Learning Style</Label>
                    <Select defaultValue="hands-on">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hands-on">Hands-on Projects</SelectItem>
                        <SelectItem value="structured">Structured Courses</SelectItem>
                        <SelectItem value="video-tutorials">Video Tutorials</SelectItem>
                        <SelectItem value="documentation">Documentation & Reading</SelectItem>
                        <SelectItem value="peer-learning">Peer Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Weekly Learning Time</Label>
                    <Select defaultValue="5-10-hours">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5-hours">1-5 hours</SelectItem>
                        <SelectItem value="5-10-hours">5-10 hours</SelectItem>
                        <SelectItem value="10-20-hours">10-20 hours</SelectItem>
                        <SelectItem value="20-plus-hours">20+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="skill-reminders" />
                    <Label htmlFor="skill-reminders">Send skill building reminders</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="project-suggestions" defaultChecked />
                    <Label htmlFor="project-suggestions">Show project suggestions</Label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSave('Learning Preferences')}
                    disabled={isLoading}
                    className="modern-button-primary"
                  >
                    {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="modern-card-subtle">
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Choose your preferred theme and appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <div className="flex gap-3">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => handleThemeChange("light")}
                    className="flex items-center gap-2"
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => handleThemeChange("dark")}
                    className="flex items-center gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave('Appearance')}
                  disabled={isLoading}
                  className="modern-button-primary"
                >
                  {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card className="modern-card-subtle">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export your data or delete your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Export Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Download a copy of all your data including profile, settings, and activity
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="space-y-0.5">
                    <Label className="text-destructive">Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent aria-describedby="delete-account-description">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription id="delete-account-description">
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="modern-card-subtle">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, emailNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, pushNotifications: checked})
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave('Notification')}
                  disabled={isLoading}
                  className="modern-button-primary"
                >
                  {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="modern-card-subtle">
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>
                Control your privacy settings and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <Select
                  value={privacy.profileVisibility}
                  onValueChange={(value) => 
                    setPrivacy({...privacy, profileVisibility: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                    <SelectItem value="registered">Registered Users - Only logged-in users</SelectItem>
                    <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave('Privacy')}
                  disabled={isLoading}
                  className="modern-button-primary"
                >
                  {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="modern-card-subtle">
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>
                Manage your billing information and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="mb-2">No billing information</h3>
                <p className="text-muted-foreground mb-4">
                  You're currently on a free plan. Upgrade to unlock premium features.
                </p>
                <Button>
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}