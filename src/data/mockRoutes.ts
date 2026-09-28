import { HotelOption, SearchQuery, TransportOption, TripComparisonResult, WeatherComparison } from '../types/trip';

import hotelBoutiqueImg from '../assets/images/hotel_boutique_suite_1790596602260.jpg';
import hotelExecutiveImg from '../assets/images/hotel_business_executive_1790596624786.jpg';
import hotelHeritageImg from '../assets/images/hotel_heritage_resort_1790596637773.jpg';

export const SAMPLE_DATA_NOTICE = 'Sample data — connect API for live availability.';

export const POPULAR_ROUTES = [
  { from: 'Visakhapatnam', to: 'Hyderabad', dateOffset: 2, travelers: 2, tag: 'Featured Prompt Route' },
  { from: 'Mumbai', to: 'Goa', dateOffset: 4, travelers: 2, tag: 'Coastal Gateway' },
  { from: 'Delhi', to: 'Jaipur', dateOffset: 3, travelers: 1, tag: 'Golden Triangle' },
  { from: 'Bengaluru', to: 'Chennai', dateOffset: 1, travelers: 2, tag: 'Tech Corridor' },
  { from: 'Kolkata', to: 'Puri', dateOffset: 5, travelers: 4, tag: 'Heritage Coast' },
];

