import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { VoucherMappingPage } from './components/VoucherMappingPage';
import { VoucherSetupChoice } from './components/VoucherSetupChoice';
import { DefaultTemplatesPage } from './components/DefaultTemplatesPage';
import { PluginSetupPage } from './components/PluginSetupPage';
import { NewUserFlow } from './components/NewUserFlow';
import { Dashboard } from './components/Dashboard';
import { UserProfilePage } from './components/UserProfilePage';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';

type UserType = 'existing' | 'new' | null;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoggedInWithMSG91, setIsLoggedInWithMSG91] = useState<boolean>(false);

  const handleLogin = (loginType: 'otp' | 'msg91') => {
    if (loginType === 'msg91') {
      setUserType('existing');
      setIsLoggedInWithMSG91(true);
      navigate('/subscription');
    } else {
      setUserType('new');
      navigate('/registration');
    }
  };

  const handleRegistrationNext = () => {
    navigate('/subscription');
  };

  const handleSubscriptionNext = () => {
    if (userType === 'new') {
      navigate('/new-user');
    } else {
      navigate('/voucher-setup-choice');
    }
  };

  const handleUseDefaults = () => {
    navigate('/default-templates');
  };

  const handleCustomMapping = () => {
    navigate('/voucher-mapping');
  };

  const handleBackToChoice = () => {
    navigate('/voucher-setup-choice');
  };

  const handleDefaultTemplatesNext = () => {
    navigate('/plugin-setup');
  };

  const handleMSG91LoginFromProfile = () => {
    setUserType('existing');
    setIsLoggedInWithMSG91(true);
    navigate('/voucher-mapping');
  };

  const handleVoucherMappingNext = () => {
    navigate('/plugin-setup');
  };

  const handlePluginSetupComplete = () => {
    navigate('/dashboard');
  };

  const handleNewUserNext = () => {
    navigate('/plugin-setup');
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const resetToLogin = () => {
    navigate('/login');
    setUserType(null);
    setIsLoggedInWithMSG91(false);
  };

  // Hamburger Navigation Menu for demo purposes
  const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const isActiveRoute = (path: string) => {
      return location.pathname === path;
    };

    return (
      <div className="fixed top-4 left-4 z-50">
        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="w-12 h-12 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <div className={`w-5 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-gray-600 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        {/* Navigation Menu */}
        <div className={`absolute top-14 left-0 bg-white border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}>
          <div className="p-4 min-w-48">
            <h3 className="text-sm text-gray-700 mb-3">Wireframe Navigation</h3>
            <div className="flex flex-col gap-2 text-xs">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/') ? 'bg-gray-200' : ''}
              >
                0. Landing Page
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/login') ? 'bg-gray-200' : ''}
              >
                1. Login
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('new');
                  navigate('/registration');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/registration') ? 'bg-gray-200' : ''}
              >
                2a. Registration
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  navigate('/subscription');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/subscription') ? 'bg-gray-200' : ''}
              >
                2b. Pricing
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('existing');
                  navigate('/voucher-setup-choice');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/voucher-setup-choice') ? 'bg-gray-200' : ''}
              >
                3a. Setup Choice
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('existing');
                  navigate('/voucher-mapping');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/voucher-mapping') ? 'bg-gray-200' : ''}
              >
                3b. Custom Mapping
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('existing');
                  navigate('/default-templates');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/default-templates') ? 'bg-gray-200' : ''}
              >
                3c. Default Templates
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('new');
                  navigate('/new-user');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/new-user') ? 'bg-gray-200' : ''}
              >
                3d. New User Flow
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  navigate('/plugin-setup');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/plugin-setup') ? 'bg-gray-200' : ''}
              >
                4. Plugin Setup
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  navigate('/dashboard');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/dashboard') ? 'bg-gray-200' : ''}
              >
                5. Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
                className={isActiveRoute('/profile') ? 'bg-gray-200' : ''}
              >
                6. Profile & Settings
              </Button>
            </div>
            <hr className="my-3 border-gray-300" />
            <p className="text-xs text-gray-500">
              User Type: {userType === 'existing' ? 'Existing' : userType === 'new' ? 'New' : 'None'}
            </p>
            <p className="text-xs text-gray-500">
              MSG91: {isLoggedInWithMSG91 ? 'Connected' : 'Not Connected'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <NavigationBar />
      
      <Routes>
        <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/registration" element={<RegistrationPage onNext={handleRegistrationNext} />} />
        <Route path="/subscription" element={<SubscriptionPage userType={userType || 'new'} onNext={handleSubscriptionNext} />} />
        <Route path="/voucher-setup-choice" element={<VoucherSetupChoice onUseDefaults={handleUseDefaults} onCustomMapping={handleCustomMapping} />} />
        <Route path="/voucher-mapping" element={<VoucherMappingPage onNext={handleVoucherMappingNext} onUseDefaults={handleUseDefaults} />} />
        <Route path="/default-templates" element={<DefaultTemplatesPage onNext={handleDefaultTemplatesNext} onCustomize={handleBackToChoice} />} />
        <Route path="/new-user" element={<NewUserFlow onNext={handleNewUserNext} />} />
        <Route path="/plugin-setup" element={<PluginSetupPage onComplete={handlePluginSetupComplete} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfilePage isLoggedInWithMSG91={isLoggedInWithMSG91} onMSG91Login={handleMSG91LoginFromProfile} onUseDefaults={handleUseDefaults} />} />
      </Routes>
      
      <Toaster />
    </div>
  );
}