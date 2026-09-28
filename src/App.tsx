/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowRight,
  Train,
  Hotel,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingDown,
  Clock,
  ThumbsUp,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { SearchForm } from './components/SearchForm';
import { ResultsView } from './components/ResultsView';
import { Dashboard } from './components/Dashboard';
import { FeedbackForm } from './components/FeedbackForm';
import { TransportDetailModal } from './components/TransportDetailModal';
import { HotelDetailModal } from './components/HotelDetailModal';
import { ChatWidget } from './components/ChatWidget';
import {
  HotelOption,
  SavedTrip,
  SearchQuery,
  TransportOption,
  TripComparisonResult,
  UserFeedback,
  UserProfile,
} from './types/trip';
import {
  getTravelComparison,
  INITIAL_SAVED_TRIPS,
  INITIAL_FEEDBACKS,
  POPULAR_ROUTES,
  SAMPLE_DATA_NOTICE,
} from './data/mockRoutes';

import heroJourneyImg from './assets/images/hero_travel_journey_1790596587521.jpg';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'home' | 'plan' | 'trips' | 'dashboard' | 'feedback'>('home');

  // Active query & comparison result
  const initialQuery: SearchQuery = {
    from: 'Visakhapatnam',
    to: 'Hyderabad',
    date: '2026-10-25',
    travelers: 2,
    needs: {
      transport: true,
      hotels: true,
      weather: false,
      complete: false,
    },
  };

  const [currentQuery, setCurrentQuery] = useState<SearchQuery>(initialQuery);
  const [currentResult, setCurrentResult] = useState<TripComparisonResult>(() =>
    getTravelComparison(initialQuery)
  );

  // Persistence in localStorage
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(() => {
    try {
      const saved = localStorage.getItem('tripwise_saved_trips');
      return saved ? JSON.parse(saved) : INITIAL_SAVED_TRIPS;
    } catch {
      return INITIAL_SAVED_TRIPS;
    }
  });

  const [savedTransports, setSavedTransports] = useState<TransportOption[]>(() => {
    try {
      const saved = localStorage.getItem('tripwise_saved_transports');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedHotels, setSavedHotels] = useState<HotelOption[]>(() => {
    try {
      const saved = localStorage.getItem('tripwise_saved_hotels');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>(() => {
    try {
      const saved = localStorage.getItem('tripwise_feedbacks');
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
    } catch {
      return INITIAL_FEEDBACKS;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('tripwise_profile');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'K. Siri',
            email: 'ksiri4907@gmail.com',
            homeCity: 'Visakhapatnam',
            preferredMode: 'Train',
            comfortPriority: 'Balanced',
            currency: 'INR',
          };
    } catch {
      return {
        name: 'K. Siri',
        email: 'ksiri4907@gmail.com',
        homeCity: 'Visakhapatnam',
        preferredMode: 'Train',
        comfortPriority: 'Balanced',
        currency: 'INR',
      };
    }
  });

  // Modals
  const [activeTransportModal, setActiveTransportModal] = useState<TransportOption | null>(null);
  const [activeHotelModal, setActiveHotelModal] = useState<HotelOption | null>(null);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tripwise_saved_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    localStorage.setItem('tripwise_saved_transports', JSON.stringify(savedTransports));
  }, [savedTransports]);

  useEffect(() => {
    localStorage.setItem('tripwise_saved_hotels', JSON.stringify(savedHotels));
  }, [savedHotels]);

  useEffect(() => {
    localStorage.setItem('tripwise_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('tripwise_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Handle Search Submission
  const handleSearch = (query: SearchQuery) => {
    setCurrentQuery(query);
    const result = getTravelComparison(query);
    setCurrentResult(result);
    setActiveTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Calculated optimal route: ${query.from} → ${query.to}`);
  };

  // Saved Trip Management
  const isCurrentTripSaved = savedTrips.some(
    (st) =>
      st.query.from.toLowerCase() === currentQuery.from.toLowerCase() &&
      st.query.to.toLowerCase() === currentQuery.to.toLowerCase() &&
      st.query.date === currentQuery.date
  );

  const handleToggleSaveTrip = () => {
    if (isCurrentTripSaved) {
      setSavedTrips((prev) =>
        prev.filter(
          (st) =>
            !(
              st.query.from.toLowerCase() === currentQuery.from.toLowerCase() &&
              st.query.to.toLowerCase() === currentQuery.to.toLowerCase() &&
              st.query.date === currentQuery.date
            )
        )
      );
      showToast('Trip removed from saved journeys');
    } else {
      const newSaved: SavedTrip = {
        id: `trip-${Date.now()}`,
        query: currentQuery,
        savedAt: new Date().toISOString().split('T')[0],
        summaryTitle: `${currentQuery.from} → ${currentQuery.to} (${currentQuery.travelers} Traveler${
          currentQuery.travelers > 1 ? 's' : ''
        })`,
        notes: `Selected: ${[
          currentQuery.needs.transport && 'Vehicle',
          currentQuery.needs.hotels && 'Hotels',
          currentQuery.needs.weather && 'Weather',
        ]
          .filter(Boolean)
          .join(', ')}`,
      };
      setSavedTrips((prev) => [newSaved, ...prev]);
      showToast('Trip added to your saved journeys');
    }
  };

  const handleDeleteSavedTrip = (id: string) => {
    setSavedTrips((prev) => prev.filter((t) => t.id !== id));
    showToast('Saved journey removed');
  };

  const handleLoadSavedTrip = (query: SearchQuery) => {
    handleSearch(query);
  };

  // Transport Bookmark
  const handleToggleSaveTransport = (option: TransportOption) => {
    if (savedTransports.some((t) => t.id === option.id)) {
      setSavedTransports((prev) => prev.filter((t) => t.id !== option.id));
      showToast(`Removed ${option.name} from saved items`);
    } else {
      setSavedTransports((prev) => [...prev, option]);
      showToast(`Saved ${option.name}`);
    }
  };

  // Hotel Bookmark
  const handleToggleSaveHotel = (hotel: HotelOption) => {
    if (savedHotels.some((h) => h.id === hotel.id)) {
      setSavedHotels((prev) => prev.filter((h) => h.id !== hotel.id));
      showToast(`Removed ${hotel.name} from saved items`);
    } else {
      setSavedHotels((prev) => [...prev, hotel]);
      showToast(`Saved ${hotel.name}`);
    }
  };

  // Feedback Submission
  const handleFeedbackSubmitted = (newFeedback: UserFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
    showToast('Feedback submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedTrips.length + savedTransports.length + savedHotels.length}
      />

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* TAB 1: HOMEPAGE */}
        {activeTab === 'home' && (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[500px] flex flex-col justify-end p-6 sm:p-12 border border-slate-800 shadow-xl">
              {/* Background Hero Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={heroJourneyImg}
                  alt="Modern express journey"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
              </div>

              {/* Hero Copy */}
              <div className="relative z-10 max-w-2xl space-y-4 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Travel Decision & Comparison Engine</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Your journey, compared intelligently.
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Compare transportation, hotels, weather, prices, and travel options in one simple place.
                </p>
              </div>

              {/* Embedded Search Card on Hero */}
              <div className="relative z-10 w-full">
                <SearchForm
                  initialQuery={currentQuery}
                  onSearch={handleSearch}
                />
              </div>
            </section>

            {/* Core Value Pillars: Why TripWise */}
            <section className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  What is the most suitable way for you to travel?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  TripWise is built for decision-making. No cluttered upsells—just transparent comparisons.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <Train className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Smart Multi-Modal
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Compare high-speed trains (Vande Bharat), direct flights, sleeper buses, and outstation cabs side by side.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Lowest vs Fastest
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Clear transparent badges showing true total costs, journey hours, and comfort indices without hidden fees.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <Hotel className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Hotel Availability
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Distance from destination center, guest ratings, live room inventory status, and verified amenities.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Climate Forecast
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Side-by-side temperature, rain chance, and humidity comparison between your origin and destination.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Demonstration Route: Visakhapatnam -> Hyderabad */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                    Featured Journey Comparison
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Visakhapatnam → Hyderabad
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sample journey: 25 October · 2 Travelers · Real multimodal evaluation
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleSearch({
                      from: 'Visakhapatnam',
                      to: 'Hyderabad',
                      date: '2026-10-25',
                      travelers: 2,
                      needs: { transport: true, hotels: true, weather: false, complete: false },
                    });
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-center"
                >
                  <span>Explore Results</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                </button>
              </div>

              {/* 3 Transport Teaser Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-md">
                      Best Match
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Train</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Vande Bharat Express</h4>
                  <div className="text-xs font-bold text-slate-900 tabular-nums">
                    ₹1,700 <span className="font-normal text-slate-500">(for 2)</span> · 8h 20m · Direct
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Executive chair car comfort, day departure, on-board meals included.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      Cheapest
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Bus</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">IntrCity Volvo Sleeper</h4>
                  <div className="text-xs font-bold text-slate-900 tabular-nums">
                    ₹1,400 <span className="font-normal text-slate-500">(for 2)</span> · 11h 00m · Direct
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Overnight travel saves daytime and 1 hotel stay cost.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded-md">
                      Comfortable
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Private Cab</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Outstation Dedicated Sedan</h4>
                  <div className="text-xs font-bold text-slate-900 tabular-nums">
                    ₹4,500 <span className="font-normal text-slate-500">(flat)</span> · 10h 00m · Direct
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Doorstep pickup and drop with total privacy and flexible halts.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: PLAN TRIP & RESULTS VIEW */}
        {activeTab === 'plan' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Quick Editable Search Bar */}
            <SearchForm
              initialQuery={currentQuery}
              onSearch={handleSearch}
              compactMode={true}
            />

            {/* Results View */}
            <ResultsView
              result={currentResult}
              onModifySearch={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onViewTransportDetails={(t) => setActiveTransportModal(t)}
              onViewHotelDetails={(h) => setActiveHotelModal(h)}
              savedTransportIds={savedTransports.map((t) => t.id)}
              savedHotelIds={savedHotels.map((h) => h.id)}
              onToggleSaveTransport={handleToggleSaveTransport}
              onToggleSaveHotel={handleToggleSaveHotel}
              onSaveTrip={handleToggleSaveTrip}
              isTripSaved={isCurrentTripSaved}
            />
          </div>
        )}

        {/* TAB 3: MY TRIPS */}
        {activeTab === 'trips' && (
          <div className="animate-in fade-in duration-300">
            <Dashboard
              currentResult={currentResult}
              savedTrips={savedTrips}
              savedTransports={savedTransports}
              savedHotels={savedHotels}
              feedbacks={feedbacks}
              userProfile={userProfile}
              onUpdateProfile={setUserProfile}
              onLoadTrip={handleLoadSavedTrip}
              onDeleteSavedTrip={handleDeleteSavedTrip}
              onRemoveSavedTransport={(id) =>
                setSavedTransports((p) => p.filter((t) => t.id !== id))
              }
              onRemoveSavedHotel={(id) =>
                setSavedHotels((p) => p.filter((h) => h.id !== id))
              }
              onFeedbackSubmitted={handleFeedbackSubmitted}
              onViewTransportDetails={(t) => setActiveTransportModal(t)}
              onViewHotelDetails={(h) => setActiveHotelModal(h)}
              onPlanNewTrip={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              defaultSubTab="trips"
            />
          </div>
        )}

        {/* TAB 4: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            <Dashboard
              currentResult={currentResult}
              savedTrips={savedTrips}
              savedTransports={savedTransports}
              savedHotels={savedHotels}
              feedbacks={feedbacks}
              userProfile={userProfile}
              onUpdateProfile={setUserProfile}
              onLoadTrip={handleLoadSavedTrip}
              onDeleteSavedTrip={handleDeleteSavedTrip}
              onRemoveSavedTransport={(id) =>
                setSavedTransports((p) => p.filter((t) => t.id !== id))
              }
              onRemoveSavedHotel={(id) =>
                setSavedHotels((p) => p.filter((h) => h.id !== id))
              }
              onFeedbackSubmitted={handleFeedbackSubmitted}
              onViewTransportDetails={(t) => setActiveTransportModal(t)}
              onViewHotelDetails={(h) => setActiveHotelModal(h)}
              onPlanNewTrip={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              defaultSubTab="overview"
            />
          </div>
        )}

        {/* TAB 5: FEEDBACK */}
        {activeTab === 'feedback' && (
          <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
            <FeedbackForm
              currentTripContext={`${currentQuery.from} → ${currentQuery.to}`}
              onFeedbackSubmitted={handleFeedbackSubmitted}
              feedbacks={feedbacks}
            />
          </div>
        )}
      </main>

      {/* Detail Modals */}
      <TransportDetailModal
        option={activeTransportModal}
        onClose={() => setActiveTransportModal(null)}
        onSave={handleToggleSaveTransport}
        isSaved={
          activeTransportModal
            ? savedTransports.some((t) => t.id === activeTransportModal.id)
            : false
        }
      />

      <HotelDetailModal
        hotel={activeHotelModal}
        onClose={() => setActiveHotelModal(null)}
        onSave={handleToggleSaveHotel}
        isSaved={
          activeHotelModal
            ? savedHotels.some((h) => h.id === activeHotelModal.id)
            : false
        }
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>TripWise</span>
            <span className="text-slate-300 font-normal">|</span>
            <span className="text-xs text-slate-500 font-normal">
              Plan your journey. Compare everything.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="hover:text-slate-900 transition-colors"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('plan')}
              className="hover:text-slate-900 transition-colors"
            >
              Plan Trip
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-slate-900 transition-colors"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('feedback')}
              className="hover:text-slate-900 transition-colors"
            >
              Feedback
            </button>
          </div>

          <div className="text-xs text-slate-400">
            {SAMPLE_DATA_NOTICE}
          </div>
        </div>
      </footer>

      {/* Floating n8n AI Chatbot Widget */}
      <ChatWidget
        currentTrip={currentResult}
        activeQuery={currentQuery}
      />
    </div>
  );
}
