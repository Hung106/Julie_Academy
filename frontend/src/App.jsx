import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { Box, CircularProgress, ThemeProvider, CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import getTheme from './theme.jsx';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './services/keycloak.jsx'; 


// Lazy load components and pages
const Navbar = lazy(() => import('./components/Navbar.jsx'));
const HomePage = lazy(() => import('./pages/homePage.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
const Login = lazy(() => import('./pages/loginPage.jsx'));
const RoleRedirect = lazy(() => import('./services/roleDirect.jsx'));
const SelectRolePage = lazy(() => import('./pages/SelectRolePage.jsx'));
const TutorDashboard = lazy(() => import('./pages/tutors/tutorDashboard.jsx'));
const StudentDashboard = lazy(() => import('./pages/students/studentDashboard.jsx'));
const ParentDashboard = lazy(() => import('./pages/parents/parentDashboard.jsx'));
const TutorVoice = lazy(() => import('./pages/tutorVoicePage.jsx'));
const ProtectedRoute = lazy(() => import('./services/protectedRoute.jsx'));
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
  const [keycloakError, setKeycloakError] = useState(null);

  // Chỉ hiển thị lỗi nếu KeycloakProvider không khởi tạo được
  if (keycloakError) {
    return (
      <Box sx={{ p: 4, color: 'error.main', textAlign: 'center' }}>
        <h2>Đã xảy ra lỗi xác thực</h2>
        <p>Vui lòng kiểm tra lại kết nối đến server Keycloak và thử tải lại trang.</p>
        <pre>{keycloakError.message}</pre>
      </Box>
    );
  }

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: 'check-sso', checkLoginIframe: false }}
      onEvent={(event, error) => {
        if (event === 'onInitError' && error) {
            setKeycloakError(error);
        }
      }}
      LoadingComponent={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
      }
    >
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
                    {/* Các route công khai */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/select-role" element={<SelectRolePage />} />

                    {/* Route dùng để chuyển hướng sau khi đăng nhập */}
                    <Route path="/redirect" element={<RoleRedirect />} />

                    {/* Các route được bảo vệ theo vai trò */}
                    <Route
                      path="/dashboard/tutor"
                      element={
                        <ProtectedRoute allowedRoles={['tutor']}>
                          <TutorDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/student"
                      element={
                        <ProtectedRoute allowedRoles={['student']}>
                          <StudentDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/parent"
                      element={
                        <ProtectedRoute allowedRoles={['parent']}>
                          <ParentDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/tutor-voice"
                      element={
                        <ProtectedRoute allowedRoles={['tutor']}>
                          <TutorVoice />
                        </ProtectedRoute>
                      }
                    />
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
    </ReactKeycloakProvider>
  );
}

export default App;