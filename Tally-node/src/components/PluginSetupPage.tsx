import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Layout } from "./Layout";
import { CheckCircle, Download, Settings, Play, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface PluginSetupPageProps {
  onComplete: () => void;
}

export function PluginSetupPage({ onComplete }: PluginSetupPageProps) {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText("MSG91_AUTH_KEY_ABC123XYZ789DEF456");
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const toggleStepDetails = (stepIndex: number) => {
    setExpandedStep(expandedStep === stepIndex ? null : stepIndex);
  };
  const setupSteps = [
    {
      step: 1,
      title: "Download Plugin Files",
      description: "Download the MSG91 plugin files and copy them to your Tally installation folder",
      details: [
        "Download the MSG91 plugin files from the link below",
        "Navigate to your Tally installation directory (usually C:\\Tally.ERP9 or similar)",
        "Copy the downloaded files to the specific folder: TDL\\MSG91Integration\\",
        "Ensure all .TDL files are properly placed in the correct directory"
      ],
      action: "Download Plugin Files",
      icon: <Download className="h-5 w-5" />,
      completed: false
    },
    {
      step: 2,
      title: "Configure Auth Key in TDL",
      description: "Copy your generated Auth Key and paste it in the TDL configuration file",
      details: [
        "Copy your Auth Key from the box below (generated after signup)",
        "Open the MSG91 TDL configuration file in your Tally directory",
        "Find the Auth Key field in the configuration",
        "Paste your copied Auth Key and save the file"
      ],
      action: "Copy Auth Key",
      icon: <Settings className="h-5 w-5" />,
      completed: false
    },
    {
      step: 3,
      title: "Verify Plugin Installation",
      description: "Start Tally and verify that the MSG91 plugin is properly loaded and recognized",
      details: [
        "Start or restart your Tally application",
        "Go to Gateway of Tally > F11 (Features) > Statutory & Taxation",
        "Look for MSG91 Integration option in the menu",
        "Enable the MSG91 Integration feature if not already enabled"
      ],
      action: "Verify Installation",
      icon: <CheckCircle className="h-5 w-5" />,
      completed: false
    },
    {
      step: 4,
      title: "Start Creating Vouchers",
      description: "Once plugin is verified, you can start creating vouchers to trigger WhatsApp messages",
      details: [
        "Navigate to Accounting Vouchers in Tally",
        "Create vouchers as per your normal workflow",
        "The plugin will automatically trigger WhatsApp messages based on your configured mappings",
        "Monitor message delivery status in the MSG91 dashboard"
      ],
      action: "Create Vouchers",
      icon: <Play className="h-5 w-5" />,
      completed: false
    }
  ];

  return (
    <Layout currentPage="Voucher Mapping">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-900">Plugin Setup</h1>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            <span>Voucher-Campaign mapping saved successfully!</span>
          </div>
        </div>

        {/* Setup Instructions */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Tally Plugin Installation Guide</CardTitle>
            <p className="text-sm text-gray-600">Follow these steps to install and configure the MSG91 integration plugin in Tally</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {setupSteps.map((step, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-gray-100 border-gray-300 text-gray-600'
                      }`}>
                        {step.completed ? <CheckCircle className="h-5 w-5" /> : step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleStepDetails(index)}
                            className="border-gray-300"
                          >
                            {expandedStep === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            <span className="ml-2">Details</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-gray-300"
                            disabled={step.completed}
                          >
                            {step.icon}
                            <span className="ml-2">{step.action}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Instructions */}
                  {expandedStep === index && (
                    <div className="ml-14 bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm text-gray-800 mb-3">Step-by-step instructions:</h4>
                      <ol className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex gap-2 text-sm text-gray-600">
                            <span className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full text-xs flex items-center justify-center text-gray-600">
                              {detailIndex + 1}
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Connection line */}
                  {index < setupSteps.length - 1 && (
                    <div className="w-px h-6 bg-gray-300 ml-5"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Auth Key Section */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Auth Key Configuration</CardTitle>
            <p className="text-sm text-gray-600">Copy this Auth Key and paste it in your TDL configuration file (Step 2 above)</p>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <div>
                <label className="text-gray-700 block mb-1">Your Auth Key</label>
                <div className="flex gap-2">
                  <div className="bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 font-mono text-sm flex-1">
                    MSG91_AUTH_KEY_ABC123XYZ789DEF456
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyApiKey}
                    className="border-gray-300"
                  >
                    {apiKeyCopied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {apiKeyCopied && (
                  <p className="text-sm text-green-600 mt-1">Auth key copied to clipboard!</p>
                )}
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Keep this Auth Key secure and paste it exactly as shown in your TDL configuration file. This key is unique to your account and enables the plugin to send WhatsApp messages.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Support Section */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded">
                <h4 className="text-gray-900 mb-2">Installation Support</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Having trouble with plugin installation? Our support team can help you get set up.
                </p>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Contact Support
                </Button>
              </div>
              <div className="p-4 border border-gray-200 rounded">
                <h4 className="text-gray-900 mb-2">Video Tutorial</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Watch our step-by-step video guide for installing the Tally plugin.
                </p>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Watch Video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={onComplete} className="bg-gray-800 hover:bg-gray-700">
            Complete Setup
          </Button>
        </div>
      </div>
    </Layout>
  );
}