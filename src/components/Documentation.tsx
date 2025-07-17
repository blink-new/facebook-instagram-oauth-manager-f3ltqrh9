import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { ExternalLink, Facebook, Instagram, Shield, Code, Zap, AlertTriangle, CheckCircle } from 'lucide-react'
import { InstagramLoginPreview } from './InstagramLoginPreview'

export function Documentation() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documentation</h2>
          <p className="text-gray-600">Complete guide to Facebook and Instagram OAuth integration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>Facebook OAuth</span>
            </CardTitle>
            <CardDescription>Complete Facebook Login integration guide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge className="bg-blue-100 text-blue-800">Graph API v18.0</Badge>
              <p className="text-sm text-gray-600">
                Integrate Facebook Login to allow users to authenticate with their Facebook accounts.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Facebook Docs
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Instagram className="w-5 h-5 text-pink-600" />
              <span>Instagram OAuth</span>
            </CardTitle>
            <CardDescription>Instagram Basic Display API integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge className="bg-pink-100 text-pink-800">Basic Display API</Badge>
              <p className="text-sm text-gray-600">
                Access Instagram user profiles and media through the Basic Display API.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Instagram Docs
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Security Guide</span>
            </CardTitle>
            <CardDescription>Best practices for secure OAuth implementation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge className="bg-green-100 text-green-800">Security</Badge>
              <p className="text-sm text-gray-600">
                Learn how to implement OAuth securely and protect user data.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Security Guide
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>Get up and running in minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h4 className="font-medium">Create Developer Account</h4>
                  <p className="text-sm text-gray-600">Sign up at developers.facebook.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h4 className="font-medium">Create App</h4>
                  <p className="text-sm text-gray-600">Set up your Facebook/Instagram app</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h4 className="font-medium">Configure OAuth</h4>
                  <p className="text-sm text-gray-600">Add products and configure settings</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">4</div>
                <div>
                  <h4 className="font-medium">Integrate Code</h4>
                  <p className="text-sm text-gray-600">Use our code generator for implementation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
            <CardDescription>Solutions to frequent problems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Invalid Redirect URI</h4>
                  <p className="text-sm text-gray-600">Ensure redirect URIs match exactly in app settings</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">App Not Live</h4>
                  <p className="text-sm text-gray-600">Submit app for review to access all permissions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">CORS Errors</h4>
                  <p className="text-sm text-gray-600">Configure allowed domains in app settings</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions and detailed answers</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I get Facebook App ID and Secret?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p>To get your Facebook App ID and Secret:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to <a href="https://developers.facebook.com" className="text-blue-600 hover:underline">developers.facebook.com</a></li>
                    <li>Click "My Apps" and then "Create App"</li>
                    <li>Choose "Consumer" as the app type</li>
                    <li>Fill in your app details and create the app</li>
                    <li>In the app dashboard, you'll find your App ID</li>
                    <li>Click "Show" next to App Secret to reveal it</li>
                  </ol>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Important:</strong> Never expose your App Secret in client-side code. Keep it secure on your server.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What permissions do I need for Instagram?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p>Instagram Basic Display API provides these permissions:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>instagram_graph_user_profile:</strong> Read user profile info</li>
                    <li><strong>instagram_graph_user_media:</strong> Read user media</li>
                  </ul>
                  <p className="text-sm">For business features, you'll need Instagram Business API with additional permissions like:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>instagram_manage_insights</li>
                    <li>instagram_manage_comments</li>
                    <li>pages_read_engagement</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do I handle token expiration?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p>Access tokens have different lifespans:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Facebook:</strong> Short-lived tokens (1 hour) can be exchanged for long-lived tokens (60 days)</li>
                    <li><strong>Instagram:</strong> Tokens expire after 60 days but can be refreshed</li>
                  </ul>
                  <p className="text-sm">Best practices:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Store token expiration time</li>
                    <li>Implement automatic token refresh</li>
                    <li>Handle token refresh failures gracefully</li>
                    <li>Prompt users to re-authenticate when needed</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I use the same app for both Facebook and Instagram?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p>Yes, you can use the same Facebook app for both platforms:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Add both "Facebook Login" and "Instagram Basic Display" products to your app</li>
                    <li>Configure separate redirect URIs for each platform if needed</li>
                    <li>Use the same App ID but different OAuth endpoints</li>
                    <li>Handle different scopes and permissions for each platform</li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> This approach simplifies management and reduces the number of apps you need to maintain.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I test my OAuth integration?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p>Testing your OAuth integration:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Use the "Test OAuth Flow" button in the OAuth Configuration tab</li>
                    <li>Add test users in your Facebook app dashboard</li>
                    <li>Test with different permission combinations</li>
                    <li>Verify error handling for declined permissions</li>
                    <li>Test token refresh and expiration scenarios</li>
                  </ol>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Development Mode:</strong> Your app starts in development mode, allowing only admins, developers, and testers to authenticate.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Code className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Code Examples</h3>
            <p className="text-sm text-gray-600">Ready-to-use code snippets</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Quick Setup</h3>
            <p className="text-sm text-gray-600">Get started in minutes</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Best Practices</h3>
            <p className="text-sm text-gray-600">Security and performance tips</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Instagram className="w-5 h-5 text-pink-600" />
            <span>OAuth Flow Preview</span>
          </CardTitle>
          <CardDescription>See what users experience during Instagram OAuth authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <InstagramLoginPreview />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What happens here:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>User clicks "Login with Instagram" in your app</li>
                  <li>They're redirected to this Instagram login page</li>
                  <li>User enters credentials or uses Facebook login</li>
                  <li>Instagram asks for permission to share data</li>
                  <li>User is redirected back to your app with auth code</li>
                  <li>Your server exchanges code for access token</li>
                </ol>
              </div>
              
              <div className="p-4 bg-pink-50 rounded-lg">
                <h4 className="font-medium text-pink-900 mb-2">Key Features:</h4>
                <ul className="text-sm text-pink-800 space-y-1 list-disc list-inside">
                  <li>Secure OAuth 2.0 flow</li>
                  <li>Facebook login integration</li>
                  <li>Mobile-responsive design</li>
                  <li>Multi-language support</li>
                  <li>CSRF protection with state parameter</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Benefits for your users:</h4>
                <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                  <li>No need to create new accounts</li>
                  <li>Trusted Instagram security</li>
                  <li>Quick one-click authentication</li>
                  <li>Granular permission control</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}