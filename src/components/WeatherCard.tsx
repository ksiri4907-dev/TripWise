import React from 'react';
import { CloudSun, Droplets, CloudRain, Wind, Thermometer, ArrowRight, Compass } from 'lucide-react';
import { WeatherComparison } from '../types/trip';

interface WeatherCardProps {
  weather: WeatherComparison;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Weather Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Starting point vs Destination climate forecast
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{weather.origin.city}</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
          <span className="font-semibold text-slate-900">{weather.destination.city}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Starting Point Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Starting Point
            </span>
            <span className="text-sm font-bold text-slate-900">{weather.origin.city}</span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {weather.origin.tempC}°C
            </span>
            <span className="text-xs font-medium text-slate-600">
              {weather.origin.condition}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/60 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-400 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-sky-500" /> Humidity
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {weather.origin.humidity}%
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 flex items-center gap-1">
                <CloudRain className="w-3 h-3 text-indigo-500" /> Rain
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {weather.origin.rainChance}%
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 flex items-center gap-1">
                <Wind className="w-3 h-3 text-teal-500" /> Wind
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {weather.origin.windKmh} km/h
              </span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-500 bg-white/80 p-2 rounded-lg border border-slate-100">
            {weather.origin.advisory}
          </p>
        </div>

        {/* Destination Card */}
        <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-200/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Destination
            </span>
            <span className="text-sm font-bold text-slate-900">{weather.destination.city}</span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {weather.destination.tempC}°C
            </span>
            <span className="text-xs font-medium text-teal-900">
              {weather.destination.condition}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-teal-200/50 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-500 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-sky-600" /> Humidity
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {weather.destination.humidity}%
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-500 flex items-center gap-1">
                <CloudRain className="w-3 h-3 text-indigo-600" /> Rain
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {weather.destination.rainChance}%
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-500 flex items-center gap-1">
                <Wind className="w-3 h-3 text-teal-600" /> Wind
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {weather.destination.windKmh} km/h
              </span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-600 bg-white/80 p-2 rounded-lg border border-teal-100">
            {weather.destination.advisory}
          </p>
        </div>
      </div>

      {/* Travel Advice summary */}
      <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100 flex items-start gap-2">
        <Compass className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-900 font-semibold">Climate Insight: </strong>
          {weather.travelAdvice}
        </span>
      </div>
    </div>
  );
};
