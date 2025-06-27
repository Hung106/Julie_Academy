// middlewares/errorHandler.js
// Middleware xử lý lỗi tập trung cho Express
module.exports = (err, req, res, next) => {
  console.error("[Express] Lỗi:", err);
  res.status(500).json({ error: err.message || "Lỗi máy chủ nội bộ" });
};
