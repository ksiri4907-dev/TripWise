import React, { useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  Bookmark,
  Sparkles,
  MessageSquare,
  User,
  Train,
  Hotel,
  CloudSun,
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  ExternalLink,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Star,
} from 'lucide-react';
import {
  HotelOption,
  SavedTrip,
  SearchQuery,
  TransportOption,
  TripComparisonResult,
  UserFeedback,
  UserProfile,
} from '../types/trip';
import { FeedbackForm } from './FeedbackForm';

interface DashboardProps {
  currentResult: TripComparisonResult | null;
  savedTrips: SavedTrip[];
  savedTransports: TransportOption[];
  savedHotels: HotelOption[];
  feedbacks: UserFeedback[];
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onLoadTrip: (query: SearchQuery) => void;
  onDeleteSavedTrip: (id: string) => void;
  onRemoveSavedTransport: (id: string) => void;
  onRemoveSavedHotel: (id: string) => void;
  onFeedbackSubmitted: (fb: UserFeedback) => void;
  onViewTransportDetails: (option: TransportOption) => void;
  onViewHotelDetails: (hotel: HotelOption) => void;
  onPlanNewTrip: () => void;
  defaultSubTab?: 'overview' | 'trips' | 'recommendations' | 'saved' | 'feedback' | 'profile';
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentResult,
  savedTrips,
  savedTransports,
  savedHotels,
  feedbacks,
  userProfile,
  onUpdateProfile,
  onLoadTrip,
  onDeleteSavedTrip,
  onRemoveSavedTransport,
  onRemoveSavedHotel,
  onFeedbackSubmitted,
  onViewTransportDetails,
  onViewHotelDetails,
  onPlanNewTrip,
  defaultSubTab = 'overview',
}) => {
  const [activeSection, setActiveSection] = useState<
    'overview' | 'trips' | 'recommendations' | 'saved' | 'feedback' | 'profile'
  >(defaultSubTab);

  // Profile editing local state
  const [profileForm, setProfileForm] = useState<UserProfile>(userProfile);
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  const activeQuery = currentResult?.query;
  const activeNeeds = activeQuery?.needs;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Sidebar for Desktop / Tab Bar for Mobile */}
        <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/70 p-4 sm:p-5 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Workspace
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Personal Dashboard
              </h3>
            </div>

            {/* Navigation Menu */}
            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-2 lg:pb-0">
              <button
                type="button"
                onClick={() => setActiveSection('overview')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors shrink-0 ${
                  activeSection === 'overview'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </div>
                {activeQuery && (
                  <span className="w-2 h-2 rounded-full bg-teal-400 hidden lg:block" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('trips')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors shrink-0 ${
                  activeSection === 'trips'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4" />
                  <span>My Trips</span>
                </div>
                <span className="text-[11px] opacity-75 tabular-nums">
                  {savedTrips.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('recommendations')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors shrink-0 ${
                  activeSection === 'recommendations'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Recommendations</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('saved')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors shrink-0 ${
                  activeSection === 'saved'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4" />
                  <span>Saved Items</span>
                </div>
                <span className="text-[11px] opacity-75 tabular-nums">
                  {savedTransports.length + savedHotels.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('feedback')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors shrink-0 ${
                  activeSection === 'feedback'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Feedback</span>
                </div>
                <span className="text-[11px] opacity-75 tabular-nums">
                  {feedbacks.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('profile')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors shrink-0 ${
                  activeSection === 'profile'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Profile & Bias</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Quick Plan New Trip CTA in sidebar */}
          <div className="pt-6 hidden lg:block border-t border-slate-200">
            <button
              type="button"
              onClick={onPlanNewTrip}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>Plan New Journey</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 p-5 sm:p-8 overflow-y-auto">
          {/* SECTION 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {currentResult ? (
                <>
                  {/* Active Trip Header */}
                  <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                        Active Journey Summary
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold">
                        {currentResult.query.from} → {currentResult.query.to}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        {new Date(currentResult.query.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}{' '}
                        · {currentResult.query.travelers} Traveler
                        {currentResult.query.travelers > 1 ? 's' : ''}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onPlanNewTrip}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl transition-colors shrink-0"
                    >
                      Compare Details
                    </button>
                  </div>

                  {/* Dynamically Adapted Sections Based STRICTLY on User Need */}
                  {(activeNeeds?.transport || activeNeeds?.complete) && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <Train className="w-4 h-4 text-teal-700" />
                          <h5 className="text-sm font-bold text-slate-900">
                            Recommended Transportation
                          </h5>
                        </div>
                        <span className="text-xs text-teal-700 font-semibold">
                          {currentResult.transports[0]?.categoryTag}
                        </span>
                      </div>

                      {/* Best Matching Vehicle */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h6 className="text-sm font-bold text-slate-900">
                            {currentResult.transports[0]?.name}
                          </h6>
                          <p className="text-xs text-slate-500">
                            {currentResult.transports[0]?.operator} · Comfort:{' '}
                            <strong className="text-slate-800 font-semibold">
                              {currentResult.transports[0]?.comfort}
                            </strong>
                          </p>
                        </div>
                        <div className="text-right sm:text-right">
                          <span className="text-base font-bold text-slate-900 tabular-nums block">
                            ₹{currentResult.transports[0]?.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-500 tabular-nums">
                            {currentResult.transports[0]?.duration} ·{' '}
                            {currentResult.transports[0]?.status}
                          </span>
                        </div>
                      </div>

                      {/* Transport Alternatives list */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-semibold text-slate-400 block">
                          Alternatives Evaluated:
                        </span>
                        {currentResult.transports.slice(1, 3).map((alt) => (
                          <div
                            key={alt.id}
                            className="flex items-center justify-between text-xs text-slate-600 py-1 border-b border-slate-100 last:border-0"
                          >
                            <span>
                              {alt.name} ({alt.categoryTag})
                            </span>
                            <span className="font-semibold text-slate-900 tabular-nums">
                              ₹{alt.price.toLocaleString('en-IN')} · {alt.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(activeNeeds?.hotels || activeNeeds?.complete) && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <Hotel className="w-4 h-4 text-teal-700" />
                          <h5 className="text-sm font-bold text-slate-900">
                            Recommended Hotel Availability
                          </h5>
                        </div>
                        <span className="text-xs text-slate-500">
                          {currentResult.hotels.length} options evaluated
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentResult.hotels.slice(0, 2).map((hotel) => (
                          <div
                            key={hotel.id}
                            className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-2"
                          >
                            <div>
                              <h6 className="text-xs font-bold text-slate-900">
                                {hotel.name}
                              </h6>
                              <p className="text-[11px] text-slate-500">
                                {hotel.location} · {hotel.distanceKm} km away
                              </p>
                              <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-700 font-semibold">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span>{hotel.rating}</span>
                                <span className="text-slate-400">·</span>
                                <span className="text-emerald-700 font-medium">
                                  {hotel.roomStatus}
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-slate-900 tabular-nums block">
                                ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-slate-400">/ night</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(activeNeeds?.weather || activeNeeds?.complete) && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3">
                        <CloudSun className="w-4 h-4 text-teal-700" />
                        <h5 className="text-sm font-bold text-slate-900">
                          Weather Snapshot
                        </h5>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl">
                          <span className="text-slate-400 block text-[11px]">
                            {currentResult.weather.origin.city}
                          </span>
                          <span className="text-base font-bold text-slate-900 tabular-nums">
                            {currentResult.weather.origin.tempC}°C
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {currentResult.weather.origin.condition}
                          </span>
                        </div>
                        <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100">
                          <span className="text-teal-800 block text-[11px]">
                            {currentResult.weather.destination.city}
                          </span>
                          <span className="text-base font-bold text-slate-900 tabular-nums">
                            {currentResult.weather.destination.tempC}°C
                          </span>
                          <span className="text-[11px] text-slate-600 block truncate">
                            {currentResult.weather.destination.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <Compass className="w-10 h-10 text-teal-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">
                    No active trip search loaded
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Start a comparison or load one of your saved journeys to view your customized dashboard summary.
                  </p>
                  <button
                    type="button"
                    onClick={onPlanNewTrip}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Start Trip Comparison
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: MY TRIPS */}
          {activeSection === 'trips' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Saved & Past Journeys
                  </h4>
                  <p className="text-xs text-slate-500">
                    One-click reload to re-run live comparisons and availability
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onPlanNewTrip}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  + New Trip
                </button>
              </div>

              {savedTrips.length > 0 ? (
                <div className="space-y-3">
                  {savedTrips.map((st) => (
                    <div
                      key={st.id}
                      className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-slate-900">
                            {st.summaryTitle}
                          </h5>
                          <span className="text-[11px] text-slate-400 tabular-nums">
                            Saved {st.savedAt}
                          </span>
                        </div>
                        {st.notes && (
                          <p className="text-xs text-slate-500">{st.notes}</p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-teal-700 font-medium">
                          {st.query.needs.transport && <span>Vehicle</span>}
                          {st.query.needs.hotels && <span>· Hotels</span>}
                          {st.query.needs.weather && <span>· Weather</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => onDeleteSavedTrip(st.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete trip"
                          aria-label="Delete saved trip"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onLoadTrip(st.query)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Load & Compare</span>
                          <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-xs text-slate-500">
                    You have no saved trips yet. Click "Save Trip" on any search result to save it here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: RECOMMENDATIONS */}
          {activeSection === 'recommendations' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <h4 className="text-base font-bold text-slate-900">
                  Personalized Decision Recommendations
                </h4>
                <p className="text-xs text-slate-500">
                  TripWise contextual matching insights based on duration, costs, and travel comfort
                </p>
              </div>

              {currentResult ? (
                <div className="space-y-4">
                  <div className="p-5 bg-teal-50/60 rounded-2xl border border-teal-200/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-800" />
                      <h5 className="text-sm font-bold text-teal-950">
                        Top Route Recommendation: {currentResult.transports[0]?.name}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentResult.transports[0]?.matchReason}
                    </p>
                    <div className="pt-2 flex items-center gap-3 text-xs text-teal-900 font-semibold">
                      <span>₹{currentResult.transports[0]?.price.toLocaleString('en-IN')} total</span>
                      <span>·</span>
                      <span>{currentResult.transports[0]?.duration}</span>
                      <span>·</span>
                      <span>Comfort: {currentResult.transports[0]?.comfort}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentResult.transports.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            {t.name}
                          </span>
                          <span className="text-[11px] font-semibold text-teal-700">
                            {t.categoryTag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{t.matchReason}</p>
                        <button
                          type="button"
                          onClick={() => onViewTransportDetails(t)}
                          className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1 pt-1"
                        >
                          <span>Inspect route & amenities</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-xs text-slate-500">
                    Perform a trip search to receive tailored transportation and hotel recommendations.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: SAVED ITEMS */}
          {activeSection === 'saved' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-200">
                <h4 className="text-base font-bold text-slate-900">
                  Saved Vehicles & Hotels
                </h4>
                <p className="text-xs text-slate-500">
                  Quick access to vehicles and accommodations you bookmarked
                </p>
              </div>

              {/* Saved Transports */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Bookmarked Vehicles ({savedTransports.length})
                </h5>
                {savedTransports.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedTransports.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between gap-2"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            {t.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            ₹{t.price.toLocaleString('en-IN')} · {t.duration} · {t.categoryTag}
                          </span>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onViewTransportDetails(t)}
                              className="text-xs font-semibold text-teal-700 hover:underline"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveSavedTransport(t.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No vehicles saved yet.</p>
                )}
              </div>

              {/* Saved Hotels */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Bookmarked Hotels ({savedHotels.length})
                </h5>
                {savedHotels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedHotels.map((h) => (
                      <div
                        key={h.id}
                        className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between gap-2"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            {h.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            ₹{h.pricePerNight.toLocaleString('en-IN')}/night · {h.location}
                          </span>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onViewHotelDetails(h)}
                              className="text-xs font-semibold text-teal-700 hover:underline"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveSavedHotel(h.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No hotels saved yet.</p>
                )}
              </div>
            </div>
          )}

          {/* SECTION 5: FEEDBACK */}
          {activeSection === 'feedback' && (
            <div>
              <FeedbackForm
                currentTripContext={
                  currentResult
                    ? `${currentResult.query.from} → ${currentResult.query.to}`
                    : undefined
                }
                feedbacks={feedbacks}
                onFeedbackSubmitted={onFeedbackSubmitted}
              />
            </div>
          )}

          {/* SECTION 6: PROFILE */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-200">
                <h4 className="text-base font-bold text-slate-900">
                  User Profile & Travel Preferences
                </h4>
                <p className="text-xs text-slate-500">
                  Customize your default preferences to automatically bias TripWise recommendations
                </p>
              </div>

              {profileSavedToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Preferences saved successfully.</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Default Home City
                  </label>
                  <input
                    type="text"
                    value={profileForm.homeCity}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, homeCity: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Comfort & Budget Priority
                  </label>
                  <select
                    value={profileForm.comfortPriority}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        comfortPriority: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Balanced">Balanced (Best Price-to-Comfort Ratio)</option>
                    <option value="Budget">Budget First (Lowest Estimated Cost)</option>
                    <option value="Comfort">Comfort & Speed Priority (Executive Travel)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Preferred Mode of Travel
                  </label>
                  <select
                    value={profileForm.preferredMode}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        preferredMode: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Any">No Preference (Compare All)</option>
                    <option value="Train">Train (Vande Bharat / Express)</option>
                    <option value="Flight">Flight (Fastest Air)</option>
                    <option value="Cab">Cab / Outstation Chauffeur</option>
                    <option value="Bus">Luxury Sleeper Bus</option>
                  </select>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
