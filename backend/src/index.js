const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Route kiểm tra kết nối
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
