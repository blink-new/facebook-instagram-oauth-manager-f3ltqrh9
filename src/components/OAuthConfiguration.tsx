import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Checkbox } from './ui/checkbox'
import { Facebook, Instagram, Copy, Check, ExternalLink, AlertCircle, Shield } from 'lucide-react'
import { toast } from 'sonner'
import { OAuthDemo } from './OAuthDemo'

interface OAuthConfig {
  platform: 'facebook' | 'instagram'
  appId: string
  appSecret: string
  redirectUri: string
  scopes: string[]
  isActive: boolean
}

const FACEBOOK_SCOPES = [
  { id: 'email', label: 'Email', description: 'Access user email address' },
  { id: 'public_profile', label: 'Public Profile', description: 'Access basic profile info' },
  { id: 'user_friends', label: 'Friends List', description: 'Access friends list' },
  { id: 'user_posts', label: 'Posts', description: 'Access user posts' },
  { id: 'pages_read_engagement', label: 'Page Engagement', description: 'Read page engagement data' },
  { id: 'pages_manage_posts', label: 'Manage Posts', description: 'Create and manage page posts' }
]

const INSTAGRAM_SCOPES = [
  { id: 'user_profile', label: 'User Profile', description: 'Access basic profile information' },
  { id: 'user_media', label: 'User Media', description: 'Access user media (photos/videos)' },
  { id: 'instagram_basic', label: 'Instagram Basic', description: 'Basic Instagram access' },
  { id: 'instagram_manage_insights', label: 'Insights', description: 'Access Instagram insights' }
]

