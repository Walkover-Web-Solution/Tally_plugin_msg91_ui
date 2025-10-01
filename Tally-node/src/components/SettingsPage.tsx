import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Layout } from "./Layout";
import { Copy, CheckCircle, ExternalLink, Settings, Download, Upload } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface SettingsPageProps {
  isLoggedInWithMSG91: boolean;
  onMSG91Login: () => void;
}

export function SettingsPage({ isLoggedInWithMSG91, onMSG91Login }: SettingsPageProps) {
  const [authKeyCopied, setAuthKeyCopied] = useState(false);
  
  const authorizationKey = "TLY_MSG91_AUTH_KEY_2024_ABC123XYZ789";

  const handleCopyAuthKey = () => {
    navigator.clipboard.writeText(authorizationKey);
    setAuthKeyCopied(true);
    setTimeout(() => setAuthKeyCopied(false), 2000);
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
    <Layout currentPage="Settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-900">Settings</h1>
        </div>

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
      </div>
    </Layout>
  );
}