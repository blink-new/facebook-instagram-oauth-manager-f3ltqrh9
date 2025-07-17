import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Copy, Check, Download, Facebook, Instagram, Code2, Smartphone, Globe } from 'lucide-react'
import { toast } from 'sonner'

const CODE_TEMPLATES = {
  javascript: {
    facebook: `// Facebook OAuth Integration
const facebookAuth = {
  appId: 'YOUR_FACEBOOK_APP_ID',
  redirectUri: 'https://yourapp.com/auth/facebook/callback',
  scopes: ['email', 'public_profile'],
  
  // Initialize Facebook SDK
  init() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: facebookAuth.appId,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
    };
  },
  
  // Start OAuth flow
  login() {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome! Fetching your information...');
        facebookAuth.getUserInfo();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: facebookAuth.scopes.join(',') });
  },
  
  // Get user information
  getUserInfo() {
    FB.api('/me', { fields: 'name,email,picture' }, function(response) {
      console.log('User info:', response);
      // Handle user data here
    });
  }
};

// Initialize on page load
facebookAuth.init();`,
    instagram: `// Instagram OAuth Integration - Based on Instagram Login Flow
const instagramAuth = {
  appId: 'YOUR_INSTAGRAM_APP_ID',
  redirectUri: 'https://yourapp.com/auth/instagram/callback',
  scopes: ['user_profile', 'user_media'],
  
  // Generate OAuth URL (like instagram.com/accounts/login/?force_authentication&platform_app_id=...)
  getAuthUrl() {
    const params = new URLSearchParams({
      client_id: this.appId,
      redirect_uri: this.redirectUri,
      scope: this.scopes.join(','),
      response_type: 'code',
      state: 'csrf_token_' + Math.random().toString(36).substring(7)
    });
    
    return \`https://api.instagram.com/oauth/authorize?\${params.toString()}\`;
  },
  
  // Start OAuth flow - opens Instagram login page
  login() {
    const authUrl = this.getAuthUrl();
    // Option 1: Redirect current window
    window.location.href = authUrl;
    
    // Option 2: Open popup window (better UX)
    // const popup = window.open(authUrl, 'instagram-oauth', 'width=600,height=700');
    // this.handlePopupCallback(popup);
  },
  
  // Handle popup callback (alternative to redirect)
  handlePopupCallback(popup) {
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        // Check if user completed auth (you'd implement this based on your backend)
        this.checkAuthStatus();
      }
    }, 1000);
  },
  
  // Exchange code for access token (server-side recommended)
  async exchangeCodeForToken(code) {
    try {
      // This should be done on your backend for security
      const response = await fetch('/api/instagram/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: code,
          redirect_uri: this.redirectUri 
        })
      });
      
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('instagram_token', data.access_token);
        return data.access_token;
      }
      throw new Error('Token exchange failed');
    } catch (error) {
      console.error('Instagram OAuth error:', error);
      throw error;
    }
  },
  
  // Get user profile data
  async getUserProfile(accessToken) {
    const response = await fetch(\`https://graph.instagram.com/me?fields=id,username,media_count&access_token=\${accessToken}\`);
    return await response.json();
  }
};

// Usage example:
// instagramAuth.login(); // Redirects to Instagram login page like in your screenshot`
  },
  react: {
    facebook: `import React, { useEffect, useState } from 'react';

const FacebookAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';
  const REDIRECT_URI = 'https://yourapp.com/auth/facebook/callback';
  const SCOPES = ['email', 'public_profile'];
  
  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
      
      // Check login status
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          getUserInfo();
        }
      });
    };
    
    // Load Facebook SDK
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);
  
  const handleLogin = () => {
    setIsLoading(true);
    window.FB.login((response) => {
      if (response.authResponse) {
        getUserInfo();
      } else {
        setIsLoading(false);
        console.log('User cancelled login');
      }
    }, { scope: SCOPES.join(',') });
  };
  
  const getUserInfo = () => {
    window.FB.api('/me', { fields: 'name,email,picture' }, (response) => {
      setUser(response);
      setIsLoading(false);
    });
  };
  
  const handleLogout = () => {
    window.FB.logout(() => {
      setUser(null);
    });
  };
  
  return (
    <div className="facebook-auth">
      {user ? (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <img src={user.picture.data.url} alt="Profile" />
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login with Facebook'}
        </button>
      )}
    </div>
  );
};

export default FacebookAuth;`,
    instagram: `import React, { useState, useEffect } from 'react';

const InstagramAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const INSTAGRAM_APP_ID = 'YOUR_INSTAGRAM_APP_ID';
  const REDIRECT_URI = 'https://yourapp.com/auth/instagram/callback';
  const SCOPES = ['user_profile', 'user_media'];
  
  useEffect(() => {
    // Check for authorization code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);
  
  const getAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: INSTAGRAM_APP_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES.join(','),
      response_type: 'code'
    });
    
    return \`https://api.instagram.com/oauth/authorize?\${params.toString()}\`;
  };
  
  const handleLogin = () => {
    const authUrl = getAuthUrl();
    window.location.href = authUrl;
  };
  
  const exchangeCodeForToken = async (code) => {
    setIsLoading(true);
    try {
      // This should be done on your backend for security
      const response = await fetch('/api/instagram/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      if (data.access_token) {
        getUserInfo(data.access_token);
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      setIsLoading(false);
    }
  };
  
  const getUserInfo = async (accessToken) => {
    try {
      const response = await fetch(\`https://graph.instagram.com/me?fields=id,username,media_count&access_token=\${accessToken}\`);
      const userData = await response.json();
      setUser(userData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="instagram-auth">
      {user ? (
        <div>
          <h3>Welcome, {user.username}!</h3>
          <p>Media Count: {user.media_count}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login with Instagram'}
        </button>
      )}
    </div>
  );
};

export default InstagramAuth;`
  },
  nodejs: {
    facebook: `const express = require('express');
const axios = require('axios');
const app = express();

const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';
const FACEBOOK_APP_SECRET = 'YOUR_FACEBOOK_APP_SECRET';
const REDIRECT_URI = 'https://yourapp.com/auth/facebook/callback';

// Facebook OAuth callback
app.get('/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: FACEBOOK_APP_ID,
        client_secret: FACEBOOK_APP_SECRET,
        redirect_uri: REDIRECT_URI,
        code: code
      }
    });
    
    const { access_token } = tokenResponse.data;
    
    // Get user information
    const userResponse = await axios.get('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name,email,picture',
        access_token: access_token
      }
    });
    
    const user = userResponse.data;
    
    // Store user data and access token securely
    // Implementation depends on your database/session management
    
    res.json({
      success: true,
      user: user,
      access_token: access_token
    });
    
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    res.status(500).json({ error: 'OAuth authentication failed' });
  }
});

// Generate Facebook OAuth URL
app.get('/auth/facebook/url', (req, res) => {
  const params = new URLSearchParams({
    client_id: FACEBOOK_APP_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'email,public_profile',
    response_type: 'code'
  });
  
  const authUrl = \`https://www.facebook.com/v18.0/dialog/oauth?\${params.toString()}\`;
  res.json({ authUrl });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    instagram: `const express = require('express');
const axios = require('axios');
const app = express();

const INSTAGRAM_APP_ID = 'YOUR_INSTAGRAM_APP_ID';
const INSTAGRAM_APP_SECRET = 'YOUR_INSTAGRAM_APP_SECRET';
const REDIRECT_URI = 'https://yourapp.com/auth/instagram/callback';

// Instagram OAuth callback
app.get('/auth/instagram/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: INSTAGRAM_APP_ID,
      client_secret: INSTAGRAM_APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code: code
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    const { access_token, user_id } = tokenResponse.data;
    
    // Get user information
    const userResponse = await axios.get(\`https://graph.instagram.com/\${user_id}\`, {
      params: {
        fields: 'id,username,media_count',
        access_token: access_token
      }
    });
    
    const user = userResponse.data;
    
    // Store user data and access token securely
    // Implementation depends on your database/session management
    
    res.json({
      success: true,
      user: user,
      access_token: access_token
    });
    
  } catch (error) {
    console.error('Instagram OAuth error:', error);
    res.status(500).json({ error: 'OAuth authentication failed' });
  }
});

// Generate Instagram OAuth URL
app.get('/auth/instagram/url', (req, res) => {
  const params = new URLSearchParams({
    client_id: INSTAGRAM_APP_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'user_profile,user_media',
    response_type: 'code'
  });
  
  const authUrl = \`https://api.instagram.com/oauth/authorize?\${params.toString()}\`;
  res.json({ authUrl });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
  }
};

export function CodeGenerator() {
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'react' | 'nodejs'>('javascript')
  const [selectedPlatform, setSelectedPlatform] = useState<'facebook' | 'instagram'>('facebook')
  const [copied, setCopied] = useState(false)

  const currentCode = CODE_TEMPLATES[selectedLanguage][selectedPlatform]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCode)
    setCopied(true)
    toast.success('Code copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    const filename = `${selectedPlatform}-oauth-${selectedLanguage}.${selectedLanguage === 'nodejs' ? 'js' : selectedLanguage === 'react' ? 'jsx' : 'js'}`
    const element = document.createElement('a')
    const file = new Blob([currentCode], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Code downloaded!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Code Generator</h2>
          <p className="text-gray-600">Generate OAuth integration code for your applications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configuration</CardTitle>
            <CardDescription>Select your platform and language</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={selectedPlatform === 'facebook' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform('facebook')}
                  className={selectedPlatform === 'facebook' ? 'facebook-gradient text-white' : ''}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant={selectedPlatform === 'instagram' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform('instagram')}
                  className={selectedPlatform === 'instagram' ? 'instagram-gradient text-white' : ''}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Language/Framework</label>
              <Select value={selectedLanguage} onValueChange={(value: any) => setSelectedLanguage(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Vanilla JavaScript
                    </div>
                  </SelectItem>
                  <SelectItem value="react">
                    <div className="flex items-center">
                      <Code2 className="w-4 h-4 mr-2" />
                      React
                    </div>
                  </SelectItem>
                  <SelectItem value="nodejs">
                    <div className="flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Node.js
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 space-y-2">
              <Button onClick={copyToClipboard} className="w-full" variant="outline">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
              <Button onClick={downloadCode} className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    {selectedPlatform === 'facebook' ? (
                      <Facebook className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Instagram className="w-5 h-5 text-pink-600" />
                    )}
                    <span>{selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} OAuth</span>
                  </CardTitle>
                  <CardDescription>
                    {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} implementation
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline">{selectedLanguage}</Badge>
                  <Badge variant="outline" className={selectedPlatform === 'facebook' ? 'text-blue-600' : 'text-pink-600'}>
                    {selectedPlatform}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  value={currentCode}
                  readOnly
                  className="min-h-[500px] font-mono text-sm bg-gray-50 border-gray-200"
                />
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Notes</CardTitle>
          <CardDescription>Important considerations for your OAuth integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Security Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Never expose App Secret in client-side code</li>
                <li>• Always validate redirect URIs</li>
                <li>• Use HTTPS for all OAuth endpoints</li>
                <li>• Implement proper CSRF protection</li>
                <li>• Store access tokens securely</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Integration Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Test with development apps first</li>
                <li>• Handle OAuth errors gracefully</li>
                <li>• Implement token refresh logic</li>
                <li>• Add proper loading states</li>
                <li>• Follow platform-specific guidelines</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}