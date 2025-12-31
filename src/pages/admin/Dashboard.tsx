import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, FileText, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const stats = [
    { title: t.totalUsers, value: '1,234', icon: <Users className="h-6 w-6" /> },
    { title: t.activeContent, value: '245', icon: <FileText className="h-6 w-6" /> },
    { title: t.reportsGenerated, value: '89', icon: <BarChart3 className="h-6 w-6" /> },
    { title: t.systemStatus, value: t.online, icon: <Settings className="h-6 w-6" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t.adminDashboard}</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="text-primary">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.quickActions}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/users')}
            >
              <Users className="mr-2 h-4 w-4" />
              {t.manageUsers}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/content')}
            >
              <FileText className="mr-2 h-4 w-4" />
              {t.manageContent}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/reports')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              {t.viewReports}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t.recentActivity}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, action: 'New user registered', time: '2 minutes ago' },
                { id: 2, action: 'Content updated: Farming Techniques', time: '1 hour ago' },
                { id: 3, action: 'Report generated: User Activity', time: '3 hours ago' },
                { id: 4, action: 'System backup completed', time: '1 day ago' },
              ].map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <p className="text-sm">{activity.action}</p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
