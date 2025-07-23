import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Box, CircularProgress, ThemeProvider, CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { ReactKeycloakProvider } from '@react-keycloak/web';

import getTheme from './theme.jsx';
import keycloak from './services/keycloak.jsx';
import AppRoutes from './routes/appRoutes.jsx';
import UserSyncManager from './services/UserSyncManager.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

const NAVBAR_HEIGHT = 64;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

const KeycloakLoading = (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const keycloakInitOptions = {
  onLoad: 'check-sso',
  checkLoginIframe: false,
};


function App() {
  const [mode, setMode] = useState('dark');
  const [keycloakError, setKeycloakError] = useState(null);

  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleKeycloakEvent = (event, error) => {
    if (event === 'onInitError' && error) {
      console.error('Keycloak Init Error:', error);
      setKeycloakError(error);
    }
  };

  if (keycloakError) {
    return (
      <Box sx={{ p: 4, color: 'error.main', textAlign: 'center' }}>
        <h2>Lỗi kết nối đến máy chủ xác thực</h2>
        <p>Không thể khởi tạo phiên làm việc. Vui lòng thử tải lại trang sau.</p>
      </Box>
    );
  }

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakInitOptions}
      onEvent={handleKeycloakEvent}
      LoadingComponent={KeycloakLoading}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Router>
            <UserSyncManager />
            <ScrollToTop />

            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              
              <Box
                component="header"
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: (theme) => theme.zIndex.appBar, 
                }}
              >
                <Navbar toggleMode={toggleMode} mode={mode} />
              </Box>

              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  pt: `${NAVBAR_HEIGHT}px`, 
                }}
              >
                <AppRoutes />
              </Box>
              
              <Box component="footer">
                <Footer />
              </Box>
            </Box>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
}

export default App;