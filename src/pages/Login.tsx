import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('🔐 Mock login attempt for:', formData.email);
      
      // Mock authentication - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      const mockUsers = {
        'john@example.com': {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          full_name: 'John Doe',
          email: 'john@example.com',
          user_type: 'farmer' as const,
          status: 'active' as const,
          region: 'Dar es Salaam',
          district: 'Kinondoni',
          ward: 'Msasani',
          phone: '+255123456789',
          created_at: '2024-01-01T00:00:00Z'
        },
        'jane@example.com': {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          full_name: 'Jane Smith',
          email: 'jane@example.com',
          user_type: 'extension_officer' as const,
          status: 'active' as const,
          region: 'Arusha',
          district: 'Arusha Urban',
          ward: 'Kaloleni',
          phone: '+255987654321',
          created_at: '2024-01-01T00:00:00Z'
        },
        'admin@example.com': {
          id: 3,
          first_name: 'Admin',
          last_name: 'User',
          full_name: 'Admin User',
          email: 'admin@example.com',
          user_type: 'extension_officer' as const,
          status: 'active' as const,
          region: 'Dodoma',
          district: 'Dodoma Urban',
          ward: 'Kikuyu',
          phone: '+255555000000',
          created_at: '2024-01-01T00:00:00Z'
        }
      };

      const mockUser = mockUsers[formData.email as keyof typeof mockUsers];
      
      if (mockUser && formData.password === 'password123') {
        const mockToken = `mock_token_${Date.now()}`;
        login(mockUser, mockToken);
        
        toast({
          title: "✅ Login successful",
          description: `Welcome back, ${mockUser.first_name}!`,
        });

        console.log('✅ Mock login successful, redirecting...');
        
        // Redirect based on user type
        setTimeout(() => {
          if (formData.email === 'admin@example.com') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 500);
      } else {
        throw new Error('Invalid credentials. Use password123 for any test account.');
      }
    } catch (error: unknown) {
      console.error('❌ Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Invalid credentials. Please try again.';
      toast({
        title: "❌ Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
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
            <h1 className="text-3xl font-bold text-foreground">{t.welcome}</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {t.rememberMe}
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {t.forgotPassword}
              </Link>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? `${t.loading}` : t.signIn}
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-muted-foreground">
            {t.dontHaveAccount}{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              {t.createAccount}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center text-primary-foreground space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto">
            <Leaf className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold">
            Transform Your Agricultural Business
          </h2>
          <p className="text-lg opacity-80">
            Access real-time information, expert advice, and connect with verified 
            suppliers across Tanzania's agricultural ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
