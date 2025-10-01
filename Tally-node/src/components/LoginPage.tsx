import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface LoginPageProps {
  onLogin: (type: 'otp' | 'msg91') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = async () => {
    // Basic validation: ensure a number is provided
    const mobile = phone.trim();
    if (!mobile) {
      alert("Please enter a mobile number.");
      return;
    }

    try {
      setIsSending(true);
      const response = await fetch(
        "https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/send",
        {
          method: "POST",
          headers: {
            authkey: "dbc2b79e90d5ee493948fcf6556c2c9a",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile }),
        }
      );

      // Attempt to parse JSON response; ignore if not JSON
      let data: unknown = null;
      try {
        data = await response.json();
      } catch {}

      if (!response.ok) {
        console.error("OTP send failed", { status: response.status, data });
        alert("Failed to send OTP. Please try again.");
        return;
      }

      alert("OTP sent successfully.");
      setShowOtpField(true);
      setCooldown(30);
      // Keep phone input disabled until user opts to change number
      // Buttons state handled by disabled props below
      // Optionally navigate to OTP verification flow:
      // onLogin('otp');
    } catch (error) {
      console.error("Error calling OTP API", error);
      alert("An error occurred while sending OTP.");
    } finally {
      setIsSending(false);
    }
  };

  const handleChangeNumber = () => {
    setPhone("");
    setShowOtpField(false);
    setOtp("");
    setCooldown(0);
  };

  const handleVerifyOtp = async () => {
    const mobile = phone.trim();
    const code = otp.trim();
    if (!mobile || !code) {
      alert("Please enter both mobile number and OTP.");
      return;
    }
    try {
      setIsVerifying(true);
      const response = await fetch(
        "https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/verify",
        {
          method: "POST",
          headers: {
            authkey: "dbc2b79e90d5ee493948fcf6556c2c9a",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile, otp: code }),
        }
      );
      let data: any = null;
      try {
        data = await response.json();
      } catch {}

      // Prefer API field-based error handling
      if (data && typeof data === 'object' && 'hasError' in data) {
        if (data.hasError) {
          // Extract human-readable error(s)
          const errors = (data as any).errors;
          let message = "Invalid OTP. Please try again.";
          if (typeof errors === 'string') {
            message = errors;
          } else if (Array.isArray(errors) && errors.length > 0) {
            message = errors.join(", ");
          } else if (errors && typeof errors === 'object') {
            const values = Object.values(errors as Record<string, unknown>);
            message = values.map((v) => String(v)).join(", ") || message;
          }
          alert(message);
          return;
        }
        // No error from API → treat as success
        onLogin('otp');
        return;
      }

      // Fallback: if API didn’t return hasError, use HTTP status
      if (!response.ok) {
        console.error("OTP verify failed", { status: response.status, data });
        alert("Invalid OTP. Please try again.");
        return;
      }
      onLogin('otp');
    } catch (error) {
      console.error("Error verifying OTP", error);
      alert("An error occurred while verifying OTP.");
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white border border-gray-300">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-gray-900">Login to Tally Plugin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Login with OTP */}
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-gray-700">
              Login with OTP
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                id="phone"
                placeholder="Enter phone number"
                className="flex-1 border-gray-300"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={showOtpField}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSendOtp}
                disabled={isSending || !phone.trim() || cooldown > 0}
                className="border-gray-300"
              >
                {isSending ? "Sending..." : "Send OTP"}
              </Button>
              {cooldown > 0 && (
                <span className="text-xs text-gray-600">Retry after {cooldown}s</span>
              )}
            </div>
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline"
              onClick={handleChangeNumber}
            >
              Change mobile number
            </button>
          </div>

          {/* OTP Verification */}
          {showOtpField && (
            <div className="space-y-3">
              <Label htmlFor="otp" className="text-gray-700">
                Enter OTP
              </Label>
              <div className="flex gap-2">
                <Input
                  id="otp"
                  placeholder="Enter OTP"
                  className="flex-1 border-gray-300"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleVerifyOtp}
                  disabled={isVerifying || !otp.trim()}
                  className="bg-gray-800 hover:bg-gray-700 text-white"
                >
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Login with MSG91 */}
          <div className="space-y-3">
            <Label className="text-gray-700">
              Login with MSG91
            </Label>
            <Button 
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              onClick={() => onLogin('msg91')}
            >
              Login with MSG91
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}