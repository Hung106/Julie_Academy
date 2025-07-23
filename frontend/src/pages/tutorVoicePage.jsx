import React from "react";
import { useVoiceToText } from "../services/voiceToText";

export default function TutorVoicePage() {
  const {
    isRecording,
    isConnecting,
    currentTranscript,
    finalTranscript,
    fullTranscript,
    error,
    toggleRecording,
    clear,
    copy,
  } = useVoiceToText();
  const [copyButtonText, setCopyButtonText] = React.useState("Copy");

  const handleCopy = () => {
    if (fullTranscript) {
      copy().then(() => {
        setCopyButtonText("Đã sao chép!");
        setTimeout(() => setCopyButtonText("Copy"), 2000);
      });
    }
  };

  const handleClear = () => {
    clear();
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-10 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Real-time Transcription</h1>
      <p className="text-gray-600 mb-8">Sử dụng Deepgram Nova-2</p>

      <div className="relative flex items-center justify-center mb-4">
        <button
          onClick={toggleRecording}
          disabled={isConnecting}
          className={`
            relative z-10 flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-offset-2 
            ${isRecording ? "bg-red-500 hover:bg-red-600 focus:ring-red-400" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"}
            ${isConnecting ? "cursor-wait opacity-60" : "cursor-pointer"}
          `}
          title={isRecording ? "Đang ghi âm (nhấn để dừng)" : "Bắt đầu ghi âm"}
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isRecording ? (
              <path d="M6 6h12v12H6z" /> // Stop icon
            ) : (
              <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V23h2v-1.08c3.39-.49 6-3.39 6-6.92h-2z"/> // Mic icon
            )}
          </svg>
        </button>
        {isRecording && (
          <div className="absolute w-20 h-20 bg-red-400 rounded-full animate-ping"></div>
        )}
      </div>

      <div className="h-6 text-center mb-8">
        <p className={`font-medium transition-colors duration-300 ${error ? "text-red-600" : "text-gray-700"}`}>
          {error ? error : (isConnecting ? "Đang kết nối..." : (isRecording ? "Đang ghi âm..." : "Nhấn để ghi âm"))}
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Transcript</div>
        </div>
        <div
          className="w-full min-h-[120px] bg-gray-50 rounded-lg border border-gray-300 p-4 text-gray-800 text-base leading-relaxed whitespace-pre-wrap break-words select-text"
        >
          <span>{finalTranscript}</span>
          <span className="text-gray-500">{currentTranscript}</span>
          {!fullTranscript && !error && <span className="text-gray-400">(Nội dung sẽ xuất hiện ở đây...)</span>}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleCopy}
            className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            disabled={!fullTranscript}
            title="Sao chép transcript"
          >{copyButtonText}</button>
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 disabled:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
            disabled={!fullTranscript && !error}
            title="Xóa transcript"
          >Clear</button>
        </div>
      </div>
    </div>
  );
}
