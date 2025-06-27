require("dotenv").config();
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const startVoiceWsServer = require("./controllers/voiceWsServer");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
// app.use(express.json()); // Bật nếu cần xử lý JSON body cho các endpoint HTTP khác
app.use(errorHandler);

const server = createServer(app);

try {
  startVoiceWsServer(server);
} catch (err) {
  console.error("[index.js] Lỗi khởi tạo voiceWsServer:", err);
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${PORT}`);
});
