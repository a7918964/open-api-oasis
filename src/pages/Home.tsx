
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ApiCard from '@/components/ApiCard';
import AnnouncementCard from '@/components/AnnouncementCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
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
              Powerful APIs for
              <span className="block text-blue-200">Modern Applications</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover, integrate, and manage our comprehensive collection of Open APIs. 
              Build amazing applications with reliable, well-documented endpoints.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apis">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
                  Explore APIs
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/announcements">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  View Announcements
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h3>
              <p className="text-gray-600">API Uptime</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Active Developers</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Zap className="text-purple-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1M+</h3>
              <p className="text-gray-600">API Calls Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured APIs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured APIs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our most popular and powerful APIs that developers love to use
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
                View All APIs
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Announcements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Announcements
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, updates, and important notices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {recentAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/announcements">
              <Button variant="outline" size="lg" className="px-8">
                View All Announcements
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
              Empowering developers with powerful, reliable APIs
            </p>
            <p className="text-sm text-gray-500">
              © 2024 OpenAPI Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
