import React from 'react';
import { Box, Typography, Link as MuiLink, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const footerLink = {
    color: '#f5e2c8', textDecoration: 'none', display: 'block', margin: '2px 0', opacity: 0.9,
    '&:hover': { opacity: 1, textDecoration: 'underline' }
};
const iconLink = {
    color: '#f5e2c8', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', opacity: 0.9,
    '&:hover': { opacity: 1 }
};

const Footer = React.memo(function Footer() {
    return (
        <footer style={{
            background: '#576CA8',
            color: '#222222',
            fontSize: 15,
            width: '100%',
            boxShadow: '0 -2px 16px rgba(27,38,79,0.10)',
            position: 'relative',
            left: 0,
            bottom: 0,
            zIndex: 100,
            borderRadius: 0,
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            maxWidth: '100vw',
        }}>
            <Box component="nav" aria-label="Footer" sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
                flexWrap: 'wrap',
                maxWidth: 1100,
                margin: '0 auto',
                py: 2,
                px: 2,
                boxSizing: 'border-box',
            }}>
                <Box sx={{ minWidth: 120, mb: 0.5 }}>
                    <Typography fontWeight={700} mb={0.5} color="#f5e2c8" fontSize={16}>Julie Academy</Typography>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li><MuiLink href="#" sx={footerLink} title="Giới thiệu về Julie Academy">Giới thiệu</MuiLink></li>
                        <li><MuiLink href="#" sx={footerLink} title="Liên hệ Julie Academy">Liên hệ</MuiLink></li>
                    </ul>
                </Box>
                <Box sx={{ minWidth: 120, mb: 0.5 }}>
                    <Typography fontWeight={700} mb={0.5} color="#f5e2c8" fontSize={16}>Chính sách</Typography>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li><MuiLink href="#" sx={footerLink} title="Chính sách bảo mật">Bảo mật</MuiLink></li>
                        <li><MuiLink href="#" sx={footerLink} title="Điều khoản sử dụng">Điều khoản</MuiLink></li>
                    </ul>
                </Box>
                <Box sx={{ minWidth: 180, mb: 0.5, fontStyle: 'normal' }}>
                    <Typography fontWeight={700} mb={0.5} color="#f5e2c8" fontSize={16}>Liên hệ</Typography>
                    <Box sx={{ color: '#f5e2c8', opacity: 0.9, display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <EmailIcon sx={{ fontSize: 18, mr: 1 }} />
                        <MuiLink href="mailto:julieacademy@gmail.com" sx={footerLink} title="Gửi email">julieacademy@gmail.com</MuiLink>
                    </Box>
                    <Box sx={{ color: '#f5e2c8', opacity: 0.9, display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <PhoneIcon sx={{ fontSize: 18, mr: 1 }} />
                        <MuiLink href="tel:0123456789" sx={footerLink} title="Gọi điện">0123 456 789</MuiLink>
                    </Box>
                </Box>
                <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 0.5 }}>
                    <Typography fontWeight={700} mb={0.5} color="#f5e2c8" fontSize={16}>Kết nối</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton component="a" href="https://www.facebook.com/truongdhbachkhoa" target="_blank" rel="noopener noreferrer" aria-label="Facebook" sx={iconLink}>
                            <FacebookIcon fontSize="medium" />
                        </IconButton>
                        <IconButton component="a" href="https://www.youtube.com/@truongdhbachkhoa" target="_blank" rel="noopener noreferrer" aria-label="YouTube" sx={iconLink}>
                            <YouTubeIcon fontSize="medium" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                borderTop: '1px solid #3282B8',
                py: 1,
                textAlign: 'center',
                fontSize: 13,
                opacity: 0.7,
                background: '#1B262C',
                color: '#FFFFFF',
                mt: 1,
                boxSizing: 'border-box',
            }}>
                © 2025 Smart Practice System
            </Box>
        </footer>
    );
});

export default Footer;