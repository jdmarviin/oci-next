"use client";
import React, { useState, useEffect } from "react";

export default function RealTimeUpdates() {
  const [message, setMessage] = useState("Waiting for updates...");

  useEffect(() => {
    // Create a new EventSource connection to your SSE endpoint
    const eventSource = new EventSource("http://127.0.0.1:8000/sse/stream"); // Replace with your actual SSE endpoint URL

    // Event listener for incoming messages
    eventSource.onmessage = (event) => {
      console.log("Received SSE message:", event.data);
      setMessage(`Received: ${event.data}`);
    };

    // Event listener for errors
    eventSource.onerror = (error) => {
      console.log("EventSource error:", error);
      eventSource.close(); // Close the connection on error
      setMessage("Error occurred, connection closed.");
    };

    // Event listener for connection opening
    eventSource.onopen = () => {
      console.log("SSE connection opened.");
    };

    // Cleanup function to close the connection when the component unmounts
    return () => {
      eventSource.close();
      console.log("SSE connection closed.");
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Real-Time Updates</h1>
      <p>{message}</p>
    </div>
  );
}
