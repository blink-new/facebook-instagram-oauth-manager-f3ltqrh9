import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Facebook, Instagram, ExternalLink, CheckCircle, AlertCircle, Play, X } from 'lucide-react'
import { toast } from 'sonner'

interface OAuthDemoProps {
  platform: 'facebook' | 'instagram'
  appId: string
  redirectUri: string
  scopes: string[]
}

export function OAuthDemo({ platform, appId, redirectUri, scopes }: OAuthDemoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    {
      id: 1,
      title: 'User clicks "Login"',
      description: 'User initiates OAuth flow from your application'
    },
    {
      id: 2,
      title: 'Redirect to Platform',
      description: `User is redirected to ${platform} authorization page`
    },
    {
      id: 3,
      title: 'User Authorization',
      description: 'User reviews and grants permissions'
    },
    {
      id: 4,
      title: 'Authorization Code',
      description: 'Platform redirects back with authorization code'
    },
    {
      id: 5,
      title: 'Exchange for Token',
      description: 'Your server exchanges code for access token'
    },
    {
      id: 6,
      title: 'Access User Data',
      description: 'Use access token to fetch user information'
    }
  ]

  const generateAuthUrl = () => {
    const baseUrl = platform === 'facebook' 
      ? 'https://www.facebook.com/v18.0/dialog/oauth'
      : 'https://api.instagram.com/oauth/authorize'
    
    const params = new URLSearchParams({
      client_id: appId || 'YOUR_APP_ID',
      redirect_uri: redirectUri,
      scope: scopes.join(','),
      response_type: 'code',
      state: 'demo_state_' + Date.now()
    })

    return `${baseUrl}?${params.toString()}`
  }

  const startDemo = () => {
    if (!appId) {
      toast.error('Please configure your App ID first')
      return
    }
    
    setIsOpen(true)
    setCurrentStep(1)
    simulateOAuthFlow()
  }

  const simulateOAuthFlow = async () => {
    for (let step = 1; step <= 6; step++) {
      setCurrentStep(step)
      setIsLoading(step === 2 || step === 5)
      
      if (step === 2) {
        // Simulate redirect delay
        await new Promise(resolve => setTimeout(resolve, 1500))
      } else if (step === 5) {
        // Simulate token exchange
        await new Promise(resolve => setTimeout(resolve, 2000))
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      setIsLoading(false)
    }
    
    toast.success('OAuth flow completed successfully!')
  }

  const openRealOAuth = () => {
    const authUrl = generateAuthUrl()
    window.open(authUrl, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes')
    toast.success('OAuth window opened - check the new tab!')
  }

  return (
    <>
      <Button 
        onClick={startDemo}
        variant="outline" 
        className="w-full"
      >
        <Play className="w-4 h-4 mr-2" />
        Demo OAuth Flow
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {platform === 'facebook' ? (
                <Facebook className="w-5 h-5 text-blue-600" />
              ) : (
                <Instagram className="w-5 h-5 text-pink-600" />
              )}
              <span>{platform.charAt(0).toUpperCase() + platform.slice(1)} OAuth Flow Demo</span>
            </DialogTitle>
            <DialogDescription>
              Interactive demonstration of the OAuth authentication process
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {steps.map((step) => (
                <Card 
                  key={step.id} 
                  className={`transition-all duration-300 ${
                    currentStep === step.id 
                      ? platform === 'facebook' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-pink-500 bg-pink-50'
                      : currentStep > step.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep === step.id
                          ? platform === 'facebook'
                            ? 'bg-blue-500 text-white'
                            : 'bg-pink-500 text-white'
                          : currentStep > step.id
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        {currentStep > step.id ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{step.title}</h4>
                        <p className="text-xs text-gray-500">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Current Step Details */}
            <Card className="oauth-demo-window">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Step {currentStep}: {steps[currentStep - 1]?.title}</span>
                  {isLoading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">User clicks the login button in your application:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Button 
                        className={platform === 'facebook' ? 'facebook-gradient text-white' : 'instagram-gradient text-white'}
                        disabled
                      >
                        {platform === 'facebook' ? (
                          <Facebook className="w-4 h-4 mr-2" />
                        ) : (
                          <Instagram className="w-4 h-4 mr-2" />
                        )}
                        Continue with {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Your application redirects to {platform} authorization URL:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm break-all">
                        {generateAuthUrl()}
                      </code>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={openRealOAuth} size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Real OAuth
                      </Button>
                      <Badge variant="outline">Live Demo Available</Badge>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">User sees the authorization screen and grants permissions:</p>
                    <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="text-center space-y-4">
                        {platform === 'facebook' ? (
                          <Facebook className="w-12 h-12 text-blue-600 mx-auto" />
                        ) : (
                          <Instagram className="w-12 h-12 text-pink-600 mx-auto" />
                        )}
                        <div>
                          <h3 className="font-medium">Your App wants to access your {platform} account</h3>
                          <p className="text-sm text-gray-500 mt-2">Permissions requested:</p>
                          <div className="flex flex-wrap gap-2 mt-2 justify-center">
                            {scopes.map(scope => (
                              <Badge key={scope} variant="outline" className="text-xs">
                                {scope.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2 justify-center">
                          <Button size="sm" variant="outline">Cancel</Button>
                          <Button size="sm" className={platform === 'facebook' ? 'facebook-gradient text-white' : 'instagram-gradient text-white'}>
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">{platform} redirects back to your app with authorization code:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm break-all">
                        {redirectUri}?code=AQD8H7xK9mF2nP5qR8sT3vW6xY9zA2bC4dE7fG0hI1jK3lM5nO8pQ2rS4tU6vX8yZ&state=demo_state_123456789
                      </code>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Authorization code received successfully</span>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Your server exchanges the authorization code for an access token:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">POST Request:</div>
                        <code className="text-xs block">
                          {platform === 'facebook' 
                            ? 'https://graph.facebook.com/v18.0/oauth/access_token'
                            : 'https://api.instagram.com/oauth/access_token'
                          }
                        </code>
                        <div className="text-sm font-medium mt-3">Response:</div>
                        <code className="text-xs block">
                          {JSON.stringify({
                            access_token: 'EAABwzLixnjYBAO7ZCjVZCxK9mF2nP5qR8sT3vW6xY9zA2bC4dE7fG0hI1jK3lM5nO8pQ2rS4tU6vX8yZ',
                            token_type: 'bearer',
                            expires_in: platform === 'facebook' ? 5184000 : 3600
                          }, null, 2)}
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Use the access token to fetch user information:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">API Request:</div>
                        <code className="text-xs block">
                          {platform === 'facebook' 
                            ? 'GET https://graph.facebook.com/me?fields=id,name,email,picture'
                            : 'GET https://graph.instagram.com/me?fields=id,username,media_count'
                          }
                        </code>
                        <div className="text-sm font-medium mt-3">User Data:</div>
                        <code className="text-xs block">
                          {JSON.stringify(platform === 'facebook' ? {
                            id: '123456789',
                            name: 'John Doe',
                            email: 'john@example.com',
                            picture: {
                              data: {
                                url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=123456789'
                              }
                            }
                          } : {
                            id: '987654321',
                            username: 'johndoe_insta',
                            media_count: 42
                          }, null, 2)}
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">OAuth flow completed successfully!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Close Demo
              </Button>
              <div className="space-x-2">
                <Button onClick={openRealOAuth} variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Try Real OAuth
                </Button>
                <Button onClick={() => { setCurrentStep(1); simulateOAuthFlow() }}>
                  <Play className="w-4 h-4 mr-2" />
                  Restart Demo
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}