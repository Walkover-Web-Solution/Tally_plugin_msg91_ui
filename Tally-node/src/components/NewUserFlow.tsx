import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Layout } from "./Layout";

interface NewUserFlowProps {
  onNext: () => void;
}

export function NewUserFlow({ onNext }: NewUserFlowProps) {
  const voucherTypes = [
    "Sales", "Purchase", "Credit Note", "Debit Note", 
    "Receipt", "Payment", "Ledger"
  ];

  const pricingData = [
    { country: "India", rate: "₹0.25" },
    { country: "United States", rate: "$0.05" },
    { country: "United Kingdom", rate: "£0.04" },
    { country: "Australia", rate: "A$0.07" },
    { country: "Canada", rate: "C$0.06" },
    { country: "Singapore", rate: "S$0.08" },
  ];

  const setupSteps = [
    "Download and install the Tally Plugin",
    "Configure your MSG91 API credentials",
    "Select voucher types for WhatsApp notifications",
    "Test the integration with sample data",
    "Start sending automated WhatsApp messages"
  ];

  return (
    <Layout currentPage="Voucher Mapping">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-900">Quick Setup - New User</h1>
        </div>

        {/* Predefined Mapping Preview */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">WhatsApp Template Preview</CardTitle>
            <p className="text-sm text-gray-600">Select a voucher type to see the WhatsApp message template</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700">Select Voucher Type</Label>
              <Select>
                <SelectTrigger className="border-gray-300 max-w-sm">
                  <SelectValue placeholder="Select voucher type" />
                </SelectTrigger>
                <SelectContent>
                  {voucherTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* WhatsApp Template Preview */}
            <div className="border border-gray-300 rounded bg-gray-50 p-4">
              <h3 className="text-sm text-gray-700 mb-3">WhatsApp Message Preview</h3>
              <div className="bg-white border border-gray-300 rounded p-4 max-w-md">
                <div className="text-sm text-gray-800 space-y-1">
                  <p>🧾 <strong>Sales Invoice</strong></p>
                  <p>Invoice No: <span className="bg-gray-200 px-1 rounded text-xs">INV-001</span></p>
                  <p>Customer: <span className="bg-gray-200 px-1 rounded text-xs">John Doe</span></p>
                  <p>Amount: <span className="bg-gray-200 px-1 rounded text-xs">₹5,000</span></p>
                  <p>Date: <span className="bg-gray-200 px-1 rounded text-xs">15/01/2025</span></p>
                  <p className="text-xs text-gray-500 mt-2">Thank you for your business!</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Template variables will be automatically filled with data from Tally
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Section */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">WhatsApp Message Pricing</CardTitle>
            <p className="text-sm text-gray-600">Rate per WhatsApp message sent</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-300">
                  <TableHead className="text-gray-700">Country</TableHead>
                  <TableHead className="text-gray-700">Rate per WhatsApp Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingData.map((item, index) => (
                  <TableRow key={index} className="border-gray-300">
                    <TableCell className="text-gray-600">{item.country}</TableCell>
                    <TableCell className="text-gray-600">{item.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Setup Steps */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Next Steps</CardTitle>
            <p className="text-sm text-gray-600">Follow these steps to complete your Tally Plugin setup</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {setupSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={onNext} className="bg-gray-800 hover:bg-gray-700">
            Proceed to Plugin Setup
          </Button>
        </div>
      </div>
    </Layout>
  );
}