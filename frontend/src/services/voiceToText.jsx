import { useRef, useState, useEffect, useCallback, useMemo } from "react";

/**
 * Custom hook cho voice-to-text sử dụng Deepgram qua WebSocket
 * Trả về các state, transcript, error, và các hàm điều khiển
 */
export function useVoiceToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [error, setError] = useState(null);

  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const toggleRecording = useCallback(() => {
    if (isConnecting) return;
    setError(null);
    if (!isRecording) {
      setFinalTranscript("");
      setCurrentTranscript("");
    }
    setIsRecording((prev) => !prev);
  }, [isConnecting, isRecording]);

  const clear = useCallback(() => {
    setCurrentTranscript("");
    setFinalTranscript("");
    setError(null);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    if (isRecording) {
      setIsConnecting(true);
      const connect = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (isCancelled) {
            stream.getTracks().forEach(track => track.stop());
            return;
          }
          streamRef.current = stream;
          const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
          const wsHost = window.location.hostname === "localhost" ? "103.153.72.184:5000" : window.location.host;
          const ws = new WebSocket(`${wsProtocol}${wsHost}/ws/voice-stream`);
          wsRef.current = ws;

          ws.onopen = () => {
            if (isCancelled) return;
            const mimeType = 'audio/ogg;codecs=opus';
            if (!window.MediaRecorder.isTypeSupported(mimeType)) {
              setError("Trình duyệt không hỗ trợ ghi âm định dạng opus.");
              setIsRecording(false);
              return;
            }
            const mediaRecorder = new window.MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (e) => {
              if (e.data.size > 0 && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(e.data);
              }
            };
            mediaRecorder.onstop = () => {
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({ type: 'FINISH_STREAM' }));
              }
            };
            mediaRecorder.onerror = (err) => {
              setError("Lỗi MediaRecorder: " + (err.error?.message || err.message));
            };
            mediaRecorder.start(500);
            setIsConnecting(false);
          };

          ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "transcript") {
              if (data.isFinal) {
                setFinalTranscript(prev => (prev + " " + data.content).trim());
                setCurrentTranscript("");
              } else {
                setCurrentTranscript(data.content);
              }
            } else if (data.type === "error") {
              setError("Lỗi từ backend: " + data.message);
            }
          };

          ws.onerror = () => {
            setError("Lỗi kết nối WebSocket.");
            setIsConnecting(false);
            setIsRecording(false);
          };

          ws.onclose = () => {
            setIsConnecting(false);
          };
        } catch (err) {
          if (isCancelled) return;
          setError("Không thể truy cập micro: " + err.message);
          setIsRecording(false);
          setIsConnecting(false);
        }
      };
      connect();
    }
    return () => {
      isCancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null;
      }
      setIsConnecting(false);
    };
  }, [isRecording]);

  const fullTranscript = useMemo(() => (finalTranscript + " " + currentTranscript).trim(), [finalTranscript, currentTranscript]);
  const copy = useCallback(() => {
    if (fullTranscript) {
      return navigator.clipboard.writeText(fullTranscript);
    }
  }, [fullTranscript]);

  return {
    isRecording,
    isConnecting,
    currentTranscript,
    finalTranscript,
    fullTranscript,
    error,
    toggleRecording,
    clear,
    copy,
  };
}
