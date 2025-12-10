import { useEffect, useRef, useState } from "react";

const WS_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_WEBSOCKET_URL ??
      `ws://${window.location.hostname}:8000/api/v1/stream`
    : "ws://localhost:8000/api/v1/stream";

type Message = {
  timestamp: string;
  prediction: number;
  model_version: string;
  tx_hash?: string;
};

export function useForecastStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"connecting" | "open" | "closed">(
    "connecting",
  );
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;
    socket.onopen = () => setStatus("open");
    socket.onclose = () => setStatus("closed");
    socket.onerror = () => setStatus("closed");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as Message;
      setMessages((prev) => [...prev.slice(-50), data]);
    };
    return () => {
      socket.close();
    };
  }, []);

  return { messages, status };
}
