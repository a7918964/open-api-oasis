
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Copy } from 'lucide-react';
import { toast } from 'sonner';

const TryApi = () => {
  const { id } = useParams();
  const [api, setApi] = useState<any>(null);
  const [requestBody, setRequestBody] = useState('{\n  "email": "user@example.com",\n  "password": "password123"\n}');
  const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json' }]);
  const [queryParams, setQueryParams] = useState([{ key: '', value: '' }]);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock API data
  const mockApis = [
    {
      id: '1',
      name: 'User Authentication API',
      description: 'Secure user authentication and authorization endpoints',
      endpoint: '/api/v1/auth',
      method: 'POST',
      category: 'Authentication',
      status: 'active',
      baseUrl: 'https://api.example.com'
    }
  ];

  useEffect(() => {
    const foundApi = mockApis.find(api => api.id === id);
    setApi(foundApi);
  }, [id]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '' }]);
  };

  const updateQueryParam = (index: number, field: 'key' | 'value', value: string) => {
    const newParams = [...queryParams];
    newParams[index][field] = value;
    setQueryParams(newParams);
  };

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const sendRequest = async () => {
    setLoading(true);
    
    // Mock API response
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'x-response-time': '127ms'
        },
        data: {
          success: true,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 1,
            email: 'user@example.com',
            name: 'John Doe'
          }
        }
      };
      
      setResponse(mockResponse);
      setLoading(false);
      toast.success('Request sent successfully!');
    }, 1000);
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      toast.success('Response copied to clipboard!');
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
          <Link to={`/api/${api.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to API Details
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Try {api.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Test the API endpoint with custom parameters
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Configuration */}
          <div className="space-y-6">
            {/* Endpoint */}
            <Card>
              <CardHeader>
                <CardTitle>Endpoint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className={getMethodColor(api.method)} variant="secondary">
                    {api.method}
                  </Badge>
                  <Input 
                    value={`${api.baseUrl}${api.endpoint}`}
                    readOnly
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Request Configuration Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Request Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="body" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="body">Body</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                    <TabsTrigger value="params">Query Params</TabsTrigger>
                  </TabsList>

                  <TabsContent value="body" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Request Body (JSON)</label>
                      <Textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        className="font-mono text-sm"
                        rows={8}
                        placeholder="Enter JSON request body..."
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="headers" className="space-y-4">
                    <div className="space-y-2">
                      {headers.map((header, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder="Header name"
                            value={header.key}
                            onChange={(e) => updateHeader(index, 'key', e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Header value"
                            value={header.value}
                            onChange={(e) => updateHeader(index, 'value', e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" size="sm" onClick={() => removeHeader(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={addHeader}>
                        Add Header
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="params" className="space-y-4">
                    <div className="space-y-2">
                      {queryParams.map((param, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder="Parameter name"
                            value={param.key}
                            onChange={(e) => updateQueryParam(index, 'key', e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Parameter value"
                            value={param.value}
                            onChange={(e) => updateQueryParam(index, 'value', e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" size="sm" onClick={() => removeQueryParam(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={addQueryParam}>
                        Add Parameter
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={sendRequest} 
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Play size={16} />
                    <span>{loading ? 'Sending Request...' : 'Send Request'}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Response</CardTitle>
                  {response && (
                    <Button variant="outline" size="sm" onClick={copyResponse}>
                      <Copy size={14} className="mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!response ? (
                  <div className="text-center py-12 text-gray-500">
                    <Play size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Send a request to see the response</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Response Status */}
                    <div className="flex items-center space-x-2">
                      <Badge className={response.status < 400 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {response.status} {response.statusText}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {response.headers['x-response-time']}
                      </span>
                    </div>

                    {/* Response Headers */}
                    <div>
                      <h4 className="font-medium mb-2">Response Headers</h4>
                      <div className="bg-gray-50 rounded p-3 text-sm space-y-1">
                        {Object.entries(response.headers).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-mono text-blue-600 w-32">{key}:</span>
                            <span className="text-gray-700">{value as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Response Body */}
                    <div>
                      <h4 className="font-medium mb-2">Response Body</h4>
                      <div className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto">
                        <pre className="text-sm">
                          {JSON.stringify(response.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryApi;
