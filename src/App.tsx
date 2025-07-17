import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { OAuthConfiguration } from './components/OAuthConfiguration'
import { ClientManagement } from './components/ClientManagement'
import { CodeGenerator } from './components/CodeGenerator'
import { Documentation } from './components/Documentation'
import { 
  Facebook, 
  Instagram, 
  Settings, 
  Users, 
  Code, 
  BookOpen, 
  Shield, 
  Zap,
  Globe,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = {
    totalClients: 12,
    activeConfigs: 8,
    oauthFlows: 15420,
    uptime: '99.9%'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">OAuth Manager</h1>
                  <p className="text-xs text-gray-500">Facebook & Instagram</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                System Healthy
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="oauth" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>OAuth Config</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Clients</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Code Gen</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Docs</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-600">Monitor your OAuth integrations and client activity</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Clients</CardTitle>
                  <Users className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalClients}</div>
                  <p className="text-xs opacity-80">+2 from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Active Configs</CardTitle>
                  <CheckCircle className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.activeConfigs}</div>
                  <p className="text-xs opacity-80">Running smoothly</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">OAuth Flows</CardTitle>
                  <Globe className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.oauthFlows.toLocaleString()}</div>
                  <p className="text-xs opacity-80">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Uptime</CardTitle>
                  <Zap className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.uptime}</div>
                  <p className="text-xs opacity-80">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span>Facebook Integration</span>
                  </CardTitle>
                  <CardDescription>Facebook Login and Graph API status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Status</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Apps</span>
                    <span className="text-sm text-gray-600">6 configured</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-sm text-gray-600">98.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <span>Instagram Integration</span>
                  </CardTitle>
                  <CardDescription>Instagram Basic Display API status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Status</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Apps</span>
                    <span className="text-sm text-gray-600">4 configured</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-sm text-gray-600">97.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-600 h-2 rounded-full" style={{ width: '97.2%' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={() => setActiveTab('oauth')}
                  >
                    <Settings className="w-6 h-6" />
                    <span>Configure OAuth</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={() => setActiveTab('clients')}
                  >
                    <Users className="w-6 h-6" />
                    <span>Manage Clients</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={() => setActiveTab('code')}
                  >
                    <Code className="w-6 h-6" />
                    <span>Generate Code</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest OAuth flows and client updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Facebook OAuth successful</p>
                      <p className="text-xs text-gray-500">E-commerce Store • 2 minutes ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Success</Badge>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-pink-50 rounded-lg">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Instagram OAuth successful</p>
                      <p className="text-xs text-gray-500">Social Media App • 5 minutes ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Success</Badge>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New client configuration pending</p>
                      <p className="text-xs text-gray-500">Content Creator Platform • 10 minutes ago</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* OAuth Configuration Tab */}
          <TabsContent value="oauth">
            <OAuthConfiguration />
          </TabsContent>

          {/* Client Management Tab */}
          <TabsContent value="clients">
            <ClientManagement />
          </TabsContent>

          {/* Code Generator Tab */}
          <TabsContent value="code">
            <CodeGenerator />
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs">
            <Documentation />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App