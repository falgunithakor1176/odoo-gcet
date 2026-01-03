import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/hrms';
import { Eye, EyeOff, Copy, Check, Upload, ShieldAlert } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoName, setLogoName] = useState<string>("");

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state - Defaulting to 'admin'
  const [signupData, setSignupData] = useState({
    companyName: '',
    email: '',
    name: '',
    role: 'admin' as UserRole, 
  });

  const [generatedCreds, setGeneratedCreds] = useState<{loginId: string, tempPassword: string} | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!loginIdentifier || !loginPassword) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    const success = await login(loginIdentifier, loginPassword);
    
    if (success) {
      toast({ title: "Success", description: "Logged in successfully" });
      navigate('/dashboard');
    } else {
      toast({ 
        title: "Login failed", 
        description: "Invalid credentials. If you are an employee, check with HR.", 
        variant: "destructive" 
      });
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!signupData.companyName || !signupData.email || !signupData.name) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // 
    const result = await signup(signupData);
    
    if (result.success && result.credentials) {
      setGeneratedCreds(result.credentials);
      toast({ title: "Account Created!", description: "Save these credentials securely." });
    } else {
      toast({ 
        title: "Signup failed", 
        description: result.error || "An error occurred.", 
        variant: "destructive" 
      });
    }
    setIsLoading(false);
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoName(e.target.files[0].name);
      toast({ description: "Logo selected: " + e.target.files[0].name });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: "Copied to clipboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-lg mb-2">
            <span className="text-primary-foreground font-bold text-2xl">D</span>
          </div>
          <span className="text-3xl font-bold text-foreground tracking-tight">Dayflow</span>
          <p className="text-muted-foreground text-sm">
            Human Resource Management System
          </p>
        </div>

        <Card className="bg-card border-border shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">
                {activeTab === 'signin' ? 'Welcome Back' : 'Setup Company'}
            </CardTitle>
            <CardDescription>
                {activeTab === 'signin' 
                   ? 'Enter your ID/Email & Password' 
                   : 'Register as Admin/HR to start'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full" onValueChange={(val) => {
                setGeneratedCreds(null);
                setActiveTab(val);
            }}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Company Setup</TabsTrigger>
              </TabsList>

              {/* LOGIN TAB */}
              <TabsContent value="signin">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-id">Login ID or Email</Label>
                    <Input
                      id="login-id"
                      placeholder="e.g. OIJODO20250001"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <Button
                        type="button" variant="ghost" size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* SIGNUP TAB (RESTRICTED) */}
              <TabsContent value="signup">
                {!generatedCreds ? (
                  <form onSubmit={handleSignup} className="space-y-4">
                    {/* Notice for Employees */}
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-3 flex gap-3 items-start">
                        <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                            <strong>Restriction:</strong> Standard employees cannot register here. 
                            Employees must receive their Login ID & Password from HR.
                        </p>
                    </div>

                    {/* Company Name & Logo */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-company">Company Name</Label>
                      <div className="flex gap-2">
                        <Input
                          id="signup-company"
                          placeholder="e.g., Odoo India"
                          value={signupData.companyName}
                          onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                          className="flex-1"
                        />
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <Button 
                            type="button" 
                            size="icon" 
                            className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                            onClick={handleLogoClick}
                            title="Upload Company Logo"
                        >
                            <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      {logoName && <p className="text-xs text-green-500">Logo selected: {logoName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Admin/HR Full Name</Label>
                      <Input
                        id="signup-name"
                        placeholder="e.g., John Doe"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Work Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="admin@company.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </div>

                    {/* RESTRICTED ROLE SELECTION */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-role">Register As</Label>
                      <Select
                        value={signupData.role}
                        onValueChange={(value) => setSignupData({ ...signupData, role: value as UserRole })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* NOTE: Employee option removed */}
                          <SelectItem value="admin">HR Administrator</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-2" disabled={isLoading}>
                      {isLoading ? "Creating System..." : "Register Company & Get ID"}
                    </Button>
                  </form>
                ) : (
                  // SUCCESS STATE
                  <div className="space-y-6 py-4 animate-in fade-in zoom-in duration-300">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Check className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg">System Created!</h3>
                      <p className="text-sm text-muted-foreground">
                        Use these credentials to log in and add employees.
                      </p>
                    </div>

                    <div className="space-y-4 bg-muted/30 p-4 rounded-lg border">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Your Admin ID</Label>
                        <div className="flex gap-2">
                          <Input readOnly value={generatedCreds.loginId} className="font-mono bg-background" />
                          <Button size="icon" variant="outline" onClick={() => copyToClipboard(generatedCreds.loginId)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Your Password</Label>
                        <div className="flex gap-2">
                          <Input readOnly value={generatedCreds.tempPassword} className="font-mono bg-background" />
                          <Button size="icon" variant="outline" onClick={() => copyToClipboard(generatedCreds.tempPassword)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="default" className="w-full" onClick={() => setActiveTab("signin")}>
                      Go to Login
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}