"use client";

import { useState, useRef } from "react";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onCoordinatesChange?: (lat: number | null, lng: number | null) => void;
}

export function LocationInput({
  value,
  onChange,
  onCoordinatesChange,
}: LocationInputProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const getLocation = async () => {
    setIsGettingLocation(true);
    setLocationError(null);

    try {
      if (!navigator.geolocation) throw new Error("Geolocation not supported");

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      onCoordinatesChange?.(latitude, longitude);
      onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    } catch (err: any) {
      setLocationError(
        err?.message || "Unable to fetch your location"
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleInputChange = (text: string) => {
    onChange(text);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(
            text
          )}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (err) {
        console.error("Geocoding error:", err);
      }
    }, 400);
  };

  const handleSuggestionClick = (place: any) => {
    onChange(place.place_name);
    if (place.center && place.center.length === 2) {
      onCoordinatesChange?.(place.center[1], place.center[0]);
    }
    setSuggestions([]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-400">Location</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter location or use pin"
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 pl-4 pr-12 py-3.5
                     text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-50 w-full bg-zinc-900 border border-zinc-800 rounded-xl mt-1 max-h-60 overflow-auto">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-zinc-800 cursor-pointer text-zinc-300"
                onClick={() => handleSuggestionClick(s)}
              >
                {s.place_name}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={getLocation}
          disabled={isGettingLocation}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 disabled:opacity-50"
          title="Get current location"
        >
          {isGettingLocation ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z"/>
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          )}
        </button>
      </div>
      {locationError && (
        <p className="text-sm text-red-400 flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M4.062 20h15.876c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L2.34 17c-.77 1.33.19 3 1.72 3z"/>
          </svg>
          {locationError}
        </p>
      )}

      {/* ✅ Truth link */}
      {value && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            value
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-teal-600 hover:underline"
        >
          Verify on Google Maps ↗
        </a>
      )}
    </div>
  );
}
