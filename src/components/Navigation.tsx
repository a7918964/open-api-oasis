
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
  onSearch?: (query: string) => void;
}

const Navigation = ({ onSearch }: NavigationProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast({
      title: t('admin.loggedOut'),
      description: t('admin.loggedOutDesc'),
    });
  };

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/apis', label: t('nav.apis') },
    { href: '/announcements', label: t('nav.announcements') },
  ];

  // Add admin link only if user is authenticated as admin
  if (isAuthenticated && isAdmin) {
    navItems.push({ href: '/admin', label: t('nav.admin') });
  }

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`${
            mobile ? 'block px-3 py-2 text-base' : 'text-sm'
          } font-medium transition-colors hover:text-blue-600 ${
            location.pathname === item.href
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-700'
          }`}
          onClick={mobile ? () => setIsOpen(false) : undefined}
        >
          {item.href === '/admin' && (
            <Settings className="inline-block w-4 h-4 mr-1" />
          )}
          {item.label}
        </Link>
      ))}
      {isAuthenticated && isAdmin && mobile && (
        <Button
          variant="outline"
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center space-x-2"
        >
          <LogOut size={16} />
          <span>{t('nav.logout')}</span>
        </Button>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">API</span>
            </div>
            <span className="font-bold text-xl text-gray-900">OpenAPI Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <LanguageSwitcher />
            {isAuthenticated && isAdmin && (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>{t('nav.logout')}</span>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks mobile />
                <div className="pt-4 border-t">
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
