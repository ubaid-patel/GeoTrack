import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from './CSS/map.module.css';
import 'mapbox-gl/dist/mapbox-gl.css'; // ✅ required

//Mapbox Api Token
mapboxgl.accessToken = '<mapbox api token>';

const Map = ({ lat = 28.6565, long = 77.2429 }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize map only once
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [long, lat],
      zoom: 12,
      attributionControl: false,
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // mapRef.current.addControl(new mapboxgl.NavigationControl());

    const markerEl = document.createElement('div');
    markerEl.className = styles.marker;

    markerRef.current = new mapboxgl.Marker(markerEl)
      .setLngLat([long, lat])
      .addTo(mapRef.current);

    return () => mapRef.current.remove(); // Cleanup on unmount
  }, []);

  // Update marker location when props change
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLngLat([long, lat]);
    }

    // Optional: Smoothly pan the map to the new location
    if (mapRef.current) {
      mapRef.current.panTo([long, lat]);
    }
  }, [lat, long]);

  return (
    <div className={styles.mapContainer}>
      <div id="map" className={styles.mapBox} />
    </div>
  );
};

export default Map;
