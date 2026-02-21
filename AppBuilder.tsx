import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Globe, 
  Rocket, 
  Copy, 
  Check,
  Trash2,
  ExternalLink,
  Layout,
  FileCode,
  Database,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface DeployedApp {
  id: string;
  name: string;
  description: string;
  url: string;
  createdAt: string;
  status: 'active' | 'building' | 'error';
}

const sampleApps: DeployedApp[] = [
  {
    id: '1',
    name: 'Hindi Quiz App',
    description: 'UGC NET quiz application with multiple categories',
    url: 'https://kka4qcrgpul3k.ok.kimi.link',
    createdAt: '2024-02-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Portfolio Website',
    description: 'Personal portfolio with projects and contact',
    url: 'https://portfolio-demo.ok.kimi.link',
    createdAt: '2024-02-14',
    status: 'active'
  }
];

export function AppBuilder() {
  const [apps, setApps] = useState<DeployedApp[]>(sampleApps);
  const [newAppName, setNewAppName] = useState('');
  const [newAppDescription, setNewAppDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateRandomUrl = (name: string) => {
    const randomId = Math.random().toString(36).substring(2, 10);
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `https://${slug || 'app'}-${randomId}.ok.kimi.link`;
  };

  const createApp = () => {
    if (!newAppName.trim()) {
      toast.error('कृपया ऐप का नाम दर्ज करें');
      return;
    }

    setIsCreating(true);

    // Simulate app creation
    setTimeout(() => {
      const newApp: DeployedApp = {
        id: Date.now().toString(),
        name: newAppName,
        description: newAppDescription || 'No description provided',
        url: generateRandomUrl(newAppName),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active'
      };

      setApps([newApp, ...apps]);
      setNewAppName('');
      setNewAppDescription('');
      setIsCreating(false);
      toast.success('ऐप सफलतापूर्वक बनाया गया!');
    }, 2000);
  };

  const deleteApp = (id: string) => {
    setApps(apps.filter(app => app.id !== id));
    toast.success('ऐप हटा दिया गया');
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL कॉपी हो गया!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openApp = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Create New App Card */}
      <Card className="border-2 border-dashed border-indigo-200 bg-indigo-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <Rocket className="w-5 h-5" />
            नया ऐप बनाएं
          </CardTitle>
          <CardDescription>
            अपना खुद का वेब ऐप बनाएं और पब्लिक URL पर डिप्लॉय करें
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                ऐप का नाम
              </label>
              <Input
                placeholder="जैसे: My Portfolio"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                className="bg-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                विवरण (Optional)
              </label>
              <Input
                placeholder="ऐप का संक्षिप्त विवरण"
                value={newAppDescription}
                onChange={(e) => setNewAppDescription(e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
          <Button
            onClick={createApp}
            disabled={isCreating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                बन रहा है...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                ऐप बनाएं और डिप्लॉय करें
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Deployed Apps */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          आपके डिप्लॉय किए गए ऐप्स
          <Badge variant="secondary" className="ml-2">
            {apps.length}
          </Badge>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <Card key={app.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Layout className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => copyUrl(app.url, app.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="URL कॉपी करें"
                    >
                      {copiedId === app.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteApp(app.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="हटाएं"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-1">{app.name}</h4>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{app.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${
                    app.status === 'active' ? 'bg-green-500' : 
                    app.status === 'building' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="text-xs text-gray-500 capitalize">{app.status}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-2 mb-3">
                  <code className="text-xs text-indigo-600 break-all">{app.url}</code>
                </div>

                <Button
                  onClick={() => openApp(app.url)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  ऐप खोलें
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {apps.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">अभी तक कोई ऐप डिप्लॉय नहीं किया गया</p>
            <p className="text-sm text-gray-400">ऊपर से एक नया ऐप बनाएं</p>
          </div>
        )}
      </div>

      {/* Features Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-blue-50 rounded-xl p-4">
          <FileCode className="w-8 h-8 text-blue-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">React + TypeScript</h4>
          <p className="text-sm text-gray-600">आधुनिक वेब तकनीकों के साथ ऐप बनाएं</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <Database className="w-8 h-8 text-green-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">फ्री होस्टिंग</h4>
          <p className="text-sm text-gray-600">सभी ऐप्स पर मुफ्त पब्लिक URL</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <Settings className="w-8 h-8 text-purple-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-1">आसान प्रबंधन</h4>
          <p className="text-sm text-gray-600">एक क्लिक में ऐप बनाएं और हटाएं</p>
        </div>
      </div>
    </div>
  );
}
