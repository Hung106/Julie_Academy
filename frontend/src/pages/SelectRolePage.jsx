// src/pages/SelectRolePage.js
import React, { useState } from 'react';
import { Grid, Paper, Typography, CircularProgress, Box, Button } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

const BACKEND_API_URL = 'http://localhost:5000/api/assign-role';



export default function SelectRolePage() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [hovered, setHovered] = useState(null);

  const handleRoleSelection = async (roleName) => {
    setLoading(true);
    setError(null);
    setMessage('');
    try {
      const response = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify({ roleName }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign role on backend.');
      }
      const successData = await response.json();
      setMessage(successData.message || `Role '${roleName}' assigned successfully!`);
      const refreshed = await keycloak.updateToken();
      const updatedRoles = keycloak.tokenParsed?.realm_access?.roles || [];
      if (refreshed) {
        if (updatedRoles.includes('tutor')) navigate('/dashboard/tutor', { replace: true });
        else if (updatedRoles.includes('student')) navigate('/dashboard/student', { replace: true });
        else if (updatedRoles.includes('parent')) navigate('/dashboard/parent', { replace: true });
        else navigate('/');
      } else {
        setError('Failed to refresh token. Please re-login.');
        keycloak.logout();
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const roleData = [
    {
      key: 'tutor',
      label: 'Tôi là Gia sư',
      bg: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      img: '/role1.webp',
      desc: 'Chia sẻ kiến thức, đồng hành cùng học sinh phát triển.'
    },
    {
      key: 'student',
      label: 'Tôi là Học sinh',
      bg: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)',
      img: '/role2.webp',
      desc: 'Khám phá tri thức, chinh phục mục tiêu học tập.'
    },
    {
      key: 'parent',
      label: 'Tôi là Phụ huynh',
      bg: 'linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)',
      img: '/role3.webp',
      desc: 'Đồng hành cùng con trên hành trình học tập.'
    },
  ];

  return (
    <Box sx={{
      minHeight: '5vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      background: {
        xs: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
        md: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%), url(/homepage1.jpg) no-repeat center/cover',
      },
      py: 0,
      position: 'relative',
    }}>
      <Box sx={{
        width: '100%',
        pt: { xs: 2, md: 4 }, // Đẩy tiêu đề lên trên
        pb: 2,
        textAlign: 'center',
        zIndex: 2,
        position: 'relative',
      }}>
        <Typography variant="h2" fontWeight={900} color="#1e3c72" sx={{ mb: 1, letterSpacing: 1, textShadow: '0 2px 16px #fff' }}>
          Julie Academy
        </Typography>
        <Typography variant="h5" sx={{ color: '#333', mb: 2, fontWeight: 500, textShadow: '0 1px 8px #fff' }}>
          Chọn vai trò để bắt đầu hành trình học tập và phát triển của bạn
        </Typography>
      </Box>
      {error && <Typography align="center" sx={{ color: 'red', mb: 1, zIndex: 2 }}>{error}</Typography>}
      {message && <Typography align="center" sx={{ color: 'green', mb: 1, zIndex: 2 }}>{message}</Typography>}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ maxWidth: 1400, mx: 'auto', flexWrap: 'nowrap', zIndex: 2 }}>
        {roleData.map((role) => (
          <Box key={role.key} sx={{ display: 'flex', minWidth: 380, maxWidth: 500 }}>
            <Paper
              elevation={hovered === role.key ? 12 : 3}
              onMouseEnter={() => setHovered(role.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => !loading && handleRoleSelection(role.key)}
              sx={{
                cursor: loading ? 'not-allowed' : 'pointer',
                p: 0,
                minHeight: 520,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background: role.bg,
                borderRadius: 5,
                boxShadow: hovered === role.key ? 10 : 3,
                transform: hovered === role.key ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
                border: hovered === role.key ? '3px solid #1976d2' : '2px solid #eee',
                opacity: loading && hovered !== role.key ? 0.6 : 1,
                outline: 'none',
                userSelect: 'none',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box sx={{ width: '100%', height: 220, background: '#fff', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden', pt: 2 }}>
                <img src={role.img} alt={role.label} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top' }} />
              </Box>
              <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: '#1e3c72', textShadow: '0 1px 8px #fff' }}>
                  {role.label}
                </Typography>
                <Typography align="center" sx={{ color: '#444', mb: 2, fontSize: 16, minHeight: 48 }}>
                  {role.desc}
                </Typography>
                <Button
                  variant={hovered === role.key ? 'contained' : 'outlined'}
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{
                    width: '80%',
                    fontWeight: 700,
                    fontSize: 18,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: hovered === role.key ? 3 : 0,
                    transition: 'all 0.2s',
                  }}
                >
                  {loading && hovered === role.key ? <CircularProgress size={24} color="inherit" /> : 'Chọn'}
                </Button>
              </Box>
            </Paper>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    gap: '15px',
  },
  button: {
    padding: '12px 25px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  message: {
    color: 'green',
    marginTop: '10px',
  }
};