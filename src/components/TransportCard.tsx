import React from 'react';
import { Train, Bus, Car, Plane, CheckCircle2, AlertCircle, Bookmark, ArrowRight, Clock, Users, ShieldCheck } from 'lucide-react';
import { TransportOption } from '../types/trip';

interface TransportCardProps {
  option: TransportOption;
  onViewDetails: (option: TransportOption) => void;
  isSaved?: boolean;
  onToggleSave?: (option: TransportOption) => void;
}

export const TransportCard: React.FC<TransportCardProps> = ({
  option,
  onViewDetails,
  isSaved = false,
  onToggleSave,
}) => {
  const getIcon = () => {
    switch (option.type) {
      case 'train':
        return <Train className="w-5 h-5 text-teal-700" />;
      case 'flight':
        return <Plane className="w-5 h-5 text-sky-700" />;
      case 'cab':
        return <Car className="w-5 h-5 text-amber-700" />;
      case 'bus':
        return <Bus className="w-5 h-5 text-indigo-700" />;
    }
  };

  const getTagStyle = () => {
    switch (option.categoryTag) {
      case 'Best Match':
        return 'text-teal-800 bg-teal-50 border-teal-200';
      case 'Cheapest':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'Fastest':
        return 'text-sky-800 bg-sky-50 border-sky-200';
      case 'Comfortable':
        return 'text-purple-800 bg-purple-50 border-purple-200';
    }
  };

  const getStatusColor = () => {
    if (option.status === 'Available') return 'text-emerald-700';
    if (option.status === 'Few Seats Left' || option.status === 'Filling Fast') return 'text-amber-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              {getIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-semibold text-slate-900 tracking-tight">
                  {option.name}
                </h4>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {option.operator} · {option.type.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${getTagStyle()}`}
            >
              {option.categoryTag}
            </span>
            {onToggleSave && (
              <button
                type="button"
                onClick={() => onToggleSave(option)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isSaved
                    ? 'bg-teal-50 border-teal-300 text-teal-700'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save vehicle option'}
                aria-label="Save vehicle"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>
        </div>

        {/* Primary Format Line as specified in Prompt: ₹1,200 · 6h 30m · Direct */}
        <div className="py-2.5 px-3.5 bg-slate-50 rounded-xl mb-4 flex flex-wrap items-center justify-between gap-2 border border-slate-100">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 tabular-nums">
            <span className="text-lg text-slate-900">
              ₹{option.price.toLocaleString('en-IN')}
            </span>
            <span className="text-slate-300 font-normal">·</span>
            <span className="text-slate-700">{option.duration}</span>
            <span className="text-slate-300 font-normal">·</span>
            <span className="text-slate-700">
              {option.stops === 0 ? 'Direct' : `${option.stops} Stops`}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-600">
              Comfort: <strong className="text-slate-900 font-semibold">{option.comfort}</strong>
            </span>
            <span className="text-slate-300">·</span>
            <span className={`font-semibold ${getStatusColor()}`}>
              {option.status}
            </span>
          </div>
        </div>

        {/* Schedule & Route */}
        <div className="space-y-1.5 text-xs text-slate-600 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Departure:</span>
            <span className="font-medium text-slate-900 tabular-nums">
              {option.departureTime} ({option.departureStation})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Arrival:</span>
            <span className="font-medium text-slate-900 tabular-nums">
              {option.arrivalTime} ({option.arrivalStation})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Suitability:</span>
            <span className="font-medium text-slate-700">{option.suitableTravelers}</span>
          </div>
        </div>

        {/* Why this matches you */}
        <div className="mb-4 p-3 bg-teal-50/40 rounded-xl border border-teal-100/60">
          <p className="text-xs text-slate-700">
            <span className="font-semibold text-teal-900">Why this matches: </span>
            {option.matchReason}
          </p>
        </div>

        {/* Key Advantages */}
        <div className="space-y-1 mb-5">
          {option.advantages.slice(0, 2).map((adv, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{adv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400">
          {option.details.seatType}
        </span>
        <button
          type="button"
          onClick={() => onViewDetails(option)}
          className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
        </button>
      </div>
    </div>
  );
};
