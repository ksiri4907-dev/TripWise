export interface SearchNeeds {
  transport: boolean;
  hotels: boolean;
  weather: boolean;
  complete: boolean;
}

export interface SearchQuery {
  from: string;
  to: string;
  date: string;
  travelers: number;
  needs: SearchNeeds;
}

export type CategoryTag = 'Best Match' | 'Cheapest' | 'Fastest' | 'Comfortable';

export interface TransportOption {
  id: string;
  type: 'train' | 'flight' | 'bus' | 'cab';
  name: string;
  operator: string;
  categoryTag: CategoryTag;
  price: number;
  duration: string;
  durationMinutes: number;
  departureTime: string;
  arrivalTime: string;
  departureStation: string;
  arrivalStation: string;
  stops: number; // 0 for direct
  comfort: 'High' | 'Medium' | 'Standard';
  status: 'Available' | 'Few Seats Left' | 'Filling Fast' | 'Waitlist';
  suitableTravelers: string;
  advantages: string[];
  disadvantages: string[];
  matchReason: string;
  details: {
    baggageAllowance: string;
    amenities: string[];
    cancellationPolicy: string;
    seatType: string;
  };
}

export interface HotelOption {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  roomStatus: 'Available' | '2 rooms left' | '3 rooms left' | 'Filling Fast';
  distanceKm: number;
  amenities: string[];
  image: string;
  matchReason: string;
  description: string;
  roomType: string;
  cancellationPolicy: string;
}

export interface WeatherCondition {
  city: string;
  tempC: number;
  condition: string;
  humidity: number;
  rainChance: number;
  windKmh: number;
  advisory: string;
}

export interface WeatherComparison {
  origin: WeatherCondition;
  destination: WeatherCondition;
  travelAdvice: string;
}

export interface TripComparisonResult {
  query: SearchQuery;
  transports: TransportOption[];
  hotels: HotelOption[];
  weather: WeatherComparison;
  estimatedBudget: {
    budgetTotal: number;
    recommendedTotal: number;
    premiumTotal: number;
  };
  summaryRecommendation: string;
}

export interface SavedTrip {
  id: string;
  query: SearchQuery;
  savedAt: string;
  summaryTitle: string;
  notes?: string;
}

export interface UserFeedback {
  id: string;
  rating: number;
  comment: string;
  tripContext?: string;
  submittedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  homeCity: string;
  preferredMode: 'Any' | 'Train' | 'Flight' | 'Cab' | 'Bus';
  comfortPriority: 'Budget' | 'Balanced' | 'Comfort';
  currency: 'INR' | 'USD';
}
