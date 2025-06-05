
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface AnnouncementCardProps {
  announcement: {
    id: string;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'success' | 'update';
    date: string;
    priority: 'low' | 'medium' | 'high';
  };
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle size={16} className="text-orange-600" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'info':
        return <Info size={16} className="text-blue-600" />;
      default:
        return <Info size={16} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getTypeIcon(announcement.type)}
            <CardTitle className="text-lg">{announcement.title}</CardTitle>
          </div>
          <div className="flex space-x-2">
            <Badge className={getTypeColor(announcement.type)} variant="secondary">
              {announcement.type}
            </Badge>
            <Badge className={getPriorityColor(announcement.priority)} variant="secondary">
              {announcement.priority}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Calendar size={14} />
          <span>{announcement.date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 whitespace-pre-wrap">
          {announcement.content}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
