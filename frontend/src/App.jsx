import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import { Box, CircularProgress, ThemeProvider, CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import getTheme from './theme.jsx';

const Navbar = lazy(() => import('./components/Navbar'));
const HomePage = lazy(() => import('./pages/homePage.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
const Login = lazy(() => import('./pages/loginPage.jsx'));
const SignUp = lazy(() => import('./pages/signupPage.jsx'));
const TutorVoice = lazy(() => import('./pages/tutorVoicePage.jsx'));
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Suspense fallback={<Box sx={{ textAlign: 'center', mt: 2, py: 1, bgcolor: 'background.default' }}><CircularProgress size={28} color="primary" /><div style={{ color: theme.palette.primary.main, fontSize: 16, marginTop: 8 }}>Đang tải thanh điều hướng...</div></Box>}>
              <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
                <Navbar toggleMode={toggleMode} mode={mode} />
              </Box>
            </Suspense>
            <Box component="main" aria-label="Nội dung chính" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: { xs: '64px', sm: '64px' } }}>
              <Suspense fallback={<Box sx={{ textAlign: 'center', mt: 5, py: 2, bgcolor: 'background.default' }}><CircularProgress size={32} color="primary" /><div style={{ color: theme.palette.primary.main, fontSize: 18, marginTop: 10 }}>Đang tải nội dung...</div></Box>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                  <Route path="/tutor-voice" element={<TutorVoice />} />
                </Routes>
              </Suspense>
            </Box>
            <Suspense fallback={<Box sx={{ textAlign: 'center', py: 1, bgcolor: 'background.default' }}><CircularProgress size={20} color="primary" /><div style={{ color: theme.palette.primary.main, fontSize: 14, marginTop: 6 }}>Đang tải chân trang...</div></Box>}>
              <Footer />
            </Suspense>
          </Box>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;