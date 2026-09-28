import React, { useState } from 'react';
import { Star, MapPin, Bookmark, Check, ArrowRight, Building } from 'lucide-react';
import { HotelOption } from '../types/trip';

interface HotelCardProps {
  hotel: HotelOption;
  onViewHotel: (hotel: HotelOption) => void;
  isSaved?: boolean;
  onToggleSave?: (hotel: HotelOption) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onViewHotel,
  isSaved = false,
  onToggleSave,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
      <div>
        {/* Hotel Image with Zero-Broken-Image Fallback */}
        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
          {!imageError ? (
            <img
              src={hotel.image}
              alt={hotel.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 text-center">
              <Building className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-semibold text-slate-600">{hotel.name}</span>
            </div>
          )}

          {/* Availability Tag */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg backdrop-blur-md shadow-xs ${
                hotel.roomStatus === 'Available'
                  ? 'bg-white/90 text-emerald-800 border border-emerald-200/60'
                  : 'bg-white/90 text-amber-800 border border-amber-200/60'
              }`}
            >
              {hotel.roomStatus}
            </span>
          </div>

          {/* Bookmark Button */}
          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(hotel)}
              className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md shadow-xs transition-colors ${
                isSaved
                  ? 'bg-teal-600 text-white'
                  : 'bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save hotel'}
              aria-label="Save hotel"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          )}

          {/* Distance Tag at bottom of photo */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 text-white backdrop-blur-md text-xs font-medium">
            <MapPin className="w-3 h-3 text-teal-300" />
            <span>{hotel.distanceKm} km from center</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-base font-semibold text-slate-900 tracking-tight leading-snug">
              {hotel.name}
            </h4>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-900 tabular-nums">
                {hotel.rating}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            {hotel.location} · {hotel.reviewCount} verified reviews
          </p>

          {/* Match note */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            {hotel.matchReason}
          </p>

          {/* Amenities tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, i) => (
              <span
                key={i}
                className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[11px] text-slate-400 font-medium px-1 py-0.5">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing and Action */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Per night</span>
          <span className="text-lg font-bold text-slate-900 tabular-nums">
            ₹{hotel.pricePerNight.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onViewHotel(hotel)}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>View Hotel</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
        </button>
      </div>
    </div>
  );
};
