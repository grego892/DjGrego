import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {Box, Typography} from '@mui/material';

// Make sure to import these for Leaflet icons to work properly
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Weather() {
  const [wmsUrl, setWmsUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/radar/latest")
      .then((res) => res.json())
      .then((data) => setWmsUrl(data.wms_url))
      .catch(error => console.error("Error fetching radar data:", error));
  }, []);

  return (
    <Box sx={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapContainer 
        center={[38.0, -97.0]} 
        zoom={4} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {wmsUrl && (
          <WMSTileLayer
            url={wmsUrl}
            layers="1"
            format="image/png"
            transparent={true}
          />
        )}
      </MapContainer>
    </Box>
  );
}

export default Weather;