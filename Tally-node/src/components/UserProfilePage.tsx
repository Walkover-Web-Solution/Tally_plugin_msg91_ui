import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Layout } from "./Layout";
import { Copy, CheckCircle, ExternalLink, Settings, Download, Upload, User, Building, Mail, Phone, Edit, Save, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface UserProfilePageProps {
  isLoggedInWithMSG91: boolean;
  onMSG91Login: () => void;
  onUseDefaults?: () => void;
}

export function UserProfilePage({ isLoggedInWithMSG91, onMSG91Login, onUseDefaults }: UserProfilePageProps) {
  const [authKeyCopied, setAuthKeyCopied] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Rajesh Kumar",
    businessName: "Kumar Enterprises Pvt Ltd",
    workEmail: "rajesh@kumarenterprises.com",
    phoneNumber: "+91 9876543210",
    country: "India",
    address: "123 Business Park, Mumbai, Maharashtra 400001"
  });
  const [editedProfile, setEditedProfile] = useState({ ...profileData });
  
  const authorizationKey = "TLY_MSG91_AUTH_KEY_2024_ABC123XYZ789";

  const handleCopyAuthKey = () => {
    navigator.clipboard.writeText(authorizationKey);
    setAuthKeyCopied(true);
    setTimeout(() => setAuthKeyCopied(false), 2000);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setEditedProfile({ ...profileData });
  };

  const handleSaveProfile = () => {
    setProfileData({ ...editedProfile });
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile({ ...profileData });
    setIsEditingProfile(false);
  };

  const tallySteps = [
    {
      step: 1,
      title: "Enable TDL (Tally Developer License)",
      description: "Go to Gateway of Tally → F11 (Features) → Company Features → Enable TDL",
      screenshot: "https://images.unsplash.com/photo-1754548930550-be9fa88874f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGludGVyZmFjZSUyMHNldHVwfGVufDF8fHx8MTc1NjkxMTY1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      step: 2,
      title: "Install MSG91 Plugin",
      description: "Copy the MSG91-Tally plugin files to your Tally installation directory under TDL folder",
      screenshot: "https://images.unsplash.com/photo-1722702012229-10548fd57f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjcmVlbiUyMGNvbmZpZ3VyYXRpb258ZW58MXx8fHwxNzU2OTExNjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      step: 3,
      title: "Configure Authorization Key",
      description: "In Tally, go to MSG91 Plugin Settings and enter the authorization key provided below",
      screenshot: "https://images.unsplash.com/photo-1651218236755-fbd5520a2542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhzb2Z0d2FyZSUyMGluc3RhbGxhdGlvbiUyMHN0ZXBzfGVufDF8fHx8MTc1NjkxMTY1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      step: 4,
      title: "Enable Auto-Send Features",
      description: "Configure which voucher types should automatically send WhatsApp notifications",
      screenshot: "https://images.unsplash.com/photo-1754548930550-be9fa88874f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhzb2Z0d2FyZSUyMGludGVyZmFjZSUyMHNldHVwfGVufDF8fHx8MTc1NjkxMTY1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <Layout currentPage="Profile">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-900">Profile & Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">User Profile</TabsTrigger>
            <TabsTrigger value="integration">MSG91 Integration</TabsTrigger>
            <TabsTrigger value="setup">Tally Setup</TabsTrigger>
          </TabsList>

          {/* User Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border border-gray-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900">Personal Information</CardTitle>
                  {!isEditingProfile ? (
                    <Button variant="outline" onClick={handleEditProfile} className="border-gray-300">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancelEdit} className="border-gray-300">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} className="bg-gray-800 hover:bg-gray-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{profileData.fullName}</p>
                    <p className="text-sm text-gray-600">{profileData.businessName}</p>
                    {!isEditingProfile && (
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-600 hover:text-gray-800">
                        Change Profile Picture
                      </Button>
                    )}
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Full Name</Label>
                    {isEditingProfile ? (
                      <Input
                        value={editedProfile.fullName}
                        onChange={(e) => setEditedProfile({...editedProfile, fullName: e.target.value})}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 p-2 bg-gray-50 rounded border border-gray-200">{profileData.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Phone Number</Label>
                    {isEditingProfile ? (
                      <Input
                        value={editedProfile.phoneNumber}
                        onChange={(e) => setEditedProfile({...editedProfile, phoneNumber: e.target.value})}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 p-2 bg-gray-50 rounded border border-gray-200">{profileData.phoneNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Business Name</Label>
                    {isEditingProfile ? (
                      <Input
                        value={editedProfile.businessName}
                        onChange={(e) => setEditedProfile({...editedProfile, businessName: e.target.value})}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 p-2 bg-gray-50 rounded border border-gray-200">{profileData.businessName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Country</Label>
                    {isEditingProfile ? (
                      <Input
                        value={editedProfile.country}
                        onChange={(e) => setEditedProfile({...editedProfile, country: e.target.value})}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 p-2 bg-gray-50 rounded border border-gray-200">{profileData.country}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-gray-700">Work Email</Label>
                    {isEditingProfile ? (
                      <Input
                        value={editedProfile.workEmail}
                        onChange={(e) => setEditedProfile({...editedProfile, workEmail: e.target.value})}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 p-2 bg-gray-50 rounded border border-gray-200">{profileData.workEmail}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-gray-700">Address</Label>
                    {isEditingProfile ? (
                      <Input
                        value={editedProfile.address}
                        onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 p-2 bg-gray-50 rounded border border-gray-200">{profileData.address}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">Account Type</Label>
                    <p className="text-gray-900 p-2 bg-gray-50 rounded border border-gray-200">Professional</p>
                  </div>
                  <div>
                    <Label className="text-gray-700">Member Since</Label>
                    <p className="text-gray-900 p-2 bg-gray-50 rounded border border-gray-200">January 2025</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="border-gray-300">
                    Change Password
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MSG91 Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            {/* MSG91 Connection Status */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">MSG91 Integration</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoggedInWithMSG91 ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">Connected to MSG91</p>
                      <p className="text-sm text-green-700">You are successfully logged in and can manage your campaigns.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600">Connect your MSG91 account to manage campaigns and send WhatsApp messages.</p>
                    <Button 
                      onClick={onMSG91Login}
                      className="bg-gray-800 hover:bg-gray-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Login with MSG91
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Authorization Key */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Authorization Key</CardTitle>
                <p className="text-sm text-gray-600">Use this key in your Tally plugin configuration</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Authorization Key</Label>
                  <div className="flex gap-2">
                    <Input
                      value={authorizationKey}
                      readOnly
                      className="font-mono text-sm bg-gray-50 border-gray-300"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyAuthKey}
                      className="border-gray-300"
                    >
                      {authKeyCopied ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {authKeyCopied && (
                    <p className="text-sm text-green-600">Authorization key copied to clipboard!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Voucher Template Settings */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Voucher Template Settings</CardTitle>
                <p className="text-sm text-gray-600">Configure how WhatsApp messages are generated for your Tally vouchers</p>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">Switch to Default Templates</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Use our pre-built WhatsApp message templates for common Tally vouchers. 
                        This will replace any custom mappings you've configured with standardized templates 
                        for Sales, Purchase, Receipt, Payment, and other voucher types.
                      </p>
                      <div className="text-xs text-gray-500 mb-3">
                        <span className="font-medium">Current Setup:</span> Custom Voucher Mapping
                      </div>
                    </div>
                  </div>
                  {onUseDefaults && (
                    <Button 
                      variant="outline" 
                      onClick={onUseDefaults}
                      className="border-gray-300 text-sm"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Use Default Templates
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Plugin Download */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Plugin Download</CardTitle>
                <p className="text-sm text-gray-600">Download the latest version of the Tally-MSG91 integration plugin</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <Download className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">MSG91-Tally-Plugin-v2.1.zip</p>
                      <p className="text-sm text-gray-600">Version 2.1 • 2.3 MB • Updated Jan 2025</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-300">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tally Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            {/* Tally Setup Instructions */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Tally Setup Instructions</CardTitle>
                <p className="text-sm text-gray-600">Follow these steps to integrate MSG91 with your Tally software</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {tallySteps.map((step, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                          
                          {/* Screenshot placeholder */}
                          <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                            <div className="px-3 py-2 bg-gray-100 border-b border-gray-300 flex items-center gap-2 text-xs text-gray-600">
                              <Settings className="h-3 w-3" />
                              Tally Setup - Step {step.step}
                            </div>
                            <div className="p-4">
                              <ImageWithFallback
                                src={step.screenshot}
                                alt={`Tally setup step ${step.step}: ${step.title}`}
                                className="w-full max-w-md h-48 object-cover rounded border border-gray-200"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {index < tallySteps.length - 1 && (
                        <div className="ml-4 w-px h-6 bg-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support & Documentation */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Support & Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Installation Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Troubleshooting
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Video Tutorials
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Contact Support</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Email: support@msg91.com</p>
                      <p>Phone: +91-9999112233</p>
                      <p>Hours: Mon-Fri 9AM-6PM IST</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}