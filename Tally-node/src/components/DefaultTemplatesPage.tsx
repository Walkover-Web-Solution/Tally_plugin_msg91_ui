import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, FileText, Receipt, ShoppingCart, MessageSquare, Settings, Eye } from "lucide-react";

interface DefaultTemplatesPageProps {
  onNext: () => void;
  onCustomize: () => void;
}

export function DefaultTemplatesPage({ onNext, onCustomize }: DefaultTemplatesPageProps) {
  const configuredTemplates = [
    {
      voucherType: "Sales Invoice",
      icon: FileText,
      campaign: "Invoice Notification",
      message: "Thank you for your purchase! Your invoice #{INVOICE_NO} for ₹{AMOUNT} has been generated. Download: {LINK}",
      timing: "Immediately after invoice creation",
      variables: ["CUSTOMER_NAME", "INVOICE_NO", "AMOUNT", "DATE", "LINK"],
      status: "active"
    },
    {
      voucherType: "Payment Receipt", 
      icon: Receipt,
      campaign: "Payment Confirmation",
      message: "Payment received! Thank you {CUSTOMER_NAME} for your payment of ₹{AMOUNT}. Receipt #{RECEIPT_NO} is ready.",
      timing: "After payment confirmation",
      variables: ["CUSTOMER_NAME", "AMOUNT", "RECEIPT_NO", "DATE"],
      status: "active"
    },
    {
      voucherType: "Purchase Order",
      icon: ShoppingCart,
      campaign: "Purchase Order Update",
      message: "Purchase Order #{PO_NO} created for ₹{AMOUNT}. Expected delivery: {DELIVERY_DATE}. Track status: {LINK}",
      timing: "After PO approval",
      variables: ["PO_NO", "AMOUNT", "DELIVERY_DATE", "SUPPLIER_NAME", "LINK"],
      status: "active"
    },
    {
      voucherType: "Credit Note",
      icon: MessageSquare,
      campaign: "Credit Note Alert",
      message: "Credit Note #{CREDIT_NO} issued for ₹{AMOUNT}. This credit will be applied to your next invoice.",
      timing: "After credit note creation",
      variables: ["CREDIT_NO", "AMOUNT", "CUSTOMER_NAME", "DATE"],
      status: "active"
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
            Step 4 of 5: Default Templates Configured
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Success Message */}
        <Card className="border border-green-300 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-green-800 mb-1">Templates Configured Successfully!</h3>
                <p className="text-green-700">
                  Your default WhatsApp message templates are now active and ready to use. 
                  Messages will be sent automatically based on your Tally voucher activities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl text-gray-900">Default Templates Active</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your configured message templates below. You can customize these anytime from your dashboard.
          </p>
        </div>

        {/* Template Cards */}
        <div className="space-y-6">
          {configuredTemplates.map((template, index) => {
            const IconComponent = template.icon;
            return (
              <Card key={index} className="border border-gray-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">{template.voucherType}</CardTitle>
                        <p className="text-sm text-gray-600">Campaign: {template.campaign}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        {template.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Message Preview */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Message Template:</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-800 italic">"{template.message}"</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm text-gray-700 mb-2">Trigger Timing:</h5>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-2">{template.timing}</p>
                    </div>
                    <div>
                      <h5 className="text-sm text-gray-700 mb-2">Variables Used:</h5>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, varIndex) => (
                          <Badge key={varIndex} variant="outline" className="text-xs border-gray-300">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-300">
            <CardContent className="p-6 text-center">
              <div className="text-2xl text-gray-900 mb-1">4</div>
              <div className="text-sm text-gray-600">Templates Active</div>
            </CardContent>
          </Card>
          <Card className="border border-gray-300">
            <CardContent className="p-6 text-center">
              <div className="text-2xl text-gray-900 mb-1">18</div>
              <div className="text-sm text-gray-600">Variables Mapped</div>
            </CardContent>
          </Card>
          <Card className="border border-gray-300">
            <CardContent className="p-6 text-center">
              <div className="text-2xl text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-600">Setup Complete</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button 
            variant="outline" 
            onClick={onCustomize}
            className="border-gray-300 px-6"
          >
            <Settings className="h-4 w-4 mr-2" />
            Customize Templates
          </Button>
          <Button 
            onClick={onNext}
            size="lg" 
            className="bg-gray-800 hover:bg-gray-700 px-8"
          >
            Continue to Plugin Setup
          </Button>
        </div>

        {/* Info Box */}
        <Card className="border border-blue-300 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-blue-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Install the Tally plugin to connect your software</li>
                  <li>• Messages will automatically send when vouchers are created</li>
                  <li>• Monitor delivery status from your dashboard</li>
                  <li>• Customize or add new templates anytime</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}