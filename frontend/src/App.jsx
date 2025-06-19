import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'; // Đảm bảo file CSS này không có overflow: hidden trên body/html
import { Box } from '@mui/material'; // Import Box từ MUI

const Navbar = lazy(() => import('./components/Navbar'));
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
const Login = lazy(() => import('./pages/loginPage.jsx'));
const SignUp = lazy(() => import('./pages/signupPage.jsx'));

function App() {
  return (
    <Router>
      {/* Bọc toàn bộ ứng dụng trong một Box để quản lý layout và cuộn */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: '#3282B8', background: '#1B262C', padding: '10px 0' }}>Đang tải thanh điều hướng...</div>}>
          <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
            <Navbar />
          </Box>
        </Suspense>

        {/* Thêm padding-top để tránh che nội dung bởi Navbar fixed */}
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: { xs: '64px', sm: '64px' } }}>
          <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 40, fontSize: 18, color: '#3282B8', background: '#1B262C', flexGrow: 1 }}>Đang tải nội dung...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Box>

        <Suspense fallback={<div style={{ textAlign: 'center', fontSize: 14, color: '#3282B8', background: '#1B262C', padding: '10px 0' }}>Đang tải chân trang...</div>}>
          <Footer />
        </Suspense>
      </Box>
    </Router>
  );
}

export default App;