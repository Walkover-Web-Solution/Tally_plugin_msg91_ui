import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Check, Star, Zap, Crown, MessageSquare, Phone, Users, Gift, CreditCard, Globe } from "lucide-react";
import { Layout } from "./Layout";

interface SubscriptionPageProps {
  userType: 'existing' | 'new';
  onNext: () => void;
}

export function SubscriptionPage({ userType, onNext }: SubscriptionPageProps) {
  const countryPricing = [
    { country: "India", flag: "🇮🇳", price: "₹0.50", currency: "INR" },
    { country: "United States", flag: "🇺🇸", price: "₹8.00", currency: "INR" },
    { country: "United Kingdom", flag: "🇬🇧", price: "₹7.50", currency: "INR" },
    { country: "Canada", flag: "🇨🇦", price: "₹6.00", currency: "INR" },
    { country: "Australia", flag: "🇦🇺", price: "₹9.00", currency: "INR" },
    { country: "Germany", flag: "🇩🇪", price: "₹8.50", currency: "INR" },
    { country: "France", flag: "🇫🇷", price: "₹8.50", currency: "INR" },
    { country: "Singapore", flag: "🇸🇬", price: "₹5.50", currency: "INR" },
    { country: "UAE", flag: "🇦🇪", price: "₹4.00", currency: "INR" },
    { country: "Saudi Arabia", flag: "🇸🇦", price: "₹4.50", currency: "INR" },
    { country: "Malaysia", flag: "🇲🇾", price: "₹3.50", currency: "INR" },
    { country: "Thailand", flag: "🇹🇭", price: "₹3.00", currency: "INR" },
    { country: "Brazil", flag: "🇧🇷", price: "₹6.50", currency: "INR" },
    { country: "Mexico", flag: "🇲🇽", price: "₹5.00", currency: "INR" },
    { country: "South Africa", flag: "🇿🇦", price: "₹7.00", currency: "INR" }
  ];

  const rechargeOptions = [
    { amount: "₹100", bonus: "₹5", total: "₹105", popular: false },
    { amount: "₹500", bonus: "₹50", total: "₹550", popular: true },
    { amount: "₹1,000", bonus: "₹150", total: "₹1,150", popular: false },
    { amount: "₹2,500", bonus: "₹500", total: "₹3,000", popular: false }
  ];

  if (userType === 'existing') {
    return (
      <Layout currentPage="Pricing">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-900">Subscription & Billing</h1>
          </div>

          {/* Existing User Message */}
          <Card className="border border-gray-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl text-gray-900 mb-2">Your billing is managed by MSG91</h2>
              <p className="text-gray-600 mb-6">
                As an existing MSG91 user, your subscription and billing are handled directly through your MSG91 account. 
                You can manage your plan, view usage, and handle billing from your MSG91 dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-gray-300">
                  <Zap className="h-4 w-4 mr-2" />
                  Open MSG91 Dashboard
                </Button>
                <Button onClick={onNext} className="bg-gray-800 hover:bg-gray-700">
                  Continue Setup
                </Button>
              </div>
            </CardContent>
          </Card>


        </div>
      </Layout>
    );
  }

  // New User Pricing Page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-32 h-8 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-sm text-gray-600">LOGO</span>
          </div>
          <div className="text-sm text-gray-600">
            Step 3 of 5: Messaging Rates
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Free Credit Banner */}
        <Card className="border border-green-300 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-green-800 mb-1">Welcome Bonus!</h3>
                <p className="text-green-700">
                  You've received <strong>₹10 free credit</strong> to get started with WhatsApp messaging. 
                  This credit can be used to send messages to any country.
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl text-green-800">₹10</div>
                <div className="text-sm text-green-600">Free Credit</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl text-gray-900">WhatsApp Messaging Rates</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pay-per-message pricing from India to different countries. No monthly subscriptions, only pay for what you use.
          </p>
        </div>

        {/* Country Pricing Table */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Country-wise Messaging Rates
            </CardTitle>
            <p className="text-sm text-gray-600">All prices are per WhatsApp message sent from India</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-300">
                  <TableHead className="text-gray-700">Country</TableHead>
                  <TableHead className="text-gray-700">Rate per Message</TableHead>
                  <TableHead className="text-gray-700">Estimated Messages with ₹10</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countryPricing.map((country, index) => {
                  const messagesCount = Math.floor(10 / parseFloat(country.price.replace('₹', '')));
                  return (
                    <TableRow key={index} className="border-gray-300">
                      <TableCell className="text-gray-900">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{country.flag}</span>
                          <span>{country.country}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900 font-medium">{country.price}</TableCell>
                      <TableCell className="text-gray-600">~{messagesCount} messages</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recharge Options */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Recharge Options
            </CardTitle>
            <p className="text-sm text-gray-600">Top up your account when you need more credits</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {rechargeOptions.map((option, index) => (
                <Card key={index} className={`border relative cursor-pointer hover:shadow-md transition-shadow ${
                  option.popular ? 'border-gray-800 shadow-lg' : 'border-gray-300'
                }`}>
                  {option.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs">
                      Popular
                    </Badge>
                  )}
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-gray-900 mb-1">{option.amount}</div>
                    <div className="text-sm text-green-600 mb-2">+{option.bonus} bonus</div>
                    <div className="text-lg text-gray-800 mb-3">= {option.total}</div>
                    <Button 
                      variant={option.popular ? "default" : "outline"} 
                      size="sm" 
                      className={option.popular ? "bg-gray-800 hover:bg-gray-700" : "border-gray-300"}
                    >
                      Recharge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-300">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">No Monthly Fees</h3>
              <p className="text-sm text-gray-600">Pay only when you send messages. No hidden charges or monthly subscriptions.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-300">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">Instant Delivery</h3>
              <p className="text-sm text-gray-600">Messages are delivered instantly to your customers worldwide with delivery reports.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-300">
            <CardContent className="p-6 text-center">
              <Check className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">Easy Integration</h3>
              <p className="text-sm text-gray-600">Seamlessly integrates with your Tally software for automated messaging.</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-6">
          <Button onClick={onNext} size="lg" className="bg-gray-800 hover:bg-gray-700 px-8">
            Continue Setup with ₹10 Credit
          </Button>
        </div>
      </div>
    </div>
  );
}