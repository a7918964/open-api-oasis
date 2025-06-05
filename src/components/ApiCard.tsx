
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApiCardProps {
  api: {
    id: string;
    name: string;
    description: string;
    endpoint: string;
    method: string;
    category: string;
    status: 'active' | 'deprecated' | 'beta';
  };
  onViewDetails?: (id: string) => void;
}

const ApiCard = ({ api, onViewDetails }: ApiCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'deprecated':
        return 'bg-red-100 text-red-800';
      case 'beta':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'bg-blue-100 text-blue-800';
      case 'POST':
        return 'bg-green-100 text-green-800';
      case 'PUT':
        return 'bg-orange-100 text-orange-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 hover:scale-[1.02] transform">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{api.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {api.description}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(api.status)} variant="secondary">
            {api.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Badge className={getMethodColor(api.method)} variant="secondary">
              {api.method}
            </Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800 flex-1 truncate">
              {api.endpoint}
            </code>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {api.category}
            </Badge>
            <div className="flex space-x-2">
              <Link to={`/api/${api.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Code size={14} />
                  <span>Details</span>
                </Button>
              </Link>
              <Link to={`/try-api/${api.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <ExternalLink size={14} />
                  <span>Try</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiCard;
