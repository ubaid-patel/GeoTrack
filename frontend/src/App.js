// src/App.jsx
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Map from './Map';
import styles from './CSS/map.module.css';

const socket = io("localhost:5001");

function App() {
  const [gpsData, setGpsData] = useState([0,0]);

  useEffect(() => {
    // alert("connecting")
    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket.id);
    });
  
    socket.on("gps_data", (data) => {
      console.log("📡 Received:", data);
      setGpsData(JSON.parse(data));
    });
  
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  
  return (
    <div >
      <h1 className={styles.Heading}>Live Devices</h1>
      <Map lat={gpsData[0]} long={gpsData[1]}></Map>
    </div>
  );
}

export default App;
