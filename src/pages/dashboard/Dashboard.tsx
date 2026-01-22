import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Leaf,
  Droplets,
  Sun,
  CloudRain,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  PieChart,
  Settings,
  Bell,
  Star,
  Award,
  Target,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

// Enhanced mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+255 123 456 789',
  address: 'Arusha, Tanzania',
  userType: 'Farmer',
  joinDate: '2024-01-15',
  profileImage: null,
  farmSize: '25 acres',
  primaryCrops: ['Maize', 'Coffee', 'Beans'],
  region: 'Arusha',
  district: 'Arusha Urban',
  ward: 'Kaloleni'
};

// Mock dashboard statistics
const dashboardStats = {
  totalFarms: 1,
  activeCrops: 3,
  monthlyRevenue: 2450000, // TSh
  weatherAlerts: 2,
  marketPrice: 1200, // TSh per kg
  soilHealth: 85,
  irrigationStatus: 'Active',
  nextHarvest: '45 days'
};

// Mock recent activities
const recentActivities = [
  { id: 1, type: 'success', icon: CheckCircle, action: 'Irrigation system activated', time: '2 hours ago', details: 'Zone A - Maize field' },
  { id: 2, type: 'warning', icon: AlertTriangle, action: 'Weather alert received', time: '5 hours ago', details: 'Heavy rain expected tomorrow' },
  { id: 3, type: 'info', icon: Info, action: 'Market price updated', time: '1 day ago', details: 'Maize: 1,200 TSh/kg (+5%)' },
  { id: 4, type: 'success', icon: CheckCircle, action: 'Soil analysis completed', time: '2 days ago', details: 'pH: 6.8, Nitrogen: Good' },
  { id: 5, type: 'info', icon: Info, action: 'Expert consultation scheduled', time: '3 days ago', details: 'Dr. Mwalimu - Crop diseases' },
];

// Mock services with enhanced data
const availableServices = [
  { 
    name: 'Crop Monitoring', 
    description: 'Real-time monitoring of crop health and growth',
    icon: Leaf,
    status: 'active',
    usage: 85,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  { 
    name: 'Weather Forecast', 
    description: 'Accurate 7-day weather predictions',
    icon: Sun,
    status: 'active',
    usage: 92,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  { 
    name: 'Market Prices', 
    description: 'Real-time commodity prices and trends',
    icon: DollarSign,
    status: 'active',
    usage: 78,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  { 
    name: 'Irrigation Control', 
    description: 'Smart irrigation system management',
    icon: Droplets,
    status: 'active',
    usage: 67,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  { 
    name: 'Expert Consultation', 
    description: 'Connect with agricultural experts',
    icon: Users,
    status: 'available',
    usage: 45,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  { 
    name: 'Soil Analysis', 
    description: 'Comprehensive soil health reports',
    icon: Target,
    status: 'pending',
    usage: 30,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
];

export default function Dashboard() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'available':
        return <Badge className="bg-blue-100 text-blue-800">Available</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Farms</p>
                  <p className="text-3xl font-bold">{dashboardStats.totalFarms}</p>
                </div>
                <Leaf className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Crops</p>
                  <p className="text-3xl font-bold">{dashboardStats.activeCrops}</p>
                </div>
                <Target className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Monthly Revenue</p>
                  <p className="text-3xl font-bold">{(dashboardStats.monthlyRevenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-yellow-100">TSh</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Soil Health</p>
                  <p className="text-3xl font-bold">{dashboardStats.soilHealth}%</p>
                </div>
                <Shield className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Farm Status */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Farm Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Next Harvest</Label>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">{dashboardStats.nextHarvest}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Irrigation Status</Label>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <Badge className="bg-green-100 text-green-800">{dashboardStats.irrigationStatus}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Weather Alerts</Label>
                      <div className="flex items-center gap-2">
                        <CloudRain className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{dashboardStats.weatherAlerts} active</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Market Price (Maize)</Label>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-semibold">{dashboardStats.marketPrice.toLocaleString()} TSh/kg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Droplets className="w-4 h-4 mr-2" />
                    Control Irrigation
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Sun className="w-4 h-4 mr-2" />
                    Check Weather
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Market Prices
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Contact Expert
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.slice(0, 5).map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`p-2 rounded-full ${activity.type === 'success' ? 'bg-green-100' : activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                          <IconComponent className={`w-4 h-4 ${getActivityIcon(activity.type)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.details}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  ) : (
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => {
                        setFormData(user);
                        setIsEditing(false);
                      }}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>Save Changes</Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>{user.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{user.address}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>User Type</Label>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-500" />
                        <Badge variant="secondary">{user.userType}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Member Since</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Farm Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Farm Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Farm Size</Label>
                    <p className="font-semibold">{user.farmSize}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Crops</Label>
                    <div className="flex flex-wrap gap-2">
                      {user.primaryCrops.map((crop, index) => (
                        <Badge key={index} variant="outline">{crop}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Region:</span> {user.region}</p>
                      <p><span className="font-medium">District:</span> {user.district}</p>
                      <p><span className="font-medium">Ward:</span> {user.ward}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Available Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableServices.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-lg ${service.bgColor}`}>
                              <IconComponent className={`w-6 h-6 ${service.color}`} />
                            </div>
                            {getStatusBadge(service.status)}
                          </div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600">{service.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Usage</span>
                              <span>{service.usage}%</span>
                            </div>
                            <Progress value={service.usage} className="h-2" />
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1" variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button className="flex-1" size="sm">
                              Use Service
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Activity History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`p-2 rounded-full ${activity.type === 'success' ? 'bg-green-100' : activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                          <IconComponent className={`w-5 h-5 ${getActivityIcon(activity.type)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">{activity.action}</p>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Crop Yield</span>
                      <span className="text-sm text-gray-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Water Efficiency</span>
                      <span className="text-sm text-gray-600">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Soil Health</span>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Pest Control</span>
                      <span className="text-sm text-gray-600">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Resource Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">2,450L</p>
                      <p className="text-sm text-gray-600">Water Used</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">15kg</p>
                      <p className="text-sm text-gray-600">Fertilizer</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-yellow-600">8.5hrs</p>
                      <p className="text-sm text-gray-600">Sunlight</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">125kWh</p>
                      <p className="text-sm text-gray-600">Energy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
