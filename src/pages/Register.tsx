import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { RegisterData, User } from "@/types/auth";

const Register = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegisterData & { password_confirmation: string; terms: boolean }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    userType: "farmer",
    region: "",
    district: "",
    ward: "",
    terms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.password_confirmation) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.terms) {
      toast({
        title: "Terms required",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('📝 Mock registration attempt for:', formData.email);
      
      // Mock registration - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists (mock validation)
      const existingEmails = ['john@example.com', 'jane@example.com', 'admin@example.com'];
      if (existingEmails.includes(formData.email)) {
        throw new Error('Email already exists. Please use a different email address.');
      }
      
      // Create mock user
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000) + 100,
        first_name: formData.firstName,
        last_name: formData.lastName,
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        user_type: formData.userType,
        status: 'active',
        region: formData.region,
        district: formData.district,
        ward: formData.ward,
        created_at: new Date().toISOString()
      };
      
      const mockToken = `mock_token_${Date.now()}`;
      login(mockUser, mockToken);
      
      toast({
        title: "Registration successful",
        description: `Welcome to ADINAS, ${mockUser.first_name}!`,
      });

      console.log('✅ Mock registration successful, redirecting...');
      navigate('/dashboard');
    } catch (error: unknown) {
      console.error('❌ Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center text-primary-foreground space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto">
            <Leaf className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold">
            Join Tanzania's Agricultural Network
          </h2>
          <p className="text-lg opacity-80">
            Connect with farmers, extension officers, dealers, and companies. 
            Access tools and resources to grow your agricultural business.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ADINAS</span>
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{t.createAccount}</h1>
            <p className="text-muted-foreground">
              Join ADINAS and start growing your agricultural business
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-foreground"
                >
                  {t.firstName}
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-foreground"
                >
                  {t.lastName}
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                {t.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+255 xxx xxx xxx"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="userType"
                className="text-sm font-medium text-foreground"
              >
                I am a
              </label>
              <Select value={formData.userType} onValueChange={(value) => handleSelectChange('userType', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="extension_officer">Extension Officer</SelectItem>
                  <SelectItem value="agri_dealer">Agri Dealer</SelectItem>
                  <SelectItem value="agri_company">Agri Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                {t.password}
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password_confirmation"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox 
                id="terms" 
                name="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => handleSelectChange('terms', checked as boolean)}
                required 
                className="mt-0.5" 
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? `${t.loading}` : t.createAccount}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-muted-foreground">
            {t.alreadyHaveAccount}{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              {t.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
