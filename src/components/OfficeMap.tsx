import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface OfficeMapProps {
  className?: string;
}

const OfficeMap = ({ className }: OfficeMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Manchester office coordinates
  const officeLocation: [number, number] = [-2.2374, 53.4977];

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: officeLocation,
        zoom: 15,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add marker for office location
      const markerEl = document.createElement('div');
      markerEl.className = 'office-marker';
      markerEl.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #f57e20, #ff9a44);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(245, 126, 32, 0.4);
          border: 3px solid white;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;

      new mapboxgl.Marker(markerEl)
        .setLngLat(officeLocation)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="padding: 8px; font-family: system-ui, sans-serif;">
              <h4 style="margin: 0 0 4px 0; font-weight: 600; color: #1a1a1a;">Investigation.tax</h4>
              <p style="margin: 0; font-size: 12px; color: #666;">109 Cheetham Hill Rd<br/>Cheetham Hill, Manchester M8 8PY</p>
            </div>
          `)
        )
        .addTo(map.current);

      map.current.on('load', () => {
        setIsMapLoaded(true);
      });

      // Cleanup
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className={`bg-muted/50 rounded-xl border border-border overflow-hidden ${className}`}>
        <div className="aspect-video flex flex-col items-center justify-center p-8">
          <MapPin className="h-12 w-12 text-gold mb-4" />
          <h3 className="font-semibold text-lg mb-4 text-center">Enter Mapbox Token to View Map</h3>
          <div className="w-full max-w-md space-y-2">
            <Label htmlFor="mapbox-token" className="text-sm text-muted-foreground">
              Get your public token from{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                mapbox.com
              </a>
            </Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1IjoiLi4uIiwiYSI6Ii4uLiJ9..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="text-sm"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl border border-border overflow-hidden ${className}`}>
      <div ref={mapContainer} className="aspect-video w-full" />
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default OfficeMap;
