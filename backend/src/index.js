const express = require('express');
const cors = require('cors');
const http = require('http');
const voiceToTextRouter = require('./routes/voiceToText');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', voiceToTextRouter);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Tích hợp WebSocket relay
if (voiceToTextRouter.ws) {
  voiceToTextRouter.ws(server);
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});