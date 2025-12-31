import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock user data - in a real app, this would come from an API
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Farm St, Agriculture City',
};

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
      title: t.profileUpdated,
      description: t.profileUpdatedDesc,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t.dashboard}</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">{t.myProfile}</TabsTrigger>
          <TabsTrigger value="services">{t.availableServices}</TabsTrigger>
          <TabsTrigger value="activity">{t.activity}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t.personalInformation}</CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>{t.editProfile}</Button>
              ) : (
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => {
                    setFormData(user);
                    setIsEditing(false);
                  }}>
                    {t.cancel}
                  </Button>
                  <Button onClick={handleSave}>{t.saveChanges}</Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.fullName}</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{user.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{user.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{user.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t.address}</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{user.address}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>{t.availableServices}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Crop Monitoring', description: 'Monitor your crops with our advanced sensors' },
                  { name: 'Weather Forecast', description: 'Get accurate weather predictions for your farm' },
                  { name: 'Market Prices', description: 'Real-time market prices for your produce' },
                  { name: 'Expert Consultation', description: 'Connect with agricultural experts' },
                  { name: 'Soil Analysis', description: 'Detailed soil health reports' },
                  { name: 'Irrigation Control', description: 'Smart irrigation system management' },
                ].map((service, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <Button className="mt-4" variant="outline">
                        {t.viewDetails}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>{t.recentActivity}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, action: 'Updated profile information', time: '2 hours ago' },
                  { id: 2, action: 'Viewed crop monitoring data', time: '1 day ago' },
                  { id: 3, action: 'Checked weather forecast', time: '2 days ago' },
                  { id: 4, action: 'Contacted support', time: '1 week ago' },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <p>{activity.action}</p>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