export function getTravelComparison(query: SearchQuery): TripComparisonResult {
  const fromClean = query.from.trim() || 'Visakhapatnam';
  const toClean = query.to.trim() || 'Hyderabad';
  const travelers = Math.max(1, query.travelers || 1);

  // Check if it's the signature Visakhapatnam -> Hyderabad route
  const isVizagToHyd =
    fromClean.toLowerCase().includes('visakha') ||
    fromClean.toLowerCase().includes('vizag') ||
    (fromClean.toLowerCase().includes('v') && toClean.toLowerCase().includes('hyd'));

  let transports: TransportOption[] = [];
  let hotels: HotelOption[] = [];
  let weather: WeatherComparison;

  if (isVizagToHyd) {
    transports = [
      {
        id: 'vizag-hyd-train-vb',
        type: 'train',
        name: 'Vande Bharat Express (20833)',
        operator: 'Indian Railways',
        categoryTag: 'Best Match',
        price: 850 * travelers,
        duration: '8h 20m',
        durationMinutes: 500,
        departureTime: '05:45 AM',
        arrivalTime: '02:05 PM',
        departureStation: 'Visakhapatnam Jn (VSKP)',
        arrivalStation: 'Secunderabad Jn (SC)',
        stops: 4,
        comfort: 'High',
        status: 'Available',
        suitableTravelers: `${travelers} Traveler${travelers > 1 ? 's' : ''} (Solo/Couples/Family)`,
        advantages: ['Scenic route during daylight', 'Free breakfast & onboard dining included', 'Punctuality rating 96%'],
        disadvantages: ['Limited luggage overhead clearance', 'Advance booking required'],
        matchReason: 'Best balance of journey speed (8h 20m), zero airport hassle, and executive AC comfort at ₹850 per person.',
        details: {
          baggageAllowance: '40 kg per passenger',
          amenities: ['Ergonomic AC Reclining Seats', 'WiFi Infotainment', 'Modular Bio-vacuum Restrooms', 'Charging Sockets at every seat'],
          cancellationPolicy: 'Refundable up to 4h before departure with standard IRCTC slab deduction.',
          seatType: 'Chair Car (CC) / Executive (EC)',
        },
      },
      {
        id: 'vizag-hyd-bus-volvo',
        type: 'bus',
        name: 'IntrCity SmartBus Volvo 9600 Multi-Axle',
        operator: 'IntrCity / Orange Travels',
        categoryTag: 'Cheapest',
        price: 700 * travelers,
        duration: '11h 00m',
        durationMinutes: 660,
        departureTime: '08:30 PM',
        arrivalTime: '07:30 AM (Next Day)',
        departureStation: 'RTC Complex, Visakhapatnam',
        arrivalStation: 'MGBS / Ameerpet, Hyderabad',
        stops: 2,
        comfort: 'Medium',
        status: 'Available',
        suitableTravelers: `${travelers} Traveler${travelers > 1 ? 's' : ''}`,
        advantages: ['Overnight sleeper saves 1 hotel night cost', 'Multiple boarding points in city', 'Lowest total cost of journey'],
        disadvantages: ['Longer road duration (11h)', 'Possible highway toll/traffic delays'],
        matchReason: 'Lowest fare at ₹700 per person. Overnight travel saves day hours and hotel accommodation.',
        details: {
          baggageAllowance: '2 pieces (up to 20kg)',
          amenities: ['Individual AC vents & reading lights', 'Mineral water bottle & sanitised blanket', 'Live GPS tracking & emergency button'],
          cancellationPolicy: 'Free cancellation up to 6 hours before departure time.',
          seatType: 'AC Sleeper 2+1 Upper/Lower berth',
        },
      },
      {
        id: 'vizag-hyd-flight-indigo',
        type: 'flight',
        name: 'IndiGo 6E-241 Direct',
        operator: 'IndiGo Airlines',
        categoryTag: 'Fastest',
        price: 3600 * travelers,
        duration: '1h 15m',
        durationMinutes: 75,
        departureTime: '09:10 AM',
        arrivalTime: '10:25 AM',
        departureStation: 'Visakhapatnam Airport (VTZ)',
        arrivalStation: 'Rajiv Gandhi Intl Airport (HYD)',
        stops: 0,
        comfort: 'High',
        status: 'Few Seats Left',
        suitableTravelers: `${travelers} Traveler${travelers > 1 ? 's' : ''} (Ideal for business & urgent trips)`,
        advantages: ['Fastest arrival in just 75 minutes flight time', 'Direct non-stop service', 'Frequent flyer baggage options'],
        disadvantages: ['Requires 90m advance airport reporting', 'HYD airport is 32km from Hyderabad city center'],
        matchReason: 'Shortest travel duration (1h 15m airtime). Ideal if reaching Hyderabad quickly is top priority.',
        details: {
          baggageAllowance: '15 kg check-in + 7 kg cabin per passenger',
          amenities: ['6E Prime Snack option', 'Expedited security at VTZ', 'On-time guarantee (92%)'],
          cancellationPolicy: 'Cancellation subject to standard airline fare rules (₹2,500 fee).',
          seatType: 'Airbus A320neo Economy',
        },
      },
      {
        id: 'vizag-hyd-cab-sedan',
        type: 'cab',
        name: 'Outstation Dedicated Prime SUV / Sedan',
        operator: 'TripWise Verified Fleets',
        categoryTag: 'Comfortable',
        price: 4500, // flat vehicle price for the group
        duration: '10h 00m',
        durationMinutes: 600,
        departureTime: 'Flexible (Your Choice)',
        arrivalTime: 'Flexible',
        departureStation: 'Doorstep Pickup (Visakhapatnam)',
        arrivalStation: 'Doorstep Drop (Hyderabad)',
        stops: 3, // meal breaks
        comfort: 'High',
        status: 'Available',
        suitableTravelers: `Ideal for groups of 1–4 travelers (Flat ₹4,500 total)`,
        advantages: ['Direct doorstep pickup and drop', 'Stop anywhere for local food & highway rests', 'Zero shared crowd'],
        disadvantages: ['High single-traveler cost (economical when split between 2-4 travelers)'],
        matchReason: 'Maximum privacy and door-to-door convenience with customizable departure timing.',
        details: {
          baggageAllowance: 'Full trunk capacity (3-4 large suitcases)',
          amenities: ['Dedicated AC chauffeur', 'FASTag toll charges included', 'Pet friendly upon request'],
          cancellationPolicy: 'Full refund if cancelled up to 2 hours before scheduled pickup.',
          seatType: 'Maruti Ertiga / Innova Crysta AC',
        },
      },
    ];

    hotels = [
      {
        id: 'hotel-hyd-novotel',
        name: 'The Hyderabad Grand Residency',
        location: 'Banjara Hills, Hyderabad',
        rating: 4.7,
        reviewCount: 1420,
        pricePerNight: 2400,
        roomStatus: 'Available',
        distanceKm: 1.2,
        amenities: ['Free High-Speed Wi-Fi', 'Complimentary Breakfast', 'Swimming Pool', 'Fitness Center', 'Airport Shuttle'],
        image: hotelExecutiveImg,
        matchReason: 'Top-rated hotel in central Banjara Hills with complimentary buffet breakfast and premium executive bedding.',
        description: 'Sophisticated modern retreat located in prime Banjara Hills, near top restaurants, business hubs, and city landmarks.',
        roomType: 'Deluxe City View King Room',
        cancellationPolicy: 'Free cancellation up to 24h prior to check-in',
      },
      {
        id: 'hotel-hyd-boutique',
        name: 'Heritage Courtyard & Spa',
        location: 'Jubilee Hills / Hitec City, Hyderabad',
        rating: 4.8,
        reviewCount: 890,
        pricePerNight: 3200,
        roomStatus: '2 rooms left',
        distanceKm: 2.8,
        amenities: ['Courtyard Garden', 'Ayurvedic Spa', 'Artisan Dining', 'Valet Parking', '24h Concierge'],
        image: hotelBoutiqueImg,
        matchReason: 'Charming boutique property with private courtyard views, peaceful atmosphere, and luxury bespoke service.',
        description: 'An architectural oasis in Hyderabad featuring serene tranquil gardens, handcrafted furnishings, and rejuvenating wellness spa.',
        roomType: 'Heritage Balcony Suite',
        cancellationPolicy: 'Free cancellation up to 48h prior to check-in',
      },
      {
        id: 'hotel-hyd-metro',
        name: 'Urban Prime Inn & Suites',
        location: 'Secunderabad Station Area, Hyderabad',
        rating: 4.4,
        reviewCount: 2180,
        pricePerNight: 1650,
        roomStatus: 'Available',
        distanceKm: 0.8,
        amenities: ['Walk to Secunderabad Jn', 'Express Check-In', 'Power Backup', 'Work Desk', 'Free Wi-Fi'],
        image: hotelHeritageImg,
        matchReason: 'Budget-friendly comfort located just 800m from Secunderabad Junction, ideal for train arrivals.',
        description: 'A spotless, efficient city hotel offering prompt transit connectivity, quiet soundproofed rooms, and round-the-clock room dining.',
        roomType: 'Standard Executive Double',
        cancellationPolicy: 'Free cancellation up to 12h prior to check-in',
      },
    ];

    weather = {
      origin: {
        city: 'Visakhapatnam',
        tempC: 31,
        condition: 'Partly Cloudy with Coastal Breeze',
        humidity: 78,
        rainChance: 15,
        windKmh: 18,
        advisory: 'Humid coastal conditions. Lightweight breathable cotton clothes recommended.',
      },
      destination: {
        city: 'Hyderabad',
        tempC: 28,
        condition: 'Clear & Pleasant',
        humidity: 52,
        rainChance: 5,
        windKmh: 12,
        advisory: 'Moderate temperatures and lower humidity. Great sightseeing weather, cool evenings.',
      },
      travelAdvice: 'Hyderabad is currently 3°C cooler with noticeably lower humidity than Visakhapatnam. Carry light evening layers if traveling by AC train or overnight bus.',
    };
  } else {
    // Dynamic generator for any origin and destination pair
    const baseDist = Math.max(80, Math.min(1800, (fromClean.length + toClean.length) * 45));
    const trainHours = Math.max(3, Math.round(baseDist / 70));
    const busHours = Math.max(4, Math.round(baseDist / 50));
    const flightHours = baseDist > 350 ? '1h 35m' : '1h 10m';

    const trainPrice = Math.round(baseDist * 1.3) * travelers;
    const busPrice = Math.round(baseDist * 1.1) * travelers;
    const cabPrice = Math.round(baseDist * 10);
    const flightPrice = Math.round(Math.max(2800, baseDist * 4.2)) * travelers;

    transports = [
      {
        id: `train-${fromClean}-${toClean}`,
        type: 'train',
        name: `${fromClean} — ${toClean} Superfast Express`,
        operator: 'Indian Railways',
        categoryTag: 'Best Match',
        price: trainPrice,
        duration: `${trainHours}h 15m`,
        durationMinutes: trainHours * 60 + 15,
        departureTime: '06:30 AM',
        arrivalTime: `${(6 + trainHours) % 12 || 12}:45 ${6 + trainHours >= 12 ? 'PM' : 'AM'}`,
        departureStation: `${fromClean} Central Station`,
        arrivalStation: `${toClean} Junction`,
        stops: 3,
        comfort: 'High',
        status: 'Available',
        suitableTravelers: `${travelers} Traveler${travelers > 1 ? 's' : ''}`,
        advantages: ['Smooth steady ride with spacious seating', 'Generous luggage space', 'Punctual transit'],
        disadvantages: ['Platform boarding required', 'Station parking during peak hours'],
        matchReason: `High comfort and reliability with direct city-center to city-center connectivity for ₹${trainPrice.toLocaleString('en-IN')}.`,
        details: {
          baggageAllowance: '40 kg per traveler',
          amenities: ['AC Coaches', 'Reserved Seating', 'Pantry Service', 'Mobile Charging Ports'],
          cancellationPolicy: 'Refundable as per standard railway cancellation schedule.',
          seatType: '3rd AC / Chair Car',
        },
      },
      {
        id: `bus-${fromClean}-${toClean}`,
        type: 'bus',
        name: 'Intercity AC Sleeper Luxury Coach',
        operator: 'Express Travel Lines',
        categoryTag: 'Cheapest',
        price: busPrice,
        duration: `${busHours}h 40m`,
        durationMinutes: busHours * 60 + 40,
        departureTime: '09:00 PM',
        arrivalTime: `${(9 + busHours) % 12 || 12}:40 AM (Next Day)`,
        departureStation: `${fromClean} Bus Terminal`,
        arrivalStation: `${toClean} Transit Hub`,
        stops: 2,
        comfort: 'Medium',
        status: 'Available',
        suitableTravelers: `${travelers} Traveler${travelers > 1 ? 's' : ''}`,
        advantages: ['Lowest direct fare', 'Multiple city boarding locations', 'Overnight travel option'],
        disadvantages: ['Road motion may affect sensitive passengers', 'Highway stops variable'],
        matchReason: `Most economical option at ₹${busPrice.toLocaleString('en-IN')} total.`,
        details: {
          baggageAllowance: '2 bags per passenger (up to 25kg)',
          amenities: ['AC Berths', 'Blankets', 'Water Bottle', 'USB Ports'],
          cancellationPolicy: 'Free cancellation up to 8 hours before departure.',
          seatType: 'AC Sleeper Berth',
        },
      },
      {
        id: `cab-${fromClean}-${toClean}`,
        type: 'cab',
        name: 'Direct Private Outstation Chauffeur (Sedan/SUV)',
        operator: 'TripWise Verified Fleets',
        categoryTag: 'Comfortable',
        price: cabPrice,
        duration: `${Math.round(busHours * 0.85)}h 10m`,
        durationMinutes: Math.round(busHours * 0.85 * 60) + 10,
        departureTime: 'Anytime at your choice',
        arrivalTime: 'Flexible arrival',
        departureStation: `Doorstep Pickup in ${fromClean}`,
        arrivalStation: `Doorstep Drop in ${toClean}`,
        stops: 2,
        comfort: 'High',
        status: 'Available',
        suitableTravelers: `Up to 4 passengers (Flat ₹${cabPrice.toLocaleString('en-IN')})`,
        advantages: ['Zero luggage hassle and door-to-door convenience', 'Stop anytime for rest & meals', 'Private safe travel'],
        disadvantages: ['Higher single-person price, economical when sharing with group'],
        matchReason: `Maximum privacy and total schedule control with door-to-door chauffeur service.`,
        details: {
          baggageAllowance: 'Full vehicle boot capacity',
          amenities: ['Commercial Chauffeur', 'Tolls Included', 'Air Conditioned', 'Clean Sanitized Vehicle'],
          cancellationPolicy: 'Cancel free up to 3 hours prior to pickup.',
          seatType: 'Toyota Etios / Maruti Dzire or Ertiga',
        },
      },
    ];

    if (baseDist >= 300) {
      transports.splice(1, 0, {
        id: `flight-${fromClean}-${toClean}`,
        type: 'flight',
        name: `Air Travel Connector (${fromClean} → ${toClean})`,
        operator: 'Premier Domestic Airway',
        categoryTag: 'Fastest',
        price: flightPrice,
        duration: flightHours,
        durationMinutes: 90,
        departureTime: '11:20 AM',
        arrivalTime: '12:55 PM',
        departureStation: `${fromClean} Airport`,
        arrivalStation: `${toClean} Airport`,
        stops: 0,
        comfort: 'High',
        status: 'Few Seats Left',
        suitableTravelers: `${travelers} Traveler${travelers > 1 ? 's' : ''}`,
        advantages: ['Fastest arrival time', 'Complimentary in-flight beverage', 'Clean sanitized cabin'],
        disadvantages: ['Airport security screening time', 'Baggage limits enforced strictly'],
        matchReason: `Fastest transit to ${toClean}, cutting travel time significantly down to under 2 hours.`,
        details: {
          baggageAllowance: '15kg check-in + 7kg cabin',
          amenities: ['In-flight Magazine', 'Priority Boarding option', 'On-time tracking'],
          cancellationPolicy: 'Standard airline cancellation fees apply.',
          seatType: 'Economy Jet Seating',
        },
      });
    }

    hotels = [
      {
        id: `hotel-${toClean}-prime`,
        name: `The ${toClean} Regency & Suites`,
        location: `Central Downtown, ${toClean}`,
        rating: 4.7,
        reviewCount: 1140,
        pricePerNight: 2350,
        roomStatus: 'Available',
        distanceKm: 1.4,
        amenities: ['Free High-Speed Wi-Fi', 'Breakfast Buffet Included', 'Fitness Center', '24h Concierge', 'Work Desk'],
        image: hotelExecutiveImg,
        matchReason: `Premier location in central ${toClean} with 4.7 rating and excellent guest reviews.`,
        description: `Modern executive hotel offering quiet luxury, city skyline views, and fast access to local business and shopping districts in ${toClean}.`,
        roomType: 'Deluxe King Room with City View',
        cancellationPolicy: 'Free cancellation up to 24h prior to check-in',
      },
      {
        id: `hotel-${toClean}-boutique`,
        name: `Greenview Boutique Hotel & Gardens`,
        location: `Green Boulevard, ${toClean}`,
        rating: 4.8,
        reviewCount: 780,
        pricePerNight: 2950,
        roomStatus: '3 rooms left',
        distanceKm: 2.5,
        amenities: ['Private Garden Balcony', 'Artisan Restaurant', 'Spa Facilities', 'Complimentary Tea Lounge'],
        image: hotelBoutiqueImg,
        matchReason: `Top-rated for serenity and boutique elegance with verified 4.8 rating.`,
        description: `An eco-conscious boutique retreat featuring lush gardens, handcrafted wooden interiors, and farm-to-table breakfast in ${toClean}.`,
        roomType: 'Garden View Premier Suite',
        cancellationPolicy: 'Free cancellation up to 48h prior to check-in',
      },
      {
        id: `hotel-${toClean}-transit`,
        name: `Comfort Stay City Center`,
        location: `Near Transit Station, ${toClean}`,
        rating: 4.3,
        reviewCount: 1690,
        pricePerNight: 1550,
        roomStatus: 'Available',
        distanceKm: 0.9,
        amenities: ['Walk to Transit', 'High-Speed Wi-Fi', 'Clean Linen Promise', '24h Front Desk'],
        image: hotelHeritageImg,
        matchReason: `Best value for money at ₹1,550/night located close to transportation hubs.`,
        description: `Convenient, clean, and modern lodging designed for travelers seeking practical comfort and easy transit in ${toClean}.`,
        roomType: 'Comfort Double Room',
        cancellationPolicy: 'Free cancellation up to 12h prior to check-in',
      },
    ];

    weather = {
      origin: {
        city: fromClean,
        tempC: 29,
        condition: 'Partly Sunny',
        humidity: 65,
        rainChance: 10,
        windKmh: 14,
        advisory: `Warm and moderate conditions in ${fromClean}. Normal casual travel attire suited.`,
      },
      destination: {
        city: toClean,
        tempC: 27,
        condition: 'Clear Skies',
        humidity: 58,
        rainChance: 5,
        windKmh: 11,
        advisory: `Pleasant weather in ${toClean}. Excellent conditions for sightseeing and outdoor journeys.`,
      },
      travelAdvice: `Weather conditions between ${fromClean} and ${toClean} are stable. No weather-related travel disruptions anticipated for your selected date.`,
    };
  }

  // Calculate budget summaries
  const cheapestTransport = transports.find((t) => t.categoryTag === 'Cheapest')?.price || 700;
  const bestMatchTransport = transports.find((t) => t.categoryTag === 'Best Match')?.price || 850;
  const fastestTransport = transports.find((t) => t.categoryTag === 'Fastest')?.price || 3600;

  const minHotel = hotels.reduce((min, h) => (h.pricePerNight < min ? h.pricePerNight : min), 99999);
  const avgHotel = Math.round(hotels.reduce((acc, h) => acc + h.pricePerNight, 0) / hotels.length);
  const maxHotel = hotels.reduce((max, h) => (h.pricePerNight > max ? h.pricePerNight : max), 0);

  const estimatedBudget = {
    budgetTotal: cheapestTransport + minHotel,
    recommendedTotal: bestMatchTransport + avgHotel,
    premiumTotal: fastestTransport + maxHotel,
  };

  const summaryRecommendation = `For ${fromClean} → ${toClean} (${travelers} traveler${travelers > 1 ? 's' : ''}), the ${transports[0]?.name} is our top recommendation for balance of comfort and journey time.`;

  return {
    query,
    transports,
    hotels,
    weather,
    estimatedBudget,
    summaryRecommendation,
  };
}

