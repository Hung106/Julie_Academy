// Voice-to-Text Real-time Streaming API relay (WebSocket)
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const querystring = require('querystring');
require('dotenv').config();

const router = express.Router();

// Tạo server HTTP và WebSocket relay endpoint
const ASSEMBLYAI_KEY = process.env.TEXT_TO_SPEECH_ASSEMBLYAI_KEY;
const CONNECTION_PARAMS = {
  sample_rate: 16000,
  format_turns: true,
};
const ASSEMBLYAI_WS_URL = `wss://api.assemblyai.com/v3/realtime/ws?${querystring.stringify(CONNECTION_PARAMS)}`;

// Để dùng chung với app Express chính
let wsServer;
router.ws = (server) => {
  wsServer = new WebSocket.Server({ server, path: '/ws/voice-stream' });
  wsServer.on('connection', (clientWs, req) => {
    console.log('Client connected:', req.socket.remoteAddress);
    if (!ASSEMBLYAI_KEY) {
      clientWs.close(1011, 'Missing AssemblyAI API key');
      console.error('Missing AssemblyAI API key');
      return;
    }
    // Kết nối tới AssemblyAI
    const aaiWs = new WebSocket(ASSEMBLYAI_WS_URL, {
      headers: { Authorization: ASSEMBLYAI_KEY },
    });
    let closed = false;
    aaiWs.on('open', () => {
      console.log('Connected to AssemblyAI WebSocket');
    });
    aaiWs.on('unexpected-response', (req, res) => {
      console.error('Unexpected response from AssemblyAI:', res.statusCode, res.statusMessage);
    });
    aaiWs.on('ping', () => {
      console.log('Received ping from AssemblyAI');
    });
    aaiWs.on('pong', () => {
      console.log('Received pong from AssemblyAI');
    });
    // Relay transcript từ AssemblyAI về client
    aaiWs.on('message', (msg) => {
      try {
        const data = JSON.parse(msg);
        if (data.text) {
          clientWs.send(JSON.stringify({ transcript: data.text, type: data.type }));
          console.log('Transcript sent to client:', data.text);
        } else if (data.error) {
          clientWs.send(JSON.stringify({ error: 'AssemblyAI: ' + data.error }));
          console.error('AssemblyAI error:', data.error);
        } else {
          console.log('Received message from AssemblyAI:', data);
        }
      } catch (e) {
        console.error('Error parsing AssemblyAI message:', e, msg);
      }
    });
    // Relay audio chunk từ client lên AssemblyAI
    clientWs.on('message', (audioChunk, isBinary) => {
      console.log('Received audio chunk from client:', audioChunk.length, 'bytes', 'isBinary:', isBinary);
      if (!isBinary || !Buffer.isBuffer(audioChunk)) {
        clientWs.send(JSON.stringify({ error: 'Invalid audio chunk format' }));
        console.error('Invalid audio chunk format:', audioChunk);
        return;
      }
      if (audioChunk.length > 1024 * 1024) { // 1MB limit
        clientWs.send(JSON.stringify({ error: 'Audio chunk quá lớn (>1MB)' }));
        console.error('Audio chunk quá lớn (>1MB)');
        return;
      }
      if (aaiWs.readyState === WebSocket.OPEN) {
        aaiWs.send(audioChunk);
        console.log('Audio chunk relayed to AssemblyAI');
      } else {
        console.error('AssemblyAI WebSocket not open, cannot relay audio');
      }
    });
    // Đóng kết nối nếu 1 bên disconnect hoặc lỗi
    const closeAll = (reason) => {
      if (closed) return;
      closed = true;
      console.log('Closing connections:', reason);
      try { if (clientWs.readyState === WebSocket.OPEN) clientWs.close(1000, reason); } catch (e) { console.error('Error closing clientWs:', e); }
      try { if (aaiWs.readyState === WebSocket.OPEN) aaiWs.close(1000, reason); } catch (e) { console.error('Error closing aaiWs:', e); }
    };
    clientWs.on('close', (code, reason) => {
      console.log('Client WebSocket closed:', code, reason.toString());
      closeAll('client closed');
    });
    aaiWs.on('close', (code, reason) => {
      console.log('AssemblyAI WebSocket closed:', code, reason.toString());
      closeAll('aai closed');
    });
    clientWs.on('error', (err) => {
      console.error('Client WS error:', err);
      closeAll('client error');
    });
    aaiWs.on('error', (err) => {
      console.error('AssemblyAI WS error:', err);
      clientWs.send(JSON.stringify({ error: 'AssemblyAI WebSocket error' }));
      closeAll('aai error');
    });
  });
};

module.exports = router;
