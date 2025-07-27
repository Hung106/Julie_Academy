require("dotenv").config();

const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const keycloak = require("./middlewares/keycloak.middleware");
const userRoutes = require("./api/user.route");
const authRoutes = require("./api/auth.route");
const questionRoutes = require("./api/question.route");
const { initKeycloakAdminClient } = require("./services/keycloak.service");

const app = express();
const PORT = config.port || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  keycloak.middleware({
    logout: "/logout",
    admin: "/",
  })
);

// Route cho việc xác thực và đồng bộ người dùng
app.use("/api/auth", authRoutes);
// Route cho các tính năng liên quan đến người dùng
app.use("/api", userRoutes);
// Route cho các tính năng liên quan đến câu hỏi
app.use('/api/questions', questionRoutes);

const startServer = async () => {
  try {
    await initKeycloakAdminClient();
    console.log("Keycloak Admin Client đã sẵn sàng.");

    app.listen(PORT, () => {
      console.log(`Server đang lắng nghe tại http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Lỗi nghiêm trọng, không thể khởi động server:", error);
    process.exit(1);
  }
};

startServer();
