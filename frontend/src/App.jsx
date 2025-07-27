import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { HelmetProvider } from "react-helmet-async";
import {
  Box,
  CircularProgress,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import { createAppTheme } from "./theme.jsx";
import keycloak from "./services/keycloak.jsx";
import AppRoutes from "./routes/appRoutes.jsx";
import UserSyncManager from "./services/UserSyncManager.jsx";


const KeycloakLoading = (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function Application() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <Router>
          <UserSyncManager />
          <ScrollToTop />
          <AppRoutes mode={mode} toggleMode={toggleMode} />
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

function App() {
  const [keycloakError, setKeycloakError] = useState(null);

  const handleKeycloakEvent = (event, error) => {
    if (event === "onInitError" && error) {
      console.error("Keycloak Init Error:", error);
      setKeycloakError(error);
    }
  };

  if (keycloakError) {
    return (
      <Box sx={{ p: 4, color: "error.main", textAlign: "center" }}>
        <h2>Lỗi kết nối đến máy chủ xác thực</h2>
        <p>
          Không thể khởi tạo phiên làm việc. Vui lòng thử tải lại trang sau.
        </p>
      </Box>
    );
  }

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={handleKeycloakEvent}
      LoadingComponent={KeycloakLoading}
    >
      <Application />
    </ReactKeycloakProvider>
  );
}

export default App;
