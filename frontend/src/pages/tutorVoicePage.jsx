import React, { useRef, useState } from "react";

export default function TutorVoice() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const recordTimeoutRef = useRef(null);

  const handleRecordClick = async () => {
    if (!isRecording) {
      setTranscript("");
      // Check MediaRecorder support
      if (!window.MediaRecorder) {
        setTranscript("Trình duyệt không hỗ trợ ghi âm.");
        return;
      }
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
      } catch (err) {
        setTranscript("Không thể truy cập micro: " + err.message);
        return;
      }
      // Kết nối WebSocket tới backend relay
      const ws = new window.WebSocket("ws://localhost:5000/ws/voice-stream");
      wsRef.current = ws;
      ws.onopen = () => {
        mediaRecorderRef.current = new window.MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data && e.data.size > 0 && ws.readyState === 1) {
            e.data.arrayBuffer().then(buf => ws.send(buf));
          }
        };
        mediaRecorderRef.current.start(250); // Gửi chunk mỗi 250ms
        setIsRecording(true);
        // Tự động dừng sau 30s
        recordTimeoutRef.current = setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
          }
        }, 30000);
      };
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.transcript) {
            setTranscript(t => t + (t ? "\n" : "") + data.transcript);
          }
        } catch {}
      };
      ws.onerror = (e) => {
        console.error("WebSocket error:", e);
        setTranscript("Lỗi WebSocket: Không thể kết nối hoặc đã bị ngắt. Vui lòng kiểm tra backend hoặc kết nối mạng.");
      };
      ws.onclose = () => {
        setIsRecording(false);
      };
    } else {
      setIsRecording(false);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (wsRef.current && wsRef.current.readyState === 1) {
        wsRef.current.close();
      }
      if (recordTimeoutRef.current) {
        clearTimeout(recordTimeoutRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40, minHeight: 400 }}>
      <button
        onClick={handleRecordClick}
        style={{
          background: isRecording ? "#ff5252" : "#1976d2",
          border: "none",
          borderRadius: "50%",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          cursor: isRecording ? "not-allowed" : "pointer",
          outline: "none",
          opacity: isRecording ? 0.6 : 1
        }}
        title={isRecording ? "Đang ghi âm" : "Bắt đầu ghi âm"}
        disabled={isRecording}
      >
        {/* Microphone SVG icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V23h2v-1.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>
      <div style={{ marginTop: 16, color: isRecording ? "#ff5252" : "#1976d2" }}>
        {isRecording ? "Đang ghi âm..." : "Nhấn để ghi âm"}
      </div>
      {/* Transcript display box */}
      <div style={{
        marginTop: 32,
        width: 420,
        minHeight: 120,
        background: "#fafbfc",
        border: "1.5px solid #e0e0e0",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        padding: 20,
        color: "#222",
        fontSize: 18,
        fontWeight: 500,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}>
        <div style={{ fontSize: 15, color: "#888", marginBottom: 8 }}>Transcript</div>
        <div
          style={{
            width: "100%",
            minHeight: 60,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            background: "#fff",
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            padding: 12,
            fontSize: 17,
            color: transcript ? "#222" : "#aaa",
            userSelect: "text",
            marginBottom: 12,
            transition: "border 0.2s"
          }}
        >
          {transcript || "(Chưa có transcript)"}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => {
              if (transcript) {
                navigator.clipboard.writeText(transcript);
              }
            }}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 18px",
              fontWeight: 500,
              fontSize: 15,
              cursor: transcript ? "pointer" : "not-allowed",
              opacity: transcript ? 1 : 0.5
            }}
            disabled={!transcript}
            title="Copy transcript"
          >Copy</button>
          <button
            onClick={() => setTranscript("")}
            style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: 6,
              padding: "6px 18px",
              fontWeight: 500,
              fontSize: 15,
              cursor: transcript ? "pointer" : "not-allowed",
              opacity: transcript ? 1 : 0.5
            }}
            disabled={!transcript}
            title="Xóa transcript"
          >Clear</button>
        </div>
      </div>
    </div>
  );
}
