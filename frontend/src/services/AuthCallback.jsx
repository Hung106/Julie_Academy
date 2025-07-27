import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Grid,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

// Configuration
const BACKEND_API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/assign-role`;

const roleConfig = {
  tutor: {
    label: "Tôi là Gia sư",
    bg: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
    img: "/role1.webp",
    desc: "Chia sẻ kiến thức, đồng hành cùng học sinh phát triển.",
    path: "/tutor-dashboard",
  },
  student: {
    label: "Tôi là Học sinh",
    bg: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
    img: "/role2.webp",
    desc: "Khám phá tri thức, chinh phục mục tiêu học tập.",
    path: "/student-dashboard",
  },
  parent: {
    label: "Tôi là Phụ huynh",
    bg: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
    img: "/role3.webp",
    desc: "Đồng hành cùng con trên hành trình học tập.",
    path: "/parent-dashboard",
  },
};

const roleData = Object.keys(roleConfig).map((key) => ({
  key,
  ...roleConfig[key],
}));

// API Helper
const assignRoleOnBackend = async (roleName, token) => {
  const response = await fetch(BACKEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roleName }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Không thể gán vai trò.");
  }
  return response.json();
};

// Styles
const styles = {
  loadingScreen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  selectionScreen: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    py: 4,
    px: 2,
  },
  titleBox: {
    pb: 4,
    textAlign: "center",
  },
  cardImageContainer: {
    width: "100%",
    height: 220,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    p: 3,
    textAlign: "center",
  },
  cardButton: {
    width: "80%",
    fontWeight: 700,
    fontSize: 18,
    py: 1.5,
    borderRadius: 2,
  },
};

// Sub-components
const LoadingScreen = React.memo(() => (
  <Box sx={styles.loadingScreen}>
    <CircularProgress />
    <Typography sx={{ ml: 2 }}>Đang kiểm tra thông tin đăng nhập...</Typography>
  </Box>
));

const RoleCard = React.memo(
  ({ role, onSelect, isLoading, isThisCardLoading }) => {
    const [isHovered, setHovered] = useState(false);

    const paperStyles = useMemo(
      () => ({
        cursor: isLoading ? "not-allowed" : "pointer",
        p: 0,
        minHeight: 520,
        width: "100%",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        background: role.bg,
        borderRadius: 5,
        overflow: "hidden",
        border: "3px solid transparent",
        transition:
          "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        opacity: isLoading && !isThisCardLoading ? 0.6 : 1,
        "&:hover": {
          transform: "scale(1.05)",
          borderColor: "#1976d2",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }),
      [role.bg, isLoading, isThisCardLoading]
    );

    return (
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Paper
          elevation={isHovered ? 12 : 3}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => !isLoading && onSelect(role.key)}
          sx={paperStyles}
        >
          <Box sx={styles.cardImageContainer}>
            <img
              src={role.img}
              alt={role.label}
              style={{ width: "auto", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box sx={styles.cardContent}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 1, color: "#1e3c72" }}
            >
              {role.label}
            </Typography>
            <Typography
              sx={{ color: "#444", mb: 3, fontSize: 16, minHeight: 48 }}
            >
              {role.desc}
            </Typography>
            <Button
              variant={isHovered ? "contained" : "outlined"}
              color="primary"
              size="large"
              disabled={isLoading}
              sx={styles.cardButton}
            >
              {isThisCardLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Chọn"
              )}
            </Button>
          </Box>
        </Paper>
      </Grid>
    );
  }
);

const RoleSelectionScreen = React.memo(
  ({ onSelectRole, isLoading, error, message, selectedRole }) => (
    <Box sx={styles.selectionScreen}>
      <Box sx={styles.titleBox}>
        <Typography
          variant="h2"
          fontWeight={900}
          color="#1e3c72"
          sx={{ mb: 1 }}
        >
          Julie Academy
        </Typography>
        <Typography variant="h5" sx={{ color: "#333", mb: 2, fontWeight: 500 }}>
          Chọn vai trò để bắt đầu hành trình của bạn
        </Typography>
      </Box>

      {error && (
        <Typography align="center" sx={{ color: "red", mb: 2 }}>
          {error}
        </Typography>
      )}
      {message && (
        <Typography align="center" sx={{ color: "green", mb: 2 }}>
          {message}
        </Typography>
      )}

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{ maxWidth: 1400 }}
      >
        {roleData.map((role) => (
          <RoleCard
            key={role.key}
            role={role}
            onSelect={onSelectRole}
            isLoading={isLoading}
            isThisCardLoading={isLoading && selectedRole === role.key}
          />
        ))}
      </Grid>
    </Box>
  )
);

// Main Component
export default function AuthCallback() {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (!initialized) return;

    if (!keycloak.authenticated) {
      navigate("/", { replace: true });
      return;
    }

    const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];
    const assignedRole = Object.keys(roleConfig).find((role) =>
      userRoles.includes(role)
    );

    if (assignedRole) {
      navigate(roleConfig[assignedRole].path, { replace: true });
    } else {
      setStatus("selecting");
    }
  }, [initialized, navigate, keycloak.authenticated, keycloak.tokenParsed]);

  const handleRoleSelection = useCallback(
    async (roleName) => {
      setLoading(true);
      setSelectedRole(roleName);
      setError(null);
      setMessage("");

      try {
        await assignRoleOnBackend(roleName, keycloak.token);

        setMessage(`Vai trò '${roleName}' đã được gán. Đang làm mới phiên...`);

        // Force a token refresh to get the new role from Keycloak
        await keycloak.updateToken(-1);

        const destination = roleConfig[roleName]?.path || "/";
        navigate(destination, { replace: true });
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      } finally {
        setLoading(false);
        setSelectedRole(null);
      }
    },
    [keycloak, navigate]
  );

  if (status === "checking") {
    return <LoadingScreen />;
  }

  return (
    <RoleSelectionScreen
      onSelectRole={handleRoleSelection}
      isLoading={loading}
      error={error}
      message={message}
      selectedRole={selectedRole}
      initOptions={{
      onLoad: "sso", 
  }}
    />
  );
}
