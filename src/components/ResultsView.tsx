import React, { useState } from 'react';
import { ArrowLeft, ArrowUpDown, Filter, SlidersHorizontal, LayoutGrid, Table as TableIcon, Sparkles, Train, Hotel, CloudSun, Check, Bookmark, Share2 } from 'lucide-react';
import { HotelOption, SearchQuery, TransportOption, TripComparisonResult, WeatherComparison } from '../types/trip';
import { SAMPLE_DATA_NOTICE } from '../data/mockRoutes';
import { TransportCard } from './TransportCard';
import { HotelCard } from './HotelCard';
import { WeatherCard } from './WeatherCard';
import { ComparisonTable } from './ComparisonTable';

interface ResultsViewProps {
  result: TripComparisonResult;
  onModifySearch: () => void;
  onViewTransportDetails: (option: TransportOption) => void;
  onViewHotelDetails: (hotel: HotelOption) => void;
  savedTransportIds: string[];
  savedHotelIds: string[];
  onToggleSaveTransport: (option: TransportOption) => void;
  onToggleSaveHotel: (hotel: HotelOption) => void;
  onSaveTrip: () => void;
  isTripSaved: boolean;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onModifySearch,
  onViewTransportDetails,
  onViewHotelDetails,
  savedTransportIds,
  savedHotelIds,
  onToggleSaveTransport,
  onToggleSaveHotel,
  onSaveTrip,
  isTripSaved,
}) => {
  const { query, transports, hotels, weather, estimatedBudget } = result;
  const needs = query.needs;

  // View state: cards vs comparison table
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Transport filter/sort
  const [transportSort, setTransportSort] = useState<'recommended' | 'price-asc' | 'duration-asc'>('recommended');

  // Hotel filters
  const [hotelMaxPrice, setHotelMaxPrice] = useState<number>(5000);
  const [hotelMinRating, setHotelMinRating] = useState<number>(4.0);
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filtered Transports
  const sortedTransports = [...transports].sort((a, b) => {
    if (transportSort === 'price-asc') return a.price - b.price;
    if (transportSort === 'duration-asc') return a.durationMinutes - b.durationMinutes;
    // recommended: Best match first
    const rank = { 'Best Match': 1, 'Fastest': 2, 'Cheapest': 3, 'Comfortable': 4 };
    return (rank[a.categoryTag] || 99) - (rank[b.categoryTag] || 99);
  });

  // Filtered Hotels
  const filteredHotels = hotels.filter((h) => {
    if (h.pricePerNight > hotelMaxPrice) return false;
    if (h.rating < hotelMinRating) return false;
    if (selectedAmenity !== 'all' && !h.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()))) {
      return false;
    }
    return true;
  });

  // Format date readable
  const formattedDate = new Date(query.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Trip Overview Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={onModifySearch}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
              <span>Modify search criteria</span>
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {query.from} <span className="text-teal-400">→</span> {query.to}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {formattedDate} · {query.travelers} Traveler{query.travelers > 1 ? 's' : ''}
              <span className="text-slate-500 mx-2">·</span>
              <span className="text-teal-300">
                {needs.complete
                  ? 'Complete Trip Comparison'
                  : [
                      needs.transport && 'Vehicle Comparison',
                      needs.hotels && 'Hotels',
                      needs.weather && 'Weather',
                    ]
                      .filter(Boolean)
                      .join(' + ')}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onSaveTrip}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isTripSaved
                  ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isTripSaved ? 'fill-teal-300' : ''}`} />
              <span>{isTripSaved ? 'Trip Saved' : 'Save Trip'}</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Smart Cards View"
                aria-label="Smart Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Smart Comparison Table"
                aria-label="Smart Comparison Table"
              >
                <TableIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Compare</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real Data Notice Banner */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            {SAMPLE_DATA_NOTICE}
          </span>
          <span className="text-slate-400">
            TripWise Engine · Evaluated {transports.length} transit routes & {hotels.length} verified stays
          </span>
        </div>
      </div>

      {/* Complete Trip Summary Strip (Only if Complete Trip is selected) */}
      {needs.complete && (
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-teal-800/40">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">
              TripWise Complete Trip Overview
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {result.summaryRecommendation}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Budget Option Total</span>
              <span className="text-base font-bold text-emerald-400 tabular-nums">
                ₹{estimatedBudget.budgetTotal.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-400 block">Bus + Transit Stay</span>
            </div>
            <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
              <span className="text-teal-300 block mb-0.5">Recommended Trip Total</span>
              <span className="text-base font-bold text-white tabular-nums">
                ₹{estimatedBudget.recommendedTotal.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-400 block">Vande Bharat / Train + Premier Hotel</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Fastest & Luxury Total</span>
              <span className="text-base font-bold text-sky-400 tabular-nums">
                ₹{estimatedBudget.premiumTotal.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-400 block">Flight / Cab + Boutique Suite</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Side-by-Side Comparison Table (if table view active) */}
      {viewMode === 'table' && (
        <ComparisonTable
          transports={transports}
          hotels={hotels}
          showTransport={needs.transport || needs.complete}
          showHotels={needs.hotels || needs.complete}
          onSelectTransport={onViewTransportDetails}
          onSelectHotel={onViewHotelDetails}
        />
      )}

      {/* 3. Best Vehicle / Transportation Section (ONLY IF REQUESTED) */}
      {(needs.transport || needs.complete) && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Train className="w-5 h-5 text-teal-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  Best Transportation Options
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Ranked by speed, pricing, comfort, and journey reliability
              </p>
            </div>

            {/* Transport Sort */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Sort by:</span>
              <select
                value={transportSort}
                onChange={(e) => setTransportSort(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="recommended">TripWise Best Match</option>
                <option value="price-asc">Lowest Price (Cheapest)</option>
                <option value="duration-asc">Shortest Time (Fastest)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {sortedTransports.map((option) => (
              <TransportCard
                key={option.id}
                option={option}
                onViewDetails={onViewTransportDetails}
                isSaved={savedTransportIds.includes(option.id)}
                onToggleSave={onToggleSaveTransport}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. Hotel Availability Section (ONLY IF REQUESTED) */}
      {(needs.hotels || needs.complete) && (
        <section className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Hotel className="w-5 h-5 text-teal-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  Hotel Availability in {query.to}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Verified hotels with direct pricing, distance from center, and live status
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:self-center px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 text-slate-700 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>{showFilters ? 'Hide Filters' : 'Filter Hotels'}</span>
            </button>
          </div>

          {/* Interactive Hotel Filters */}
          {showFilters && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-200">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Max Price / Night: <span className="text-slate-900 font-bold tabular-nums">₹{hotelMaxPrice.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min={1500}
                  max={6000}
                  step={200}
                  value={hotelMaxPrice}
                  onChange={(e) => setHotelMaxPrice(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Minimum Guest Rating
                </label>
                <select
                  value={hotelMinRating}
                  onChange={(e) => setHotelMinRating(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-800"
                >
                  <option value={4.0}>4.0+ Stars (Any Good)</option>
                  <option value={4.4}>4.4+ Stars (Very Good)</option>
                  <option value={4.7}>4.7+ Stars (Exceptional)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Required Amenity
                </label>
                <select
                  value={selectedAmenity}
                  onChange={(e) => setSelectedAmenity(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-800"
                >
                  <option value="all">All Amenities</option>
                  <option value="breakfast">Complimentary Breakfast</option>
                  <option value="pool">Swimming Pool / Spa</option>
                  <option value="transit">Near Transit Station</option>
                  <option value="wi-fi">High-Speed Wi-Fi</option>
                </select>
              </div>
            </div>
          )}

          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onViewHotel={onViewHotelDetails}
                  isSaved={savedHotelIds.includes(hotel.id)}
                  onToggleSave={onToggleSaveHotel}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                No hotels match your current filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setHotelMaxPrice(6000);
                  setHotelMinRating(4.0);
                  setSelectedAmenity('all');
                }}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                Reset hotel filters
              </button>
            </div>
          )}
        </section>
      )}

      {/* 5. Weather Information Section (ONLY IF REQUESTED) */}
      {(needs.weather || needs.complete) && (
        <section className="space-y-4 pt-4">
          <WeatherCard weather={weather} />
        </section>
      )}
    </div>
  );
};
