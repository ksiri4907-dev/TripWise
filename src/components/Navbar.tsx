import React from 'react';
import { Compass, Bookmark, User, SlidersHorizontal, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'plan' | 'trips' | 'dashboard' | 'feedback';
  setActiveTab: (tab: 'home' | 'plan' | 'trips' | 'dashboard' | 'feedback') => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: 'home' | 'plan' | 'trips' | 'dashboard' | 'feedback') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-105">
                <Compass className="w-5 h-5 text-teal-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                TripWise
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors pb-1 border-b-2 ${
                activeTab === 'home'
                  ? 'border-teal-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('plan')}
              className={`transition-colors pb-1 border-b-2 ${
                activeTab === 'plan'
                  ? 'border-teal-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Plan Trip
            </button>
            <button
              onClick={() => handleNavClick('trips')}
              className={`transition-colors pb-1 border-b-2 ${
                activeTab === 'trips'
                  ? 'border-teal-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              My Trips
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`transition-colors pb-1 border-b-2 ${
                activeTab === 'dashboard'
                  ? 'border-teal-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('feedback')}
              className={`transition-colors pb-1 border-b-2 ${
                activeTab === 'feedback'
                  ? 'border-teal-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Feedback
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('trips')}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Saved Trips & Bookmarks"
              aria-label="Saved Trips"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-teal-400" />
              <span>Workspace</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'home' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('plan')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'plan' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Plan Trip
          </button>
          <button
            onClick={() => handleNavClick('trips')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'trips' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            My Trips ({savedCount})
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'dashboard' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Dashboard & Workspace
          </button>
          <button
            onClick={() => handleNavClick('feedback')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'feedback' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Feedback
          </button>
        </div>
      )}
    </header>
  );
};
