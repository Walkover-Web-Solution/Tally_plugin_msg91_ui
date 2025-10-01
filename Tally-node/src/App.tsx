import React, { useState } from 'react';
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

type Screen = 'landing' | 'login' | 'registration' | 'subscription' | 'voucher-setup-choice' | 'voucher-mapping' | 'default-templates' | 'plugin-setup' | 'new-user' | 'dashboard' | 'profile';
type UserType = 'existing' | 'new' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoggedInWithMSG91, setIsLoggedInWithMSG91] = useState<boolean>(false);

  const handleLogin = (loginType: 'otp' | 'msg91') => {
    if (loginType === 'msg91') {
      setUserType('existing');
      setIsLoggedInWithMSG91(true);
      setCurrentScreen('subscription');
    } else {
      setUserType('new');
      setCurrentScreen('registration');
    }
  };

  const handleRegistrationNext = () => {
    setCurrentScreen('subscription');
  };

  const handleSubscriptionNext = () => {
    if (userType === 'new') {
      setCurrentScreen('new-user');
    } else {
      setCurrentScreen('voucher-setup-choice');
    }
  };

  const handleUseDefaults = () => {
    setCurrentScreen('default-templates');
  };

  const handleCustomMapping = () => {
    setCurrentScreen('voucher-mapping');
  };

  const handleBackToChoice = () => {
    setCurrentScreen('voucher-setup-choice');
  };

  const handleDefaultTemplatesNext = () => {
    setCurrentScreen('plugin-setup');
  };

  const handleMSG91LoginFromProfile = () => {
    setUserType('existing');
    setIsLoggedInWithMSG91(true);
    setCurrentScreen('voucher-mapping');
  };

  const handleVoucherMappingNext = () => {
    setCurrentScreen('plugin-setup');
  };

  const handlePluginSetupComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleNewUserNext = () => {
    setCurrentScreen('plugin-setup');
  };

  const handleGetStarted = () => {
    setCurrentScreen('login');
  };

  const resetToLogin = () => {
    setCurrentScreen('login');
    setUserType(null);
    setIsLoggedInWithMSG91(false);
  };

  // Hamburger Navigation Menu for demo purposes
  const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
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
                  setCurrentScreen('landing');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'landing' ? 'bg-gray-200' : ''}
              >
                0. Landing Page
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setCurrentScreen('login');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'login' ? 'bg-gray-200' : ''}
              >
                1. Login
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('new');
                  setCurrentScreen('registration');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'registration' ? 'bg-gray-200' : ''}
              >
                2a. Registration
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setCurrentScreen('subscription');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'subscription' ? 'bg-gray-200' : ''}
              >
                2b. Pricing
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('existing');
                  setCurrentScreen('voucher-setup-choice');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'voucher-setup-choice' ? 'bg-gray-200' : ''}
              >
                3a. Setup Choice
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('existing');
                  setCurrentScreen('voucher-mapping');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'voucher-mapping' ? 'bg-gray-200' : ''}
              >
                3b. Custom Mapping
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('existing');
                  setCurrentScreen('default-templates');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'default-templates' ? 'bg-gray-200' : ''}
              >
                3c. Default Templates
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserType('new');
                  setCurrentScreen('new-user');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'new-user' ? 'bg-gray-200' : ''}
              >
                3d. New User Flow
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setCurrentScreen('plugin-setup');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'plugin-setup' ? 'bg-gray-200' : ''}
              >
                4. Plugin Setup
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setCurrentScreen('dashboard');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'dashboard' ? 'bg-gray-200' : ''}
              >
                5. Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setCurrentScreen('profile');
                  setIsMenuOpen(false);
                }}
                className={currentScreen === 'profile' ? 'bg-gray-200' : ''}
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
      
      {currentScreen === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentScreen === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      
      {currentScreen === 'registration' && userType === 'new' && (
        <RegistrationPage onNext={handleRegistrationNext} />
      )}
      
      {currentScreen === 'subscription' && (
        <SubscriptionPage 
          userType={userType || 'new'} 
          onNext={handleSubscriptionNext} 
        />
      )}
      
      {currentScreen === 'voucher-setup-choice' && userType === 'existing' && (
        <VoucherSetupChoice 
          onUseDefaults={handleUseDefaults}
          onCustomMapping={handleCustomMapping}
        />
      )}
      
      {currentScreen === 'voucher-mapping' && userType === 'existing' && (
        <VoucherMappingPage 
          onNext={handleVoucherMappingNext} 
          onUseDefaults={handleUseDefaults}
        />
      )}
      
      {currentScreen === 'default-templates' && userType === 'existing' && (
        <DefaultTemplatesPage 
          onNext={handleDefaultTemplatesNext}
          onCustomize={handleBackToChoice}
        />
      )}
      
      {currentScreen === 'new-user' && userType === 'new' && (
        <NewUserFlow onNext={handleNewUserNext} />
      )}
      
      {currentScreen === 'plugin-setup' && (
        <PluginSetupPage onComplete={handlePluginSetupComplete} />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard />
      )}
      
      {currentScreen === 'profile' && (
        <UserProfilePage 
          isLoggedInWithMSG91={isLoggedInWithMSG91}
          onMSG91Login={handleMSG91LoginFromProfile}
          onUseDefaults={handleUseDefaults}
        />
      )}
    </div>
  );
}