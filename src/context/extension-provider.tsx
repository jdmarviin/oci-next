/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, ReactNode } from "react";

interface ExtensionContextType {
  data: any;
  sendData: (data: any) => void;
}

const ExtensionContext = createContext<ExtensionContextType | undefined>(
  undefined
);

export function ExtensionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = React.useState<any[]>([]);
  const [sendData, setSendData] = React.useState<any>(null);
  //   const [isLoading, setIsLoading] = React.useState(true);
  //   const [error, setError] = React.useState<string | null>(null);

  function sendToExtension(data: any) {
    console.log("Sending to extension:", data);
    window.postMessage(
      {
        type: "APP_TO_EXTENSION",
        action: "SAVE_TOKEN",
        payload: data,
      },
      "*"
    );
  }

  React.useEffect(() => {
    if (sendData) {
      sendToExtension(sendData);
      setSendData(null);
    }
  }, [sendData]);

  React.useEffect(() => {
    function listenForMessages(event: MessageEvent) {
      if (event.source !== window) return;

      // console.log('Extension service received:', event.data);

      if (event.data.type === 'DATA_REQUEST') {
        console.log('DATA FROM EXTENSION: '+ event.data);
      }

      if (event.data.type === "FROM_EXTENSION") {
        setData(event.data);

        console.log("Event data:", event.data);

        if (event.data.action === "TOKEN_SAVED") {
          console.log("Token successfully saved in extension!");
        }
      }
    }

    window.addEventListener("message", listenForMessages);

    return () => {
      window.removeEventListener("message", listenForMessages);
    };
  }, []);

  return (
    <ExtensionContext.Provider value={{ data, sendData }}>
      {children}
    </ExtensionContext.Provider>
  );
}

export function useExtension() {
  const context = React.useContext(ExtensionContext);
  if (context === undefined) {
    throw new Error("useExtension deve ser usado dentro de ExtensionProvider");
  }
  return context;
}
