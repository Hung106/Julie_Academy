# Julie Academy System

## Giới thiệu
Nền tảng học tập trực tuyến ứng dụng AI & Khoa học Dữ liệu, giúp chuẩn hóa kiến thức, hỗ trợ giáo viên và học sinh.

## Yêu cầu
- Node.js >= 16
- npm >= 8
- Tài khoản Deepgram (để sử dụng tính năng voice-to-text)

## Cài đặt

### 1. Clone dự án
```bash
git clone https://github.com/your-username/smart_practice_system.git
cd smart_practice_system
```

### 2. Cài đặt dependencies cho frontend
```bash
cd frontend
npm install
```

### 3. Cài đặt Material UI (MUI) và React Router DOM (nếu chưa có)
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom
```

### 4. Chạy frontend (dev)
```bash
npm run dev
```

### 5. Cài đặt dependencies cho backend
```bash
cd ../backend
npm install
```

### 6. Tạo file môi trường cho backend
Tạo file `.env` trong thư mục `backend/` với nội dung:
```
DEEPGRAM_API_KEY=your_deepgram_api_key
```

### 7. Chạy backend (dev)
```bash
npm start
```

## Voice-to-Text (Realtime Transcription)
- Tính năng nhận diện giọng nói realtime sử dụng Deepgram Nova-2.
- Frontend chỉ hỗ trợ trình duyệt có `MediaRecorder` với `audio/ogg;codecs=opus` (Chrome, Edge, Opera, v.v.).
- Backend stream audio qua WebSocket tới Deepgram, trả transcript về frontend.

## Cấu trúc thư mục
- `frontend/`: React app (MUI, React Router DOM, voice-to-text UI)
- `backend/`: Node.js/Express API, WebSocket, Deepgram integration

## Production
- Build frontend: `cd frontend && npm run build`
- Deploy backend: `cd backend && npm run start` (hoặc dùng PM2, Docker...)
- Đảm bảo cấu hình biến môi trường `.env` cho backend ở môi trường production.

## Liên hệ
- Email: smartpracticesystem@gmail.com