export const INITIAL_SAVED_TRIPS = [
  {
    id: 'trip-vizag-hyd',
    query: {
      from: 'Visakhapatnam',
      to: 'Hyderabad',
      date: '2026-10-25',
      travelers: 2,
      needs: { transport: true, hotels: true, weather: false, complete: false },
    },
    savedAt: '2026-09-27',
    summaryTitle: 'Visakhapatnam → Hyderabad (25 Oct, 2 Travelers)',
    notes: 'Compared Train vs Cab. Vande Bharat Express matched highest comfort and speed.',
  },
  {
    id: 'trip-delhi-jaipur',
    query: {
      from: 'Delhi',
      to: 'Jaipur',
      date: '2026-11-10',
      travelers: 1,
      needs: { transport: true, hotels: false, weather: true, complete: false },
    },
    savedAt: '2026-09-24',
    summaryTitle: 'Delhi → Jaipur (10 Nov, 1 Traveler)',
    notes: 'Short weekend trip. Vande Bharat CC or private sedan.',
  },
];

export const INITIAL_FEEDBACKS = [
  {
    id: 'fb-1',
    rating: 5,
    comment: 'The vehicle comparison was very useful! Clear breakdown of direct train vs taxi fare for my family.',
    tripContext: 'Visakhapatnam → Hyderabad',
    submittedAt: '2026-09-26',
  },
  {
    id: 'fb-2',
    rating: 4,
    comment: 'Clean interface and loved that I could turn off weather and just see transport and hotel availability.',
    tripContext: 'Mumbai → Goa',
    submittedAt: '2026-09-25',
  },
];
