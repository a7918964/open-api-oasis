
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ExternalLink, Copy, Play } from 'lucide-react';
import { toast } from 'sonner';

const ApiDetail = () => {
  const { id } = useParams();
  const [api, setApi] = useState<any>(null);

  // Mock API data - in a real app this would come from a backend
  const mockApis = [
    {
      id: '1',
      name: 'User Authentication API',
      description: 'Secure user authentication and authorization endpoints with JWT token support and OAuth2 integration.',
      endpoint: '/api/v1/auth',
      method: 'POST',
      category: 'Authentication',
      status: 'active',
      version: '1.2.0',
      baseUrl: 'https://api.example.com',
      documentation: {
        overview: 'This API provides secure authentication services including user registration, login, token refresh, and password management.',
        parameters: [
          { name: 'email', type: 'string', required: true, description: 'User email address' },
          { name: 'password', type: 'string', required: true, description: 'User password (min 8 characters)' },
          { name: 'remember_me', type: 'boolean', required: false, description: 'Keep user logged in' }
        ],
        responses: {
          '200': { description: 'Successful authentication', example: '{"token": "jwt_token_here", "user": {...}}' },
          '401': { description: 'Invalid credentials', example: '{"error": "Invalid email or password"}' },
          '422': { description: 'Validation error', example: '{"errors": {"email": ["Email is required"]}}' }
        },
        examples: [
          {
            title: 'Login Request',
            code: `curl -X POST "${'https://api.example.com/api/v1/auth'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`
          }
        ]
      }
    },
    // Add other mock APIs here...
  ];

  useEffect(() => {
    const foundApi = mockApis.find(api => api.id === id);
    setApi(foundApi);
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-orange-100 text-orange-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!api) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onSearch={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">API Not Found</h1>
            <p className="text-gray-600 mb-4">The requested API could not be found.</p>
            <Link to="/apis">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                Back to APIs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSearch={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/apis" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to APIs
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {api.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {api.description}
              </p>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(api.status)} variant="secondary">
                  {api.status}
                </Badge>
                <Badge className={getMethodColor(api.method)} variant="secondary">
                  {api.method}
                </Badge>
                <Badge variant="outline">{api.category}</Badge>
                <Badge variant="outline">v{api.version}</Badge>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link to={`/try-api/${api.id}`}>
                <Button className="flex items-center space-x-2">
                  <Play size={16} />
                  <span>Try API</span>
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <span>Open in Postman</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Endpoint Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Endpoint Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base URL</label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm">{api.baseUrl}</code>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(api.baseUrl)}>
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint</label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm">{api.endpoint}</code>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(api.endpoint)}>
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>API Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {api.documentation.overview}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parameters">
            <Card>
              <CardHeader>
                <CardTitle>Request Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Name</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Required</th>
                        <th className="text-left py-3 px-4 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {api.documentation.parameters.map((param: any, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-mono text-sm">{param.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{param.type}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            {param.required ? (
                              <Badge className="bg-red-100 text-red-800">Required</Badge>
                            ) : (
                              <Badge variant="secondary">Optional</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-700">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses">
            <Card>
              <CardHeader>
                <CardTitle>Response Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(api.documentation.responses).map(([code, response]: [string, any]) => (
                    <div key={code} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={code.startsWith('2') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {code}
                        </Badge>
                        <span className="font-medium">{response.description}</span>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <code className="text-sm">{response.example}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {api.documentation.examples.map((example: any, index: number) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{example.title}</h4>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(example.code)}>
                          <Copy size={14} className="mr-2" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm">{example.code}</pre>
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

export default ApiDetail;
