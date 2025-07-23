import React from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import {
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  Container,
  Grid,
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = React.memo(function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const linkStyles = {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out, letter-spacing 0.2s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
      letterSpacing: '0.2px',
    },
  };
  
  const socialIconStyles = (brandColor) => ({
    color: 'inherit',
    border: `1px solid ${theme.palette.divider}`,
    transition: 'transform 0.2s ease, color 0.2s ease, background-color 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      color: '#FFFFFF',
      backgroundColor: brandColor,
      borderColor: brandColor,
    },
  });

  return (
    <Box
      component="footer"
      aria-label="Footer"
      sx={{
        width: '100%',
        mt: 'auto',
        backgroundColor: isDark ? theme.palette.background.paper : '#101828',
        color: isDark ? theme.palette.text.secondary : alpha('#FFFFFF', 0.8),
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <nav aria-label="Footer navigation">
          <Grid container spacing={4} justifyContent="space-between">
            {/* Đã xóa prop "item" */}
            <Grid xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ color: isDark ? theme.palette.primary.light : theme.palette.common.white, fontWeight: 'bold' }}>
                Julie Academy
              </Typography>
              <Typography variant="body2" sx={{ pr: 4 }}>
                Hệ thống luyện tập thông minh giúp bạn chinh phục mọi thử thách học tập.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <IconButton component="a" href="#" target="_blank" rel="noopener" aria-label="Facebook của Julie Academy" sx={socialIconStyles('#1877F2')}>
                  <FacebookIcon />
                </IconButton>
                <IconButton component="a" href="#" target="_blank" rel="noopener" aria-label="Kênh YouTube của Julie Academy" sx={socialIconStyles('#FF0000')}>
                  <YouTubeIcon />
                </IconButton>
              </Stack>
            </Grid>
            
            {/* Đã xóa prop "item" */}
            <Grid xs={6} sm={3} md={2}>
              <Typography component="p" variant="subtitle1" gutterBottom sx={{ color: isDark ? theme.palette.primary.light : theme.palette.common.white, fontWeight: 'medium' }}>
                Khám phá
              </Typography>
              <Stack spacing={1}>
                <MuiLink href="#" variant="body2" sx={linkStyles}>Giới thiệu</MuiLink>
                <MuiLink href="#" variant="body2" sx={linkStyles}>Khóa học</MuiLink>
                <MuiLink href="#" variant="body2" sx={linkStyles}>Liên hệ</MuiLink>
              </Stack>
            </Grid>

            {/* Đã xóa prop "item" */}
            <Grid xs={6} sm={3} md={2}>
              <Typography component="p" variant="subtitle1" gutterBottom sx={{ color: isDark ? theme.palette.primary.light : theme.palette.common.white, fontWeight: 'medium' }}>
                Pháp lý
              </Typography>
              <Stack spacing={1}>
                <MuiLink href="#" variant="body2" sx={linkStyles}>Chính sách bảo mật</MuiLink>
                <MuiLink href="#" variant="body2" sx={linkStyles}>Điều khoản</MuiLink>
              </Stack>
            </Grid>
            
            {/* Đã xóa prop "item" */}
            <Grid xs={12} sm={6} md={4}>
              <Typography component="p" variant="subtitle1" gutterBottom sx={{ color: isDark ? theme.palette.primary.light : theme.palette.common.white, fontWeight: 'medium' }}>
                Thông tin liên hệ
              </Typography>
              <Stack spacing={1.5}>
                <MuiLink href="mailto:julieacademy@gmail.com" variant="body2" sx={{ ...linkStyles, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <EmailIcon fontSize="small" />
                  julieacademy@gmail.com
                </MuiLink>
                <MuiLink href="tel:0123456789" variant="body2" sx={{ ...linkStyles, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <PhoneIcon fontSize="small" />
                  0123 456 789
                </MuiLink>
              </Stack>
            </Grid>
          </Grid>
        </nav>
      </Container>

      <Box
        component="section"
        sx={{
          py: 2,
          textAlign: 'center',
          backgroundColor: isDark ? alpha(theme.palette.common.black, 0.2) : alpha(theme.palette.common.black, 0.3),
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Smart Practice System. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
});

export default Footer;