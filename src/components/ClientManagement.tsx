import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Plus, MoreHorizontal, Edit, Trash2, Eye, Facebook, Instagram, Globe, Calendar, Users } from 'lucide-react'
import { toast } from 'sonner'

interface Client {
  id: string
  name: string
  domain: string
  platforms: ('facebook' | 'instagram')[]
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  lastActivity: string
  oauthFlows: number
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'E-commerce Store',
    domain: 'shop.example.com',
    platforms: ['facebook', 'instagram'],
    status: 'active',
    createdAt: '2024-01-15',
    lastActivity: '2024-01-20',
    oauthFlows: 1234
  },
  {
    id: '2',
    name: 'Marketing Agency',
    domain: 'agency.marketing.com',
    platforms: ['facebook'],
    status: 'active',
    createdAt: '2024-01-10',
    lastActivity: '2024-01-19',
    oauthFlows: 856
  },
  {
    id: '3',
    name: 'Social Media App',
    domain: 'socialapp.io',
    platforms: ['instagram'],
    status: 'pending',
    createdAt: '2024-01-18',
    lastActivity: '2024-01-18',
    oauthFlows: 0
  },
  {
    id: '4',
    name: 'Content Creator Platform',
    domain: 'creators.platform.com',
    platforms: ['facebook', 'instagram'],
    status: 'inactive',
    createdAt: '2024-01-05',
    lastActivity: '2024-01-12',
    oauthFlows: 2341
  }
]

export function ClientManagement() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newClient, setNewClient] = useState({
    name: '',
    domain: '',
    platforms: [] as ('facebook' | 'instagram')[]
  })

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddClient = () => {
    if (!newClient.name || !newClient.domain) {
      toast.error('Please fill in all required fields')
      return
    }

    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      domain: newClient.domain,
      platforms: newClient.platforms,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      oauthFlows: 0
    }

    setClients(prev => [client, ...prev])
    setNewClient({ name: '', domain: '', platforms: [] })
    setIsAddDialogOpen(false)
    toast.success('Client added successfully!')
  }

  const handleDeleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id))
    toast.success('Client deleted successfully!')
  }

  const handleStatusChange = (id: string, newStatus: Client['status']) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, status: newStatus } : client
    ))
    toast.success('Client status updated!')
  }

  const togglePlatform = (platform: 'facebook' | 'instagram') => {
    setNewClient(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600">Manage OAuth clients and their configurations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="facebook-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Create a new OAuth client configuration
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name *</Label>
                <Input
                  id="client-name"
                  placeholder="Enter client name"
                  value={newClient.name}
                  onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-domain">Domain *</Label>
                <Input
                  id="client-domain"
                  placeholder="example.com"
                  value={newClient.domain}
                  onChange={(e) => setNewClient(prev => ({ ...prev, domain: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Platforms</Label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={newClient.platforms.includes('facebook') ? 'default' : 'outline'}
                    onClick={() => togglePlatform('facebook')}
                    className={newClient.platforms.includes('facebook') ? 'facebook-gradient text-white' : ''}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    type="button"
                    variant={newClient.platforms.includes('instagram') ? 'default' : 'outline'}
                    onClick={() => togglePlatform('instagram')}
                    className={newClient.platforms.includes('instagram') ? 'instagram-gradient text-white' : ''}
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClient}>
                  Add Client
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Active integrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter(c => c.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter(c => c.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">Awaiting setup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total OAuth Flows</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.reduce((sum, c) => sum + c.oauthFlows, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
          <CardDescription>Manage your OAuth client configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>OAuth Flows</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Globe className="w-3 h-3 mr-1" />
                        {client.domain}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {client.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform === 'facebook' ? (
                            <Facebook className="w-3 h-3 mr-1 text-blue-600" />
                          ) : (
                            <Instagram className="w-3 h-3 mr-1 text-pink-600" />
                          )}
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {client.oauthFlows.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(client.lastActivity).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Configuration
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(client.id, client.status === 'active' ? 'inactive' : 'active')}
                        >
                          {client.status === 'active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}