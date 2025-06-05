
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ApiCard from '@/components/ApiCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

const APIs = () => {
  const [apis, setApis] = useState([
    {
      id: '1',
      name: 'User Authentication API',
      description: 'Secure user authentication and authorization endpoints with JWT token support and OAuth2 integration.',
      endpoint: '/api/v1/auth',
      method: 'POST',
      category: 'Authentication',
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'Payment Processing API',
      description: 'Process payments and manage transactions securely with multiple payment gateways.',
      endpoint: '/api/v1/payments',
      method: 'POST',
      category: 'Finance',
      status: 'active' as const,
    },
    {
      id: '3',
      name: 'Data Analytics API',
      description: 'Access analytics and reporting data with real-time insights and custom metrics.',
      endpoint: '/api/v1/analytics',
      method: 'GET',
      category: 'Analytics',
      status: 'beta' as const,
    },
    {
      id: '4',
      name: 'File Upload API',
      description: 'Upload and manage files with automatic compression and cloud storage.',
      endpoint: '/api/v1/files',
      method: 'POST',
      category: 'Storage',
      status: 'active' as const,
    },
    {
      id: '5',
      name: 'Notification API',
      description: 'Send push notifications, emails, and SMS messages to users.',
      endpoint: '/api/v1/notifications',
      method: 'POST',
      category: 'Communication',
      status: 'active' as const,
    },
    {
      id: '6',
      name: 'Legacy User API',
      description: 'Legacy user management endpoints. Please migrate to User Authentication API.',
      endpoint: '/api/v0/users',
      method: 'GET',
      category: 'Authentication',
      status: 'deprecated' as const,
    },
  ]);

  const [filteredApis, setFilteredApis] = useState(apis);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', ...Array.from(new Set(apis.map(api => api.category)))];
  const statuses = ['all', 'active', 'beta', 'deprecated'];

  useEffect(() => {
    let filtered = apis;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(api =>
        api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.endpoint.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(api => api.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(api => api.status === selectedStatus);
    }

    setFilteredApis(filtered);
  }, [searchQuery, selectedCategory, selectedStatus, apis]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive collection of our Open APIs with detailed documentation and examples
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Search APIs by name, description, or endpoint..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary">Search: {searchQuery}</Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary">Category: {selectedCategory}</Badge>
              )}
              {selectedStatus !== 'all' && (
                <Badge variant="secondary">Status: {selectedStatus}</Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredApis.length} of {apis.length} APIs
            </p>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">Filter results</span>
            </div>
          </div>
        </div>

        {/* API Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApis.map((api) => (
            <ApiCard key={api.id} api={api} />
          ))}
        </div>

        {/* No Results */}
        {filteredApis.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No APIs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default APIs;
