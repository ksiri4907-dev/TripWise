import React from 'react';
import { X, Train, Plane, Car, Bus, CheckCircle2, AlertCircle, Clock, ShieldCheck, Luggage, IndianRupee, MapPin } from 'lucide-react';
import { TransportOption } from '../types/trip';

interface TransportDetailModalProps {
  option: TransportOption | null;
  onClose: () => void;
  onSave?: (option: TransportOption) => void;
  isSaved?: boolean;
}

export const TransportDetailModal: React.FC<TransportDetailModalProps> = ({
  option,
  onClose,
  onSave,
  isSaved = false,
}) => {
  if (!option) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-teal-100/70 text-teal-800">
                {option.categoryTag}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {option.operator}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {option.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Estimated Fare</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                ₹{option.price.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Duration</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {option.duration}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Comfort Level</span>
              <span className="text-sm font-bold text-slate-900">
                {option.comfort}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Availability</span>
              <span className="text-sm font-bold text-emerald-700">
                {option.status}
              </span>
            </div>
          </div>

          {/* Schedule & Route Timeline */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Route & Schedule
            </h4>
            <div className="relative pl-6 border-l-2 border-teal-500 space-y-6 text-sm">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-teal-500 border-2 border-white" />
                <div className="font-semibold text-slate-900 tabular-nums">
                  {option.departureTime}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {option.departureStation}
                </div>
              </div>

              <div className="text-xs text-slate-400 italic">
                {option.duration} travel time · {option.stops === 0 ? 'Direct Non-Stop' : `${option.stops} intermediate stops`}
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-white" />
                <div className="font-semibold text-slate-900 tabular-nums">
                  {option.arrivalTime}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {option.arrivalStation}
                </div>
              </div>
            </div>
          </div>

          {/* Match explanation */}
          <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100">
            <h4 className="text-xs font-semibold text-teal-900 uppercase tracking-wider mb-1">
              Why TripWise Recommends This
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {option.matchReason}
            </p>
          </div>

          {/* Advantages & Disadvantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100/60">
              <h5 className="font-semibold text-emerald-900">Key Advantages</h5>
              <ul className="space-y-1.5">
                {option.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 p-3.5 bg-amber-50/40 rounded-xl border border-amber-100/60">
              <h5 className="font-semibold text-amber-900">Important Considerations</h5>
              <ul className="space-y-1.5">
                {option.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-slate-700">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Amenities & Baggage */}
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Luggage className="w-4 h-4 text-slate-500" />
              <span>
                <strong>Baggage:</strong> {option.details.baggageAllowance}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>
                <strong>Cancellation:</strong> {option.details.cancellationPolicy}
              </span>
            </div>
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
                onClick={() => onSave(option)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-teal-50 border-teal-300 text-teal-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isSaved ? 'Saved to Trip' : 'Save Option'}
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
