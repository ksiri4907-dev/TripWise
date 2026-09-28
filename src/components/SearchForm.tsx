import React, { useState } from 'react';
import { ArrowRightLeft, Calendar, Users, MapPin, Check, Train, Hotel, CloudSun, Sparkles } from 'lucide-react';
import { SearchNeeds, SearchQuery } from '../types/trip';
import { POPULAR_ROUTES } from '../data/mockRoutes';

interface SearchFormProps {
  initialQuery?: SearchQuery;
  onSearch: (query: SearchQuery) => void;
  compactMode?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  initialQuery,
  onSearch,
  compactMode = false,
}) => {
  const [from, setFrom] = useState(initialQuery?.from || 'Visakhapatnam');
  const [to, setTo] = useState(initialQuery?.to || 'Hyderabad');
  const [date, setDate] = useState(initialQuery?.date || '2026-10-25');
  const [travelers, setTravelers] = useState(initialQuery?.travelers || 2);
  const [needs, setNeeds] = useState<SearchNeeds>(
    initialQuery?.needs || {
      transport: true,
      hotels: true,
      weather: false,
      complete: false,
    }
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleToggleNeed = (key: keyof SearchNeeds) => {
    setErrorMsg(null);
    if (key === 'complete') {
      const nextComplete = !needs.complete;
      setNeeds({
        transport: nextComplete,
        hotels: nextComplete,
        weather: nextComplete,
        complete: nextComplete,
      });
      return;
    }

    const updated = {
      ...needs,
      [key]: !needs[key],
    };

    // If all individual ones are true, complete is true; otherwise false
    if (updated.transport && updated.hotels && updated.weather) {
      updated.complete = true;
    } else {
      updated.complete = false;
    }

    setNeeds(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim()) {
      setErrorMsg('Please specify a departure origin (From).');
      return;
    }
    if (!to.trim()) {
      setErrorMsg('Please specify a destination (To).');
      return;
    }
    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setErrorMsg('Origin and destination cannot be identical.');
      return;
    }
    if (!needs.transport && !needs.hotels && !needs.weather && !needs.complete) {
      setErrorMsg('Please select at least one requirement (Vehicle, Hotel, or Weather).');
      return;
    }

    setErrorMsg(null);
    onSearch({
      from: from.trim(),
      to: to.trim(),
      date,
      travelers: Math.max(1, Number(travelers)),
      needs,
    });
  };

  const handlePopularRouteClick = (route: typeof POPULAR_ROUTES[0]) => {
    setFrom(route.from);
    setTo(route.to);
    setTravelers(route.travelers);
    setErrorMsg(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Search Input Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* From Input */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              From
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-teal-600 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Starting city (e.g. Visakhapatnam)"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center -my-1 md:my-0">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors focus-visible:outline-teal-500"
              title="Swap Origin and Destination"
              aria-label="Swap Origin and Destination"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Input */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              To
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-slate-700 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination (e.g. Hyderabad)"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Travel Date */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Travel Date
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Number of Travelers */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Travelers
            </label>
            <div className="relative flex items-center">
              <Users className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value={1}>1 Traveler</option>
                <option value={2}>2 Travelers</option>
                <option value={3}>3 Travelers</option>
                <option value={4}>4 Travelers</option>
                <option value={5}>5 Travelers</option>
                <option value={6}>6+ Travelers</option>
              </select>
            </div>
          </div>
        </div>

        {/* What do you need? Selection Section */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
            <h3 className="text-sm font-semibold text-slate-900">
              What do you need?
            </h3>
            <span className="text-xs text-slate-500">
              TripWise will only display sections you select
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Best vehicle / transportation */}
            <button
              type="button"
              onClick={() => handleToggleNeed('transport')}
              className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                needs.transport
                  ? 'border-teal-600 bg-teal-50/50 text-slate-900'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Train className={`w-4 h-4 ${needs.transport ? 'text-teal-700' : 'text-slate-500'}`} />
                  <span className="text-xs font-semibold">Best Vehicle</span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Train, Cab, Bus, Flight
                </p>
              </div>
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                  needs.transport
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {needs.transport && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            {/* Hotel availability */}
            <button
              type="button"
              onClick={() => handleToggleNeed('hotels')}
              className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                needs.hotels
                  ? 'border-teal-600 bg-teal-50/50 text-slate-900'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Hotel className={`w-4 h-4 ${needs.hotels ? 'text-teal-700' : 'text-slate-500'}`} />
                  <span className="text-xs font-semibold">Hotel Availability</span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Rates, rooms, amenities
                </p>
              </div>
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                  needs.hotels
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {needs.hotels && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            {/* Weather information */}
            <button
              type="button"
              onClick={() => handleToggleNeed('weather')}
              className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                needs.weather
                  ? 'border-teal-600 bg-teal-50/50 text-slate-900'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <CloudSun className={`w-4 h-4 ${needs.weather ? 'text-teal-700' : 'text-slate-500'}`} />
                  <span className="text-xs font-semibold">Weather</span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Temp, rain & humidity
                </p>
              </div>
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                  needs.weather
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {needs.weather && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            {/* Complete trip comparison */}
            <button
              type="button"
              onClick={() => handleToggleNeed('complete')}
              className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                needs.complete
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className={`w-4 h-4 ${needs.complete ? 'text-teal-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-semibold">Complete Trip</span>
                </div>
                <p className={`text-[11px] hidden sm:block ${needs.complete ? 'text-slate-300' : 'text-slate-500'}`}>
                  Compare everything
                </p>
              </div>
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                  needs.complete
                    ? 'bg-teal-500 border-teal-500 text-slate-900'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {needs.complete && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        {/* Submit Bar & Quick Popular Routes */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {!compactMode && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-500">
              <span className="shrink-0 font-medium text-slate-400">Popular:</span>
              {POPULAR_ROUTES.map((route) => (
                <button
                  key={`${route.from}-${route.to}`}
                  type="button"
                  onClick={() => handlePopularRouteClick(route)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap"
                >
                  {route.from} → {route.to}
                </button>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="sm:ml-auto w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
          >
            Plan My Trip
          </button>
        </div>
      </div>
    </form>
  );
};
