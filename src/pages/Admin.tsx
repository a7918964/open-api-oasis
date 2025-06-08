import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Save, Shield, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ApiResponse {
  statusCode: string;
  description: string;
  example: string;
}

interface ApiFormData {
  name: string;
  description: string;
  endpoint: string;
  method: string;
  category: string;
  status: string;
  parameters: ApiParameter[];
  responses: ApiResponse[];
}

const Admin = () => {
  const { toast } = useToast();
  const { logout } = useAuth();
  
  const [apis, setApis] = useState([
    {
      id: '1',
      name: 'User Authentication API',
      description: 'Secure user authentication and authorization endpoints',
      endpoint: '/api/v1/auth',
      method: 'POST',
      category: 'Authentication',
      status: 'active',
      parameters: [
        { name: 'email', type: 'string', required: true, description: 'User email address' },
        { name: 'password', type: 'string', required: true, description: 'User password (min 8 characters)' }
      ],
      responses: [
        { statusCode: '200', description: 'Authentication successful', example: '{"token": "jwt_token", "user": {...}}' },
        { statusCode: '401', description: 'Invalid credentials', example: '{"error": "Invalid email or password"}' }
      ]
    },
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'New Payment API v2.0 Released',
      content: 'We are excited to announce the release of Payment API v2.0',
      type: 'success',
      priority: 'high',
      date: '2024-06-03',
    },
  ]);

  const [apiForm, setApiForm] = useState<ApiFormData>({
    name: '',
    description: '',
    endpoint: '',
    method: 'GET',
    category: '',
    status: 'active',
    parameters: [],
    responses: [],
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    type: 'info',
    priority: 'medium',
  });

  const [editingApiId, setEditingApiId] = useState<string | null>(null);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);

  const addParameter = () => {
    setApiForm(prev => ({
      ...prev,
      parameters: [...prev.parameters, { name: '', type: 'string', required: false, description: '' }]
    }));
  };

  const removeParameter = (index: number) => {
    setApiForm(prev => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index)
    }));
  };

  const updateParameter = (index: number, field: keyof ApiParameter, value: string | boolean) => {
    setApiForm(prev => ({
      ...prev,
      parameters: prev.parameters.map((param, i) => 
        i === index ? { ...param, [field]: value } : param
      )
    }));
  };

  const addResponse = () => {
    setApiForm(prev => ({
      ...prev,
      responses: [...prev.responses, { statusCode: '200', description: '', example: '' }]
    }));
  };

  const removeResponse = (index: number) => {
    setApiForm(prev => ({
      ...prev,
      responses: prev.responses.filter((_, i) => i !== index)
    }));
  };

  const updateResponse = (index: number, field: keyof ApiResponse, value: string) => {
    setApiForm(prev => ({
      ...prev,
      responses: prev.responses.map((response, i) => 
        i === index ? { ...response, [field]: value } : response
      )
    }));
  };

  const handleApiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingApiId) {
      setApis(prev => prev.map(api => 
        api.id === editingApiId 
          ? { ...apiForm, id: editingApiId }
          : api
      ));
      setEditingApiId(null);
      toast({
        title: "API Updated",
        description: "The API has been successfully updated.",
      });
    } else {
      const newApi = {
        ...apiForm,
        id: Date.now().toString(),
      };
      setApis(prev => [...prev, newApi]);
      toast({
        title: "API Created",
        description: "New API has been successfully created.",
      });
    }
    
    setApiForm({
      name: '',
      description: '',
      endpoint: '',
      method: 'GET',
      category: '',
      status: 'active',
      parameters: [],
      responses: [],
    });
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAnnouncementId) {
      setAnnouncements(prev => prev.map(announcement => 
        announcement.id === editingAnnouncementId 
          ? { ...announcementForm, id: editingAnnouncementId, date: announcement.date }
          : announcement
      ));
      setEditingAnnouncementId(null);
      toast({
        title: "Announcement Updated",
        description: "The announcement has been successfully updated.",
      });
    } else {
      const newAnnouncement = {
        ...announcementForm,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
      };
      setAnnouncements(prev => [...prev, newAnnouncement]);
      toast({
        title: "Announcement Created",
        description: "New announcement has been successfully created.",
      });
    }
    
    setAnnouncementForm({
      title: '',
      content: '',
      type: 'info',
      priority: 'medium',
    });
  };

  const editApi = (api: any) => {
    setApiForm(api);
    setEditingApiId(api.id);
  };

  const deleteApi = (id: string) => {
    setApis(prev => prev.filter(api => api.id !== id));
    toast({
      title: "API Deleted",
      description: "The API has been successfully deleted.",
    });
  };

  const editAnnouncement = (announcement: any) => {
    setAnnouncementForm(announcement);
    setEditingAnnouncementId(announcement.id);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been successfully deleted.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span>Admin Panel</span>
              </h1>
              <p className="text-xl text-gray-600">
                Manage APIs and announcements for the OpenAPI Hub
              </p>
            </div>
            <div className="hidden md:block">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Admin Access
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="apis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="apis">Manage APIs</TabsTrigger>
            <TabsTrigger value="announcements">Manage Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="apis" className="space-y-6">
            {/* API Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus size={20} />
                  <span>{editingApiId ? 'Edit API' : 'Add New API'}</span>
                </CardTitle>
                <CardDescription>
                  {editingApiId ? 'Update the API information' : 'Create a new API endpoint'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleApiSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          API Name
                        </label>
                        <Input
                          type="text"
                          value={apiForm.name}
                          onChange={(e) => setApiForm({ ...apiForm, name: e.target.value })}
                          placeholder="Enter API name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <Input
                          type="text"
                          value={apiForm.category}
                          onChange={(e) => setApiForm({ ...apiForm, category: e.target.value })}
                          placeholder="Enter category"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Endpoint
                        </label>
                        <Input
                          type="text"
                          value={apiForm.endpoint}
                          onChange={(e) => setApiForm({ ...apiForm, endpoint: e.target.value })}
                          placeholder="/api/v1/endpoint"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Method
                        </label>
                        <Select value={apiForm.method} onValueChange={(value) => setApiForm({ ...apiForm, method: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <Select value={apiForm.status} onValueChange={(value) => setApiForm({ ...apiForm, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="beta">Beta</SelectItem>
                            <SelectItem value="deprecated">Deprecated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Textarea
                        value={apiForm.description}
                        onChange={(e) => setApiForm({ ...apiForm, description: e.target.value })}
                        placeholder="Enter API description"
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  {/* Parameters Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Parameters</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addParameter}>
                        <Plus size={16} className="mr-1" />
                        Add Parameter
                      </Button>
                    </div>
                    {apiForm.parameters.map((param, index) => (
                      <div key={index} className="border rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Parameter {index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeParameter(index)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name
                            </label>
                            <Input
                              value={param.name}
                              onChange={(e) => updateParameter(index, 'name', e.target.value)}
                              placeholder="Parameter name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Type
                            </label>
                            <Select 
                              value={param.type} 
                              onValueChange={(value) => updateParameter(index, 'type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="string">String</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="boolean">Boolean</SelectItem>
                                <SelectItem value="array">Array</SelectItem>
                                <SelectItem value="object">Object</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2 pt-6">
                            <input
                              type="checkbox"
                              checked={param.required}
                              onChange={(e) => updateParameter(index, 'required', e.target.checked)}
                              className="rounded"
                            />
                            <label className="text-sm">Required</label>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <Input
                              value={param.description}
                              onChange={(e) => updateParameter(index, 'description', e.target.value)}
                              placeholder="Parameter description"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Responses Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Responses</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addResponse}>
                        <Plus size={16} className="mr-1" />
                        Add Response
                      </Button>
                    </div>
                    {apiForm.responses.map((response, index) => (
                      <div key={index} className="border rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Response {index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeResponse(index)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status Code
                            </label>
                            <Select 
                              value={response.statusCode} 
                              onValueChange={(value) => updateResponse(index, 'statusCode', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="200">200 - OK</SelectItem>
                                <SelectItem value="201">201 - Created</SelectItem>
                                <SelectItem value="400">400 - Bad Request</SelectItem>
                                <SelectItem value="401">401 - Unauthorized</SelectItem>
                                <SelectItem value="404">404 - Not Found</SelectItem>
                                <SelectItem value="500">500 - Server Error</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <Input
                              value={response.description}
                              onChange={(e) => updateResponse(index, 'description', e.target.value)}
                              placeholder="Response description"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Example
                            </label>
                            <Textarea
                              value={response.example}
                              onChange={(e) => updateResponse(index, 'example', e.target.value)}
                              placeholder='{"example": "response"}'
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" className="flex items-center space-x-2">
                      <Save size={16} />
                      <span>{editingApiId ? 'Update API' : 'Create API'}</span>
                    </Button>
                    {editingApiId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingApiId(null);
                          setApiForm({
                            name: '',
                            description: '',
                            endpoint: '',
                            method: 'GET',
                            category: '',
                            status: 'active',
                            parameters: [],
                            responses: [],
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* API List */}
            <Card>
              <CardHeader>
                <CardTitle>Existing APIs</CardTitle>
                <CardDescription>Manage your current API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apis.map((api) => (
                    <div key={api.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{api.name}</h3>
                          <Badge variant="outline">{api.method}</Badge>
                          <Badge className={
                            api.status === 'active' ? 'bg-green-100 text-green-800' :
                            api.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {api.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{api.description}</p>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{api.endpoint}</code>
                        <div className="mt-2 text-xs text-gray-500">
                          {api.parameters?.length > 0 && (
                            <span className="mr-4">Parameters: {api.parameters.length}</span>
                          )}
                          {api.responses?.length > 0 && (
                            <span>Responses: {api.responses.length}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editApi(api)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteApi(api.id)}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            {/* Announcement Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus size={20} />
                  <span>{editingAnnouncementId ? 'Edit Announcement' : 'Create New Announcement'}</span>
                </CardTitle>
                <CardDescription>
                  {editingAnnouncementId ? 'Update the announcement' : 'Post a new announcement to users'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input
                      type="text"
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      placeholder="Enter announcement title"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <Select 
                        value={announcementForm.type} 
                        onValueChange={(value) => setAnnouncementForm({ ...announcementForm, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="update">Update</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <Select 
                        value={announcementForm.priority} 
                        onValueChange={(value) => setAnnouncementForm({ ...announcementForm, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <Textarea
                      value={announcementForm.content}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                      placeholder="Enter announcement content"
                      rows={5}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex items-center space-x-2">
                      <Save size={16} />
                      <span>{editingAnnouncementId ? 'Update Announcement' : 'Post Announcement'}</span>
                    </Button>
                    {editingAnnouncementId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingAnnouncementId(null);
                          setAnnouncementForm({
                            title: '',
                            content: '',
                            type: 'info',
                            priority: 'medium',
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Announcements List */}
            <Card>
              <CardHeader>
                <CardTitle>Published Announcements</CardTitle>
                <CardDescription>Manage your current announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <Badge className={
                            announcement.type === 'success' ? 'bg-green-100 text-green-800' :
                            announcement.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                            announcement.type === 'info' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {announcement.type}
                          </Badge>
                          <Badge className={
                            announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                            announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{announcement.content.substring(0, 150)}...</p>
                        <p className="text-xs text-gray-500">Posted: {announcement.date}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editAnnouncement(announcement)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAnnouncement(announcement.id)}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
