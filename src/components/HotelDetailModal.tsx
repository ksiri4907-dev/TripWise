import React, { useState } from 'react';
import { X, Star, MapPin, Check, Building, ShieldCheck, IndianRupee, Compass } from 'lucide-react';
import { HotelOption } from '../types/trip';

interface HotelDetailModalProps {
  hotel: HotelOption | null;
  onClose: () => void;
  onSave?: (hotel: HotelOption) => void;
  isSaved?: boolean;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({
  hotel,
  onClose,
  onSave,
  isSaved = false,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!hotel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Image & Header */}
        <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
          {!imageError ? (
            <img
              src={hotel.image}
              alt={hotel.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <Building className="w-10 h-10 text-slate-400 mb-2" />
              <span className="text-sm font-semibold text-slate-700">{hotel.name}</span>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-white flex items-center gap-2">
            <div className="flex items-center gap-1 font-bold text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-sm tabular-nums">{hotel.rating}</span>
            </div>
            <span className="text-xs text-slate-300">({hotel.reviewCount} verified reviews)</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {hotel.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>{hotel.location} · {hotel.distanceKm} km from central landmark</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 block font-medium">Starting from</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">
                  ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-slate-500 block">/ night</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <h4 className="font-semibold text-slate-900 mb-1">About the Property</h4>
            <p>{hotel.description}</p>
          </div>

          {/* Why TripWise recommends */}
          <div className="p-3.5 bg-teal-50/50 rounded-xl border border-teal-100">
            <h4 className="text-xs font-semibold text-teal-900 uppercase tracking-wider mb-1">
              TripWise Match Note
            </h4>
            <p className="text-xs text-slate-700">
              {hotel.matchReason}
            </p>
          </div>

          {/* Room info */}
          <div className="p-3.5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-900 mb-2">
              Featured Room Type
            </h4>
            <div className="flex items-center justify-between text-xs text-slate-700">
              <span className="font-medium">{hotel.roomType}</span>
              <span className="font-semibold text-emerald-700">{hotel.roomStatus}</span>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Property Amenities & Highlights
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hotel.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation */}
          <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Policy:</strong> {hotel.cancellationPolicy}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            Sample data — connect API for live booking
          </div>

          <div className="flex items-center gap-2">
            {onSave && (
              <button
                type="button"
                onClick={() => onSave(hotel)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-teal-50 border-teal-300 text-teal-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isSaved ? 'Saved Hotel' : 'Save Hotel'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
