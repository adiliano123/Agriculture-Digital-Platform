import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, BarChart3, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from '@/components/LanguageSwitch';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export default function AdminLayout() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    { name: t.dashboard, path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: t.users, path: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { name: t.content, path: '/admin/content', icon: <FileText className="h-5 w-5" /> },
    { name: t.reports, path: '/admin/reports', icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-primary">{t.adminPanel}</h1>
            <LanguageSwitch />
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-4 border-t">
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="mr-3 h-5 w-5" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-10 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-primary">{t.admin}</h1>
        <LanguageSwitch />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden pt-16 md:pt-0">
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
