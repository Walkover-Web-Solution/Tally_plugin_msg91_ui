import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  MessageSquare,
  FileText,
  Zap,
  Users,
  Download,
  Settings,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Smartphone,
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({
  onGetStarted,
}: LandingPageProps) {
  const supportedVouchers = [
    {
      name: "Sales",
      icon: "💰",
      description:
        "Automatically send sales invoices to customers",
    },
    {
      name: "Purchase",
      icon: "🛒",
      description: "Share purchase orders with vendors",
    },
    {
      name: "Payment",
      icon: "💳",
      description: "Send payment confirmations and receipts",
    },
    {
      name: "Credit Note",
      icon: "📋",
      description: "Notify customers about credit adjustments",
    },
    {
      name: "Debit Note",
      icon: "📄",
      description: "Send debit memo notifications",
    },
    {
      name: "Receipt",
      icon: "🧾",
      description: "Share payment receipts instantly",
    },
    {
      name: "Account Ledger",
      icon: "📊",
      description: "Send account statements and summaries",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Automatic Delivery",
      description:
        "No more manual voucher sending. Tally automatically sends vouchers to clients over WhatsApp with attachments.",
    },
    {
      icon: (
        <MessageSquare className="h-6 w-6 text-green-600" />
      ),
      title: "Multi-Channel Support",
      description:
        "Send through WhatsApp, SMS, Email, or RCS. Choose the best channel for each customer.",
    },
    {
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      title: "Pre-defined Templates",
      description:
        "Ready-to-use templates for all voucher types. No setup hassle, start sending immediately.",
    },
    {
      icon: <Users className="h-6 w-6 text-orange-600" />,
      title: "Custom Campaigns",
      description:
        "Create personalized campaigns with MSG91 integration for advanced messaging workflows.",
    },
  ];

  const setupSteps = [
    {
      step: "01",
      title: "Download Plugin",
      description:
        "Download and install the MSG91 Tally plugin in minutes",
    },
    {
      step: "02",
      title: "Configure Settings",
      description:
        "Paste your auth key and configure voucher mappings",
    },
    {
      step: "03",
      title: "Start Sending",
      description:
        "Create vouchers in Tally and watch them auto-send via WhatsApp",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  TallyMsg91
                </h1>
                <p className="text-sm text-gray-600">
                  WhatsApp Integration for Tally
                </p>
              </div>
            </div>
            <Button
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Login to App
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                Automate Your Voucher Delivery
              </Badge>
              <h1 className="text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
                Send Tally vouchers on{" "}
                <span className="text-blue-600">WhatsApp</span>{" "}
                -automatically
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stop sharing vouchers manually. Connect Tally
                with MSG91 and deliver Sales, Purchase, Payment,
                Credit Note, Debit Note, Receipt, and Account
                Ledger vouchers instantly—with the PDF attached.
              </p>

              {/* Pain Points */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg text-green-800 mb-3 flex items-center gap-2">
                  What you will get
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>
                      Zero manual steps after posting a voucher
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>
                      Pre-defined WhatsApp templates to go live fast
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>
                      Accurate, on-time delivery with the voucher PDF
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>
                      Scale later with SMS, Email, and RCS—still from MSG91
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300"
                >
                  Watch Demo
                  <span className="ml-2">▶️</span>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 ml-auto">
                    Tally Integration
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-green-800">
                        Sales Invoice #SI-2024-001
                      </p>
                      <p className="text-xs text-green-600">
                        ✓ Sent via WhatsApp with PDF attachment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800">
                        Payment Receipt #PR-2024-045
                      </p>
                      <p className="text-xs text-blue-600">
                        🔄 Auto-sending in progress...
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <MessageSquare className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-purple-800">
                        Purchase Order #PO-2024-078
                      </p>
                      <p className="text-xs text-purple-600">
                        📱 Delivered via WhatsApp Business API
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Vouchers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 mb-4">
              Vouchers We Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Automatically send any type of voucher from Tally
              to your clients and vendors over WhatsApp with
              attachments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {supportedVouchers.map((voucher, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition-shadow group"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                    {voucher.icon}
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">
                    {voucher.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {voucher.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800">
                All vouchers include PDF attachments and are
                sent instantly
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 mb-4">
              Why Choose TallyMsg91?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple automation to advanced customization,
              we've got everything you need to streamline your
              voucher delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Channel Options */}
          <div className="mt-16">
            <h3 className="text-2xl text-gray-900 text-center mb-8">
              Multiple Communication Channels
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  WhatsApp
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  SMS
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
                <span className="text-purple-800 font-medium">
                  Email
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-orange-600" />
                <span className="text-orange-800 font-medium">
                  RCS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Easy Installation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 mb-4">
              Easy 3-Step Installation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get up and running in under 10 minutes. No
              technical expertise required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {setupSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>

                {index < setupSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Free Installation
              <Download className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              ₹10 free credit • No setup fees • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl text-white mb-4">
            Ready to Automate Your Voucher Delivery?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already saving time and
            improving customer communication with TallyMsg91
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Started Now - It's Free
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold">
                  TallyMsg91
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Seamlessly integrate WhatsApp messaging with
                your Tally software for automated voucher
                delivery.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold mb-6">
                Product
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Integration Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6">
                Support
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">
                Contact Us
              </h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">
                      support@msg91.com
                    </p>
                    <p className="text-sm">
                      24/7 Email Support
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">+91 9876543210</p>
                    <p className="text-sm">
                      Mon-Fri 9AM-6PM IST
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">Mumbai, India</p>
                    <p className="text-sm">Serving globally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                © 2024 TallyMsg91. All rights reserved.
              </p>
              <div className="flex gap-6 text-gray-400">
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}