
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import AnnouncementCard from '@/components/AnnouncementCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'New Payment API v2.0 Released',
      content: 'We are excited to announce the release of Payment API v2.0 with enhanced security features and improved performance. This update includes:\n\n• Enhanced encryption for all transactions\n• Reduced latency by 40%\n• Support for new payment methods\n• Improved error handling and reporting\n\nPlease review the updated documentation and consider migrating to the new version.',
      type: 'success' as const,
      date: '2024-06-03',
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Scheduled Maintenance',
      content: 'Our APIs will undergo scheduled maintenance on June 10th from 2:00 AM to 4:00 AM UTC. During this time, you may experience:\n\n• Brief service interruptions\n• Increased response times\n• Temporary unavailability of some endpoints\n\nWe apologize for any inconvenience and appreciate your patience.',
      type: 'warning' as const,
      date: '2024-06-02',
      priority: 'medium' as const,
    },
    {
      id: '3',
      title: 'API Rate Limits Update',
      content: 'Starting July 1st, 2024, we will be implementing new rate limits to ensure optimal performance for all users:\n\n• Free tier: 1,000 requests per hour\n• Pro tier: 10,000 requests per hour\n• Enterprise tier: Custom limits available\n\nExisting users will have a 30-day grace period to adjust their applications.',
      type: 'info' as const,
      date: '2024-06-01',
      priority: 'medium' as const,
    },
    {
      id: '4',
      title: 'Security Enhancement Deployed',
      content: 'We have successfully deployed additional security measures across all our APIs. These enhancements include:\n\n• Advanced DDoS protection\n• Enhanced API key validation\n• Improved monitoring and alerting\n• Updated SSL certificates\n\nNo action is required from developers. All changes are backward compatible.',
      type: 'success' as const,
      date: '2024-05-28',
      priority: 'low' as const,
    },
    {
      id: '5',
      title: 'Deprecation Notice: Legacy User API',
      content: 'The Legacy User API (v0) will be deprecated on December 31st, 2024. Please migrate to the new User Authentication API (v1) before this date.\n\nMigration benefits:\n• Improved security with JWT tokens\n• Better performance\n• OAuth2 support\n• Enhanced documentation\n\nMigration guide and support are available in our documentation.',
      type: 'warning' as const,
      date: '2024-05-25',
      priority: 'high' as const,
    },
  ]);

  const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const types = ['all', 'info', 'warning', 'success', 'update'];
  const priorities = ['all', 'low', 'medium', 'high'];

  useEffect(() => {
    let filtered = announcements;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(announcement => announcement.type === selectedType);
    }

    // Filter by priority
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(announcement => announcement.priority === selectedPriority);
    }

    setFilteredAnnouncements(filtered);
  }, [searchQuery, selectedType, selectedPriority, announcements]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedPriority('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Announcements
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest news, updates, and important notices about our APIs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Search announcements by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedType !== 'all' || selectedPriority !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary">Search: {searchQuery}</Badge>
              )}
              {selectedType !== 'all' && (
                <Badge variant="secondary">Type: {selectedType}</Badge>
              )}
              {selectedPriority !== 'all' && (
                <Badge variant="secondary">Priority: {selectedPriority}</Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredAnnouncements.length} of {announcements.length} announcements
            </p>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">Filter results</span>
            </div>
          </div>
        </div>

        {/* Announcement Cards */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>

        {/* No Results */}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
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

export default Announcements;
