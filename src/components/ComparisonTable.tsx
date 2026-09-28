import React, { useState } from 'react';
import { ArrowUpDown, Train, Bus, Car, Plane, Star, ExternalLink } from 'lucide-react';
import { HotelOption, TransportOption } from '../types/trip';

interface ComparisonTableProps {
  transports?: TransportOption[];
  hotels?: HotelOption[];
  showTransport?: boolean;
  showHotels?: boolean;
  onSelectTransport?: (item: TransportOption) => void;
  onSelectHotel?: (item: HotelOption) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  transports = [],
  hotels = [],
  showTransport = true,
  showHotels = true,
  onSelectTransport,
  onSelectHotel,
}) => {
  const [activeTab, setActiveTab] = useState<'transport' | 'hotels'>(
    showTransport ? 'transport' : 'hotels'
  );
  const [transportSort, setTransportSort] = useState<'price' | 'duration' | 'comfort'>('price');
  const [transportSortAsc, setTransportSortAsc] = useState<boolean>(true);

  const [hotelSort, setHotelSort] = useState<'price' | 'rating' | 'distance'>('rating');
  const [hotelSortAsc, setHotelSortAsc] = useState<boolean>(false);

  // Sorted Transports
  const sortedTransports = [...transports].sort((a, b) => {
    let diff = 0;
    if (transportSort === 'price') {
      diff = a.price - b.price;
    } else if (transportSort === 'duration') {
      diff = a.durationMinutes - b.durationMinutes;
    } else if (transportSort === 'comfort') {
      const order = { High: 3, Medium: 2, Standard: 1 };
      diff = order[a.comfort] - order[b.comfort];
    }
    return transportSortAsc ? diff : -diff;
  });

  // Sorted Hotels
  const sortedHotels = [...hotels].sort((a, b) => {
    let diff = 0;
    if (hotelSort === 'price') {
      diff = a.pricePerNight - b.pricePerNight;
    } else if (hotelSort === 'rating') {
      diff = a.rating - b.rating;
    } else if (hotelSort === 'distance') {
      diff = a.distanceKm - b.distanceKm;
    }
    return hotelSortAsc ? diff : -diff;
  });

  const toggleTransportSort = (col: 'price' | 'duration' | 'comfort') => {
    if (transportSort === col) {
      setTransportSortAsc(!transportSortAsc);
    } else {
      setTransportSort(col);
      setTransportSortAsc(true);
    }
  };

  const toggleHotelSort = (col: 'price' | 'rating' | 'distance') => {
    if (hotelSort === col) {
      setHotelSortAsc(!hotelSortAsc);
    } else {
      setHotelSort(col);
      setHotelSortAsc(col !== 'rating'); // default descending for rating
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'train':
        return <Train className="w-4 h-4 text-teal-700" />;
      case 'flight':
        return <Plane className="w-4 h-4 text-sky-700" />;
      case 'cab':
        return <Car className="w-4 h-4 text-amber-700" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-indigo-700" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Section Header & Tab Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Smart Side-by-Side Comparison
          </h3>
          <p className="text-xs text-slate-500">
            Compare key parameters directly to choose your best option
          </p>
        </div>

        {showTransport && showHotels && (
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('transport')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'transport'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Transportation ({transports.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hotels')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'hotels'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hotels ({hotels.length})
            </button>
          </div>
        )}
      </div>

      {/* Transportation Table */}
      {activeTab === 'transport' && showTransport && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200/80 uppercase font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4 sm:px-6">Option</th>
                <th
                  onClick={() => toggleTransportSort('price')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleTransportSort('duration')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Time</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleTransportSort('comfort')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Comfort</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {sortedTransports.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/75 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        {getTransportIcon(t.type)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {t.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal">
                          {t.categoryTag} · {t.stops === 0 ? 'Direct' : `${t.stops} Stops`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums font-bold text-slate-900 text-sm">
                    ₹{t.price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 tabular-nums text-slate-700">
                    {t.duration}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-semibold ${
                        t.comfort === 'High'
                          ? 'text-purple-700'
                          : t.comfort === 'Medium'
                          ? 'text-teal-700'
                          : 'text-slate-600'
                      }`}
                    >
                      {t.comfort}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-semibold text-xs ${
                        t.status === 'Available'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectTransport?.(t)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Hotels Table */}
      {activeTab === 'hotels' && showHotels && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200/80 uppercase font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4 sm:px-6">Hotel</th>
                <th
                  onClick={() => toggleHotelSort('price')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Price / Night</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleHotelSort('rating')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Rating</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleHotelSort('distance')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Distance</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {sortedHotels.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/75 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div>
                      <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                        {h.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        {h.location}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums font-bold text-slate-900 text-sm">
                    ₹{h.pricePerNight.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 tabular-nums">
                    <div className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{h.rating}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 tabular-nums text-slate-700">
                    {h.distanceKm} km
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-semibold text-xs ${
                        h.roomStatus === 'Available'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {h.roomStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectHotel?.(h)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