export function OAuthConfiguration() {
  const [activeTab, setActiveTab] = useState<'facebook' | 'instagram'>('facebook')
  const [configs, setConfigs] = useState<Record<string, OAuthConfig>>({
    facebook: {
      platform: 'facebook',
      appId: '',
      appSecret: '',
      redirectUri: 'https://yourapp.com/auth/facebook/callback',
      scopes: ['email', 'public_profile'],
      isActive: false
    },
    instagram: {
      platform: 'instagram',
      appId: '',
      appSecret: '',
      redirectUri: 'https://yourapp.com/auth/instagram/callback',
      scopes: ['user_profile', 'user_media'],
      isActive: false
    }
  })

  const [copied, setCopied] = useState<string | null>(null)

  const updateConfig = (platform: 'facebook' | 'instagram', updates: Partial<OAuthConfig>) => {
    setConfigs(prev => ({
      ...prev,
      [platform]: { ...prev[platform], ...updates }
    }))
  }

  const handleScopeChange = (platform: 'facebook' | 'instagram', scopeId: string, checked: boolean) => {
    const currentScopes = configs[platform].scopes
    const newScopes = checked 
      ? [...currentScopes, scopeId]
      : currentScopes.filter(s => s !== scopeId)
    
    updateConfig(platform, { scopes: newScopes })
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(null), 2000)
  }

  const testOAuthFlow = (platform: 'facebook' | 'instagram') => {
    const config = configs[platform]
    if (!config.appId) {
      toast.error('Please enter App ID first')
      return
    }
    
    const baseUrl = platform === 'facebook' 
      ? 'https://www.facebook.com/v18.0/dialog/oauth'
      : 'https://api.instagram.com/oauth/authorize'
    
    const params = new URLSearchParams({
      client_id: config.appId,
      redirect_uri: config.redirectUri,
      scope: config.scopes.join(','),
      response_type: 'code'
    })

    window.open(`${baseUrl}?${params.toString()}`, '_blank', 'width=600,height=600')
    toast.success('OAuth test window opened')
  }

  const saveConfiguration = (platform: 'facebook' | 'instagram') => {
    const config = configs[platform]
    if (!config.appId || !config.appSecret) {
      toast.error('Please fill in all required fields')
      return
    }
    
    updateConfig(platform, { isActive: true })
    toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} OAuth configured successfully!`)
  }

  const currentConfig = configs[activeTab]
  const scopes = activeTab === 'facebook' ? FACEBOOK_SCOPES : INSTAGRAM_SCOPES

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">OAuth Configuration</h2>
          <p className="text-gray-600">Set up Facebook and Instagram OAuth authentication</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'facebook' | 'instagram')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="facebook" className="flex items-center space-x-2">
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
            {configs.facebook.isActive && <Badge className="ml-2 bg-green-100 text-green-800">Active</Badge>}
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center space-x-2">
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
            {configs.instagram.isActive && <Badge className="ml-2 bg-green-100 text-green-800">Active</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="facebook" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Facebook className="w-5 h-5 text-blue-600" />
                <span>Facebook OAuth Setup</span>
              </CardTitle>
              <CardDescription>
                Configure Facebook Login for your application using Facebook Graph API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fb-app-id">App ID *</Label>
                  <Input
                    id="fb-app-id"
                    placeholder="Enter your Facebook App ID"
                    value={currentConfig.appId}
                    onChange={(e) => updateConfig('facebook', { appId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fb-app-secret">App Secret *</Label>
                  <Input
                    id="fb-app-secret"
                    type="password"
                    placeholder="Enter your Facebook App Secret"
                    value={currentConfig.appSecret}
                    onChange={(e) => updateConfig('facebook', { appSecret: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fb-redirect">Redirect URI</Label>
                <div className="flex space-x-2">
                  <Input
                    id="fb-redirect"
                    placeholder="https://yourapp.com/auth/facebook/callback"
                    value={currentConfig.redirectUri}
                    onChange={(e) => updateConfig('facebook', { redirectUri: e.target.value })}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(currentConfig.redirectUri, 'fb-redirect')}
                  >
                    {copied === 'fb-redirect' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Permissions & Scopes</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scopes.map((scope) => (
                    <div key={scope.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={scope.id}
                        checked={currentConfig.scopes.includes(scope.id)}
                        onCheckedChange={(checked) => handleScopeChange('facebook', scope.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={scope.id} className="font-medium">{scope.label}</Label>
                        <p className="text-sm text-gray-500">{scope.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">OAuth Status</p>
                    <p className="text-sm text-blue-600">
                      {currentConfig.isActive ? 'Configuration active and ready' : 'Configuration pending'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={currentConfig.isActive}
                  onCheckedChange={(checked) => updateConfig('facebook', { isActive: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button onClick={() => saveConfiguration('facebook')} className="facebook-gradient text-white">
                  Save Configuration
                </Button>
                <Button variant="outline" onClick={() => testOAuthFlow('facebook')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test OAuth Flow
                </Button>
                <OAuthDemo 
                  platform="facebook"
                  appId={currentConfig.appId}
                  redirectUri={currentConfig.redirectUri}
                  scopes={currentConfig.scopes}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Instagram className="w-5 h-5 text-pink-600" />
                <span>Instagram OAuth Setup</span>
              </CardTitle>
              <CardDescription>
                Configure Instagram Basic Display API for your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ig-app-id">App ID *</Label>
                  <Input
                    id="ig-app-id"
                    placeholder="Enter your Instagram App ID"
                    value={currentConfig.appId}
                    onChange={(e) => updateConfig('instagram', { appId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ig-app-secret">App Secret *</Label>
                  <Input
                    id="ig-app-secret"
                    type="password"
                    placeholder="Enter your Instagram App Secret"
                    value={currentConfig.appSecret}
                    onChange={(e) => updateConfig('instagram', { appSecret: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ig-redirect">Redirect URI</Label>
                <div className="flex space-x-2">
                  <Input
                    id="ig-redirect"
                    placeholder="https://yourapp.com/auth/instagram/callback"
                    value={currentConfig.redirectUri}
                    onChange={(e) => updateConfig('instagram', { redirectUri: e.target.value })}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(currentConfig.redirectUri, 'ig-redirect')}
                  >
                    {copied === 'ig-redirect' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Permissions & Scopes</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scopes.map((scope) => (
                    <div key={scope.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={scope.id}
                        checked={currentConfig.scopes.includes(scope.id)}
                        onCheckedChange={(checked) => handleScopeChange('instagram', scope.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={scope.id} className="font-medium">{scope.label}</Label>
                        <p className="text-sm text-gray-500">{scope.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-pink-600" />
                  <div>
                    <p className="font-medium text-pink-900">OAuth Status</p>
                    <p className="text-sm text-pink-600">
                      {currentConfig.isActive ? 'Configuration active and ready' : 'Configuration pending'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={currentConfig.isActive}
                  onCheckedChange={(checked) => updateConfig('instagram', { isActive: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button onClick={() => saveConfiguration('instagram')} className="instagram-gradient text-white">
                  Save Configuration
                </Button>
                <Button variant="outline" onClick={() => testOAuthFlow('instagram')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test OAuth Flow
                </Button>
                <OAuthDemo 
                  platform="instagram"
                  appId={currentConfig.appId}
                  redirectUri={currentConfig.redirectUri}
                  scopes={currentConfig.scopes}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>Important Setup Notes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-blue-900">Facebook Setup</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Create app at developers.facebook.com</li>
                <li>• Add Facebook Login product</li>
                <li>• Configure Valid OAuth Redirect URIs</li>
                <li>• Enable required permissions in App Review</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-pink-900">Instagram Setup</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Create app at developers.facebook.com</li>
                <li>• Add Instagram Basic Display product</li>
                <li>• Configure Valid OAuth Redirect URIs</li>
                <li>• Add Instagram Test Users</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}