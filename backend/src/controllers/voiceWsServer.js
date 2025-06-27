// voiceWsServer.js

const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
const WebSocket = require("ws");

// Hàm khởi tạo WebSocket server cho voice stream
function startVoiceWsServer(server) {
  const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

  if (!deepgramApiKey) {
    console.error("DEEPGRAM_API_KEY không được thiết lập trong file .env");
    return;
  }

  // Khởi tạo Deepgram client
  const deepgram = createClient(deepgramApiKey);
  // Khởi tạo WebSocket server cho voice stream
  const wss = new WebSocket.Server({ server, path: "/ws/voice-stream" });

  wss.on("connection", (ws) => {
    console.log("[Backend] Client đã kết nối tới /ws/voice-stream");

    // Cấu hình Deepgram
    const deepgramConfig = {
      punctuate: true,
      model: "nova-2",
      language: "en-US", // Đổi sang 'vi' nếu nhận tiếng Việt
      sample_rate: 48000,
    };
    console.log('[Backend] Deepgram config:', deepgramConfig);

    // Biến lưu trạng thái và buffer audio
    let dgConnection;
    let audioBuffer = [];
    let dgReady = false;
    try {
      // Tạo kết nối tới Deepgram
      dgConnection = deepgram.listen.live(deepgramConfig);
      console.log("[Backend] Đã tạo kết nối Deepgram thành công.");
    } catch (error) {
      console.error("[Backend] Không thể tạo kết nối Deepgram:", error);
      ws.close(1011, "Lỗi khởi tạo Deepgram");
      return;
    }

    // Khi Deepgram đã sẵn sàng nhận audio
    dgConnection.on(LiveTranscriptionEvents.Open, () => {
      dgReady = true;
      console.log("[Backend] Kết nối Deepgram Live Transcription đã mở.");
      // Gửi toàn bộ buffer audio đã nhận trước đó lên Deepgram
      audioBuffer.forEach(chunk => {
        dgConnection.send(chunk);
        console.log("[Backend] Đã gửi audio chunk từ buffer lên Deepgram.");
      });
      audioBuffer = [];
      // Nếu đã nhận tín hiệu FINISH_STREAM trước khi Deepgram mở, gọi finish ngay
      if (ws._pendingFinish) {
        console.log("[Backend] Nhận FINISH_STREAM trước khi Deepgram mở, gọi finish ngay sau khi mở.");
        dgConnection.finish();
        ws._pendingFinish = false;
      }
    });

    // Nhận transcript từ Deepgram và gửi về frontend
    dgConnection.on(LiveTranscriptionEvents.Transcript, (data) => {
      console.log("[Backend] Nhận Transcript Event từ Deepgram:", JSON.stringify(data));
      const transcript = data.channel?.alternatives?.[0]?.transcript;
      if (transcript && transcript.length > 0) {
        const payload = {
          type: "transcript",
          content: transcript,
          isFinal: data.is_final
        };
        if(ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(payload));
          console.log("[Backend] Đã gửi transcript về frontend:", payload);
        }
      } else {
        console.log("[Backend] Không có transcript hợp lệ trong event này.");
      }
    });

    // Xử lý lỗi từ Deepgram
    dgConnection.on(LiveTranscriptionEvents.Error, (error) => {
      console.error("[Backend] Lỗi từ Deepgram:", error);
      if(ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "error", message: "Lỗi xử lý âm thanh từ Deepgram." }));
        console.log("[Backend] Đã gửi lỗi Deepgram về frontend.");
      }
    });

    // Deepgram đóng kết nối (kết thúc quá trình xử lý)
    dgConnection.on(LiveTranscriptionEvents.Close, () => {
      console.log("[Backend] Kết nối Deepgram đã đóng. Quá trình xử lý đã hoàn tất.");
    });

    // Nhận dữ liệu audio từ frontend (client)
    ws.on("message", (msg) => {
      // Nếu nhận được tín hiệu kết thúc stream từ frontend
      if (msg && msg.toString && msg.toString().includes('FINISH_STREAM')) {
        console.log("[Backend] Nhận tín hiệu FINISH_STREAM từ frontend. Gọi dgConnection.finish().");
        if (dgConnection && dgConnection.getReadyState() === 1) {
          dgConnection.finish();
        } else {
          // Nếu Deepgram chưa mở, lưu lại tín hiệu để gọi finish sau khi mở
          ws._pendingFinish = true;
        }
        return;
      }
      // Nếu Deepgram đã sẵn sàng, gửi audio chunk lên ngay
      if (dgReady && dgConnection && dgConnection.getReadyState() === 1) {
        dgConnection.send(msg);
        console.log("[Backend] Đã gửi audio chunk lên Deepgram.");
      } else {
        // Nếu chưa sẵn sàng, buffer lại
        audioBuffer.push(msg);
        console.log("[Backend] Buffer audio chunk vì Deepgram chưa sẵn sàng.");
      }
    });

    // Khi client ngắt kết nối
    ws.on("close", () => {
      console.log("[Backend] Client đã ngắt kết nối.");
      if (dgConnection && dgConnection.getReadyState() === 1) {
        console.log("[Backend] Yêu cầu Deepgram hoàn tất xử lý audio còn lại...");
        dgConnection.finish();
      } else {
        console.log("[Backend] Client ngắt kết nối, nhưng kết nối Deepgram đã đóng hoặc đang đóng.");
      }
    });

    // Xử lý lỗi WebSocket từ phía client
    ws.on("error", (error) => {
      console.error("[Backend] Lỗi WebSocket từ client:", error);
    });
  }); // Kết thúc wss.on("connection")

  console.log("WebSocket server đang lắng nghe trên ws://localhost:5000/ws/voice-stream");
}

module.exports = startVoiceWsServer;