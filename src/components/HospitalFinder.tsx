import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Phone, Loader2, Hospital, Cross, Pill } from 'lucide-react';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface HospitalFinderProps {
  language: 'en' | 'kn';
}

interface Location {
  lat: number;
  lon: number;
}

interface Facility {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    amenity?: string;
    phone?: string;
    'contact:phone'?: string;
  };
  distance?: number;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

export default function HospitalFinder({ language }: HospitalFinderProps) {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'hospital' | 'clinic' | 'pharmacy'>('all');

  const t = {
    en: {
      title: 'Nearby Medical Facilities',
      findLocation: 'Locate Me',
      locating: 'Finding location...',
      searching: 'Searching facilities...',
      errorLocation: 'Unable to get your location. Please enable location services.',
      errorFacilities: 'Failed to fetch nearby facilities.',
      all: 'All',
      hospitals: 'Hospitals',
      clinics: 'Clinics',
      pharmacies: 'Pharmacies',
      distance: 'km away',
      directions: 'Directions',
      call: 'Call',
      noName: 'Unknown Facility',
    },
    kn: {
      title: 'ಹತ್ತಿರದ ವೈದ್ಯಕೀಯ ಸೌಲಭ್ಯಗಳು',
      findLocation: 'ನನ್ನ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ',
      locating: 'ಸ್ಥಳವನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
      searching: 'ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
      errorLocation: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಥಳ ಸೇವೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.',
      errorFacilities: 'ಹತ್ತಿರದ ಸೌಲಭ್ಯಗಳನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ.',
      all: 'ಎಲ್ಲಾ',
      hospitals: 'ಆಸ್ಪತ್ರೆಗಳು',
      clinics: 'ಚಿಕಿತ್ಸಾಲಯಗಳು',
      pharmacies: 'ಔಷಧಾಲಯಗಳು',
      distance: 'ಕಿಮೀ ದೂರ',
      directions: 'ನಿರ್ದೇಶನಗಳು',
      call: 'ಕರೆ ಮಾಡಿ',
      noName: 'ಅಜ್ಞಾತ ಸೌಲಭ್ಯ',
    },
  };

  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError(t[language].errorLocation);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setUserLocation(loc);
        fetchNearbyFacilities(loc);
      },
      () => {
        setError(t[language].errorLocation);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const fetchNearbyFacilities = async (loc: Location) => {
    try {
      // Overpass API query for hospitals, clinics, and pharmacies within 5km
      const radius = 5000;
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radius},${loc.lat},${loc.lon});
          node["amenity"="clinic"](around:${radius},${loc.lat},${loc.lon});
          node["amenity"="pharmacy"](around:${radius},${loc.lat},${loc.lon});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      // Calculate distance and sort
      const facilitiesWithDistance = data.elements
        .filter((el: any) => el.type === 'node')
        .map((facility: Facility) => {
          const distance = calculateDistance(loc.lat, loc.lon, facility.lat, facility.lon);
          return { ...facility, distance };
        })
        .sort((a: Facility, b: Facility) => (a.distance || 0) - (b.distance || 0));

      setFacilities(facilitiesWithDistance);
    } catch (err) {
      setError(t[language].errorFacilities);
    } finally {
      setLoading(false);
    }
  };

  // Haversine formula to calculate distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredFacilities = facilities.filter((f) => {
    if (filter === 'all') return true;
    return f.tags.amenity === filter;
  });

  const getFacilityIcon = (amenity?: string) => {
    switch (amenity) {
      case 'hospital':
        return <Hospital size={20} className="text-red-500" />;
      case 'clinic':
        return <Cross size={20} className="text-blue-500" />;
      case 'pharmacy':
        return <Pill size={20} className="text-green-500" />;
      default:
        return <MapPin size={20} className="text-slate-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200 flex flex-col h-[600px]">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="text-blue-500" />
            {t[language].title}
          </h2>
          <button
            onClick={getUserLocation}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-70"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} />}
            {loading ? t[language].locating : t[language].findLocation}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {facilities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(['all', 'hospital', 'clinic', 'pharmacy'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {t[language][f === 'all' ? 'all' : `${f}s` as keyof typeof t['en']]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Map Area */}
        <div className="flex-1 relative z-0 h-64 md:h-auto">
          {userLocation ? (
            <MapContainer
              center={[userLocation.lat, userLocation.lon]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ChangeView center={[userLocation.lat, userLocation.lon]} />
              
              {/* User Marker */}
              <Marker position={[userLocation.lat, userLocation.lon]}>
                <Popup>You are here</Popup>
              </Marker>

              {/* Facility Markers */}
              {filteredFacilities.map((facility) => (
                <Marker key={facility.id} position={[facility.lat, facility.lon]}>
                  <Popup>
                    <div className="font-medium">{facility.tags.name || t[language].noName}</div>
                    <div className="text-sm text-slate-500 capitalize">{facility.tags.amenity}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 p-6 text-center">
              <MapPin size={48} className="mb-4 opacity-50" />
              <p>Click "Locate Me" to find nearby medical facilities</p>
            </div>
          )}
        </div>

        {/* List Area */}
        {userLocation && (
          <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
            {filteredFacilities.length === 0 ? (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                No facilities found nearby.
              </div>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredFacilities.map((facility) => {
                  const phone = facility.tags.phone || facility.tags['contact:phone'];
                  return (
                    <div key={facility.id} className="p-4 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm">
                          {getFacilityIcon(facility.tags.amenity)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                            {facility.tags.name || t[language].noName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                            <span className="capitalize">{facility.tags.amenity}</span>
                            <span>•</span>
                            <span>{facility.distance?.toFixed(1)} {t[language].distance}</span>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lon}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                            >
                              <Navigation size={14} />
                              {t[language].directions}
                            </a>
                            {phone && (
                              <a
                                href={`tel:${phone}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                              >
                                <Phone size={14} />
                                {t[language].call}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
