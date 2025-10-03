import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { AlertCircle, Wallet } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export function Layout({ children, currentPage }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentBalance = 3.50; // This would come from app state/context in real app
  const isLowBalance = currentBalance < 10;
  
  const menuItems = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Voucher Mapping", route: "/voucher-mapping" }, 
    { name: "Campaigns", route: "/campaigns" },
    { name: "Pricing", route: "/subscription" },
    { name: "Profile", route: "/profile" }
  ];

  const handleMenuClick = (route: string) => {
    navigate(route);
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-32 h-8 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-sm text-gray-600">LOGO</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 text-sm ${
              isLowBalance ? 'text-orange-600' : 'text-gray-600'
            }`}>
              <Wallet className="h-4 w-4" />
              <span>Balance: ₹{currentBalance.toFixed(2)}</span>
              {isLowBalance && <AlertCircle className="h-4 w-4 text-orange-500" />}
            </div>
            <Button 
              variant={isLowBalance ? "default" : "outline"} 
              size="sm"
              className={isLowBalance ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              {isLowBalance ? "Recharge Now" : "Recharge"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-300 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <div
                    onClick={() => handleMenuClick(item.route)}
                    className={`px-3 py-2 rounded cursor-pointer transition-colors ${
                      isActiveRoute(item.route)
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}