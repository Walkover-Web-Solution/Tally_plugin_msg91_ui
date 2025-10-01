import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Settings, Zap, Clock, MessageSquare, FileText, Receipt, ShoppingCart } from "lucide-react";

interface VoucherSetupChoiceProps {
  onUseDefaults: () => void;
  onCustomMapping: () => void;
}

export function VoucherSetupChoice({ onUseDefaults, onCustomMapping }: VoucherSetupChoiceProps) {
  const defaultTemplates = [
    {
      voucherType: "Sales Invoice",
      icon: FileText,
      message: "Thank you for your purchase! Your invoice #{INVOICE_NO} for ₹{AMOUNT} has been generated. Download: {LINK}",
      timing: "Immediately after invoice creation"
    },
    {
      voucherType: "Payment Receipt", 
      icon: Receipt,
      message: "Payment received! Thank you {CUSTOMER_NAME} for your payment of ₹{AMOUNT}. Receipt #{RECEIPT_NO} is ready.",
      timing: "After payment confirmation"
    },
    {
      voucherType: "Purchase Order",
      icon: ShoppingCart,
      message: "Purchase Order #{PO_NO} created for ₹{AMOUNT}. Expected delivery: {DELIVERY_DATE}. Track status: {LINK}",
      timing: "After PO approval"
    },
    {
      voucherType: "Credit Note",
      icon: MessageSquare,
      message: "Credit Note #{CREDIT_NO} issued for ₹{AMOUNT}. This credit will be applied to your next invoice.",
      timing: "After credit note creation"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-32 h-8 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-sm text-gray-600">LOGO</span>
          </div>
          <div className="text-sm text-gray-600">
            Step 4 of 5: Voucher Setup
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl text-gray-900">Choose Your Setup Method</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started quickly with our pre-configured templates or customize your own voucher-to-message mapping.
          </p>
        </div>

        {/* Setup Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Default Templates Option */}
          <Card className="border border-gray-300 hover:shadow-lg transition-shadow cursor-pointer relative">
            <Badge className="absolute -top-3 left-6 bg-green-600 text-white">
              Recommended
            </Badge>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Use Default Templates</CardTitle>
              <p className="text-gray-600">Start immediately with pre-configured message templates</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Ready in under 2 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Professional message templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Automatic variable mapping</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Can be customized later</span>
                </div>
              </div>

              {/* Sample Templates Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm text-gray-700 mb-3">Included Templates:</h4>
                <div className="space-y-2">
                  {defaultTemplates.slice(0, 2).map((template, index) => {
                    const IconComponent = template.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <IconComponent className="h-4 w-4" />
                        <span>{template.voucherType}</span>
                      </div>
                    );
                  })}
                  <div className="text-xs text-gray-500">+ 2 more templates</div>
                </div>
              </div>

              <Button 
                onClick={onUseDefaults}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                Use Default Templates
              </Button>
            </CardContent>
          </Card>

          {/* Custom Mapping Option */}
          <Card className="border border-gray-300 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Custom Mapping</CardTitle>
              <p className="text-gray-600">Configure your own voucher-to-campaign mapping</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Full control over messages</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Custom variable mapping</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Use existing MSG91 campaigns</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Brand-specific messaging</span>
                </div>
              </div>

              {/* Time Estimate */}
              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="text-sm text-blue-800">Setup Time</div>
                  <div className="text-xs text-blue-600">5-10 minutes</div>
                </div>
              </div>

              <Button 
                onClick={onCustomMapping}
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                size="lg"
              >
                <Settings className="h-5 w-5 mr-2" />
                Configure Custom Mapping
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Default Templates Details */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Default Template Details</CardTitle>
            <p className="text-gray-600">Our pre-configured templates cover the most common business scenarios</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {defaultTemplates.map((template, index) => {
                const IconComponent = template.icon;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-gray-900">{template.voucherType}</h4>
                        <p className="text-xs text-gray-500">{template.timing}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <p className="text-sm text-gray-700 italic">"{template.message}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="border border-gray-300 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Need Help Deciding?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  We recommend starting with default templates for immediate results. You can always switch to custom mapping later from your dashboard settings.
                </p>
                <p className="text-xs text-gray-500">
                  Both options can be modified and customized after initial setup.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}