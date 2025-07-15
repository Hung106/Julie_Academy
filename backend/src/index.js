require("dotenv").config();
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const startVoiceWsServer = require("./controllers/voiceWsServer");
const errorHandler = require("./middlewares/errorHandler");
const { initKeycloakAdminClient } = require('./services/keycloakAdmin'); // Import

const app = express();

// Cấu hình CORS cho Express
app.use(cors({
  origin: 'http://localhost:5173', // Cho phép frontend của bạn
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Route gán role cho user
const assignRoleRouter = require('./routes/assignRole');
app.use('/api/assign-role', assignRoleRouter);
app.use(errorHandler);

const server = createServer(app);

// Khởi tạo Keycloak Admin Client khi server bắt đầu
initKeycloakAdminClient().then(() => {
  console.log('Keycloak Admin Client ready.');
  // Bắt đầu Voice WS Server sau khi Keycloak Admin Client sẵn sàng
  try {
    startVoiceWsServer(server);
  } catch (err) {
    console.error("[index.js] Lỗi khởi tạo voiceWsServer:", err);
  }

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('[index.js] Không thể khởi tạo Keycloak Admin Client. Server không khởi động.', err);
  process.exit(1); // Thoát nếu không thể khởi tạo Admin Client
});