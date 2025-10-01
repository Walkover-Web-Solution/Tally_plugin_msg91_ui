import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { User, Building, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

interface RegistrationPageProps {
  onNext: () => void;
}

export function RegistrationPage({ onNext }: RegistrationPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    workEmail: "",
    phoneNumber: "",
    country: "",
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.fullName && 
                     formData.businessName && 
                     formData.workEmail && 
                     formData.phoneNumber &&
                     formData.country &&
                     formData.agreeToTerms;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-32 h-8 bg-gray-300 rounded mx-auto flex items-center justify-center mb-6">
            <span className="text-sm text-gray-600">LOGO</span>
          </div>
          <h1 className="text-2xl text-gray-900">Create Your Account</h1>
          <p className="text-gray-600">Let's get you set up with your Tally-MSG91 integration</p>
        </div>

        {/* Registration Form */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Account Information</CardTitle>
            <p className="text-sm text-gray-600">Please provide your details to create your account</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-base text-gray-900 flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Full Name *</Label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Phone Number *</Label>
                  <Input
                    placeholder="+91 9999999999"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-base text-gray-900 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Business Name *</Label>
                  <Input
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Country *</Label>
                  <Input
                    placeholder="India"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Work Email *</Label>
                <Input
                  type="email"
                  placeholder="your.email@business.com"
                  value={formData.workEmail}
                  onChange={(e) => handleInputChange('workEmail', e.target.value)}
                  className="border-gray-300"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    className="mt-1"
                  />
                  <div className="text-sm">
                    <label htmlFor="terms" className="text-gray-700 cursor-pointer">
                      I agree to the <a href="#" className="text-gray-900 underline">Terms of Service</a> and <a href="#" className="text-gray-900 underline">Privacy Policy</a> *
                    </label>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="marketing"
                    checked={formData.agreeToMarketing}
                    onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked)}
                    className="mt-1"
                  />
                  <div className="text-sm">
                    <label htmlFor="marketing" className="text-gray-700 cursor-pointer">
                      I would like to receive product updates and marketing communications
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={onNext}
              disabled={!isFormValid}
              className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300"
              size="lg"
            >
              Create Account
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Already have an account? <a href="#" className="text-gray-900 underline">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}