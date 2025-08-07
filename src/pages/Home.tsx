
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ApiCard from '@/components/ApiCard';
import AnnouncementCard from '@/components/AnnouncementCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  
  const [featuredApis, setFeaturedApis] = useState([
    {
      id: '1',
      name: 'User Authentication API',
      description: 'Secure user authentication and authorization endpoints',
      endpoint: '/api/v1/auth',
      method: 'POST',
      category: 'Authentication',
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'Payment Processing API',
      description: 'Process payments and manage transactions securely',
      endpoint: '/api/v1/payments',
      method: 'POST',
      category: 'Finance',
      status: 'active' as const,
    },
    {
      id: '3',
      name: 'Data Analytics API',
      description: 'Access analytics and reporting data',
      endpoint: '/api/v1/analytics',
      method: 'GET',
      category: 'Analytics',
      status: 'beta' as const,
    },
  ]);

  const [recentAnnouncements, setRecentAnnouncements] = useState([
    {
      id: '1',
      title: 'New Payment API v2.0 Released',
      content: 'We are excited to announce the release of Payment API v2.0 with enhanced security features and improved performance.',
      type: 'success' as const,
      date: '2024-06-03',
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Scheduled Maintenance',
      content: 'Our APIs will undergo scheduled maintenance on June 10th from 2:00 AM to 4:00 AM UTC. Please plan accordingly.',
      type: 'warning' as const,
      date: '2024-06-02',
      priority: 'medium' as const,
    },
  ]);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSearch={handleSearch} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {t('home.title')}
              <span className="block text-blue-200">{t('home.subtitle')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apis">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
                  {t('home.exploreApis')}
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/announcements">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
                  {t('home.viewAnnouncements')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured APIs - Now Second Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.featuredApis')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.featuredApisDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredApis.map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/apis">
              <Button variant="outline" size="lg" className="px-8">
                {t('home.viewAllApis')}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Brief - Now Third Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.latestUpdates')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.latestUpdatesDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {recentAnnouncements.slice(0, 2).map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/announcements">
              <Button variant="outline" size="lg" className="px-8">
                {t('home.viewAllAnnouncements')}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">API</span>
              </div>
              <span className="text-xl font-bold">OpenAPI Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('home.footerDesc')}
            </p>
            <p className="text-sm text-gray-500">
              {t('home.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
