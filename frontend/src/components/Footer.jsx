import React from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Typography, Link as MuiLink, IconButton, Container, Grid, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const LIGHT_MODE_FOOTER_BG = '#101828';

const socialLinks = [
  {
    label: 'Facebook của Julie Academy',
    href: '#',
    icon: FacebookIcon,
    brandColor: '#1877F2',
  },
  {
    label: 'Kênh YouTube của Julie Academy',
    href: '#',
    icon: YouTubeIcon,
    brandColor: '#FF0000',
  },
];

const footerSections = [
  {
    title: 'Khám phá',
    links: [
      { label: 'Giới thiệu', href: '#' },
      { label: 'Khóa học', href: '#' },
      { label: 'Liên hệ', href: '#' },
    ],
  },
  {
    title: 'Pháp lý',
    links: [
      { label: 'Chính sách bảo mật', href: '#' },
      { label: 'Điều khoản', href: '#' },
    ],
  },
  {
    title: 'Thông tin liên hệ',
    links: [
      {
        label: 'julieacademy@gmail.com',
        href: 'mailto:julieacademy@gmail.com',
        icon: EmailIcon,
      },
      { label: '0123 456 789', href: 'tel:0123456789', icon: PhoneIcon },
    ],
  },
];

const linkStyles = (theme) => ({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'color 0.2s ease-in-out, letter-spacing 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
    letterSpacing: '0.2px',
  },
});

const contactLinkStyles = (theme) => ({
  ...linkStyles(theme),
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
});

const socialIconStyles = (theme, brandColor) => ({
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

const Footer = React.memo(function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      aria-label="Footer"
      sx={{
        width: '100%',
        mt: 'auto',
        backgroundColor: isDark ? theme.palette.background.paper : LIGHT_MODE_FOOTER_BG,
        color: isDark ? theme.palette.text.secondary : alpha('#FFFFFF', 0.8),
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <nav aria-label="Footer navigation">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ color: isDark ? theme.palette.primary.light : theme.palette.common.white, fontWeight: 'bold' }}>
                Julie Academy
              </Typography>
              <Typography variant="body2" sx={{ pr: 4 }}>
                Hệ thống luyện tập thông minh giúp bạn chinh phục mọi thử thách học tập.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={social.label}
                    sx={socialIconStyles(theme, social.brandColor)}
                  >
                    <social.icon />
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            {footerSections.map((section) => (
              <Grid key={section.title} xs={6} sm={3} md={2}>
                <Typography component="p" variant="subtitle1" gutterBottom sx={{ color: isDark ? theme.palette.primary.light : theme.palette.common.white, fontWeight: 'medium' }}>
                  {section.title}
                </Typography>
                <Stack spacing={1.5}>
                  {section.links.map((link) => (
                    <MuiLink
                      key={link.label}
                      href={link.href}
                      variant="body2"
                      sx={link.icon ? contactLinkStyles(theme) : linkStyles(theme)}
                    >
                      {link.icon && <link.icon fontSize="small" />}
                      {link.label}
                    </MuiLink>
                  ))}
                </Stack>
              </Grid>
            ))}
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