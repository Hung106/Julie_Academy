import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Helmet } from 'react-helmet-async';
import { FEATURES } from '../constants/index';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

function HomePage() {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width:960px)');
    const theme = useTheme();

    return (
        <Box sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            flexGrow: 1,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Open Sans, sans-serif',
        }}>
            <Helmet>
                <title>Julie Academy - Nền tảng học tập trực tuyến, kết nối gia sư & học sinh</title>
                <meta name="description" content="Julie Academy - Nền tảng học tập trực tuyến ứng dụng AI, kết nối gia sư và học sinh, cá nhân hóa lộ trình học, miễn phí trọn đời, hỗ trợ giáo viên đổi mới phương pháp." />
                <link rel="canonical" href="https://julieacademy.vn/" />
                {/* Open Graph & Twitter meta for social sharing */}
                <meta property="og:title" content="Julie Academy - Nền tảng học tập trực tuyến, kết nối gia sư & học sinh" />
                <meta property="og:description" content="Julie Academy - Nền tảng học tập trực tuyến ứng dụng AI, kết nối gia sư và học sinh, cá nhân hóa lộ trình học, miễn phí trọn đời, hỗ trợ giáo viên đổi mới phương pháp." />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="https://julieacademy.vn/" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            {/* Header */}
            <Box component="header" sx={{
                width: '100%',
                textAlign: 'center',
                pt: { xs: 8, md: 10 },
                pb: { xs: 4, md: 7 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}>
                <Typography
                    component="h1"
                    sx={{
                        fontFamily: 'Montserrat, Arial, sans-serif',
                        fontWeight: 800,
                        fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem' },
                        letterSpacing: { xs: '2px', md: '4px' },
                        textTransform: 'uppercase',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, #A6B0CF 0%, #F5F3F5 100%)'
                            : 'linear-gradient(90deg, #274690 0%, #3F599C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: theme.palette.mode === 'dark'
                            ? '0 2px 12px #1B264F66'
                            : '0 2px 12px #A6B0CF66',
                        mb: 1.2,
                        lineHeight: 1.13,
                        transition: 'all 0.3s',
                        display: 'inline-block',
                        filter: 'none',
                    }}
                >
                    Julie Academy
                </Typography>
                <Typography
                    component="h2"
                    sx={{
                        fontFamily: 'Montserrat, Arial, sans-serif',
                        fontWeight: 600,
                        fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.35rem' },
                        color: theme.palette.mode === 'dark' ? '#A6B0CF' : '#274690',
                        letterSpacing: 1.1,
                        mb: 0.5,
                        lineHeight: 1.4,
                    }}
                >
                    Nền tảng học tập trực tuyến
                    <span style={{ color: theme.palette.mode === 'dark' ? '#F5F3F5' : '#3F599C', fontWeight: 700, marginLeft: 8 }}>
                        Cầu nối giữa gia sư & học sinh
                    </span>
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        fontFamily: 'Open Sans, Arial, sans-serif',
                        fontWeight: 500,
                        fontSize: { xs: '1rem', sm: '1.08rem', md: '1.13rem' },
                        color: theme.palette.mode === 'dark' ? '#A6B0CF' : '#576CA8',
                        letterSpacing: 0.7,
                        maxWidth: 650,
                        mx: 'auto',
                        mt: 0.5,
                        lineHeight: 1.7,
                        textShadow: theme.palette.mode === 'dark' ? '0 1px 8px #1B264F33' : '0 1px 8px #A6B0CF33',
                    }}
                >
                    <span style={{ fontWeight: 700, color: theme.palette.mode === 'dark' ? '#F5F3F5' : '#1B264F', fontSize: '1.08em' }}>
                        Tất cả mọi học sinh
                    </span> đều xứng đáng có cơ hội được học tập, phát triển và tỏa sáng.
                </Typography>
            </Box>

            {/* Section 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
                <Container maxWidth="lg" sx={{
                    pt: { xs: 8, md: 10 },
                    pb: { xs: 4, md: 6 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 6, md: 8 },
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    flexWrap: 'wrap',
                }}>
                    <Box sx={{ flex: '1 1 340px', display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                            background: theme.palette.primary.main,
                            borderRadius: '32px',
                            boxShadow: '0 4px 20px rgba(50,130,184,0.15)',
                            p: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 320,
                            minHeight: 320,
                            maxWidth: 400,
                            maxHeight: 320,
                            overflow: 'hidden',
                        }}>
                            <Box
                                component="img"
                                src="/homepage1.webp"
                                alt="Học sinh vui vẻ sử dụng công nghệ học tập hiện đại trên Smart Practice System"
                                loading="lazy"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '32px',
                                    background: theme.palette.secondary.main,
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Box>
                    <Paper
                        elevation={2}
                        sx={{
                            flex: '1 1 400px',
                            background: theme.palette.background.paper,
                            borderRadius: '24px',
                            p: { xs: 4, md: 5 },
                            maxWidth: 540,
                            border: `2px solid ${theme.palette.primary.main}`,
                        }}
                        aria-labelledby="intro-title"
                    >
                        <Typography component="h2" id="intro-title" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.5rem', fontWeight: 700, mb: 2.5, color: theme.palette.text.primary }}>
                            Cùng chúng tôi tạo nên sự khác biệt
                        </Typography>
                        <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.0625rem', lineHeight: 1.7, mb: 4, color: theme.palette.text.primary }}>
                            Nền tảng học tập trực tuyến ứng dụng AI & Khoa học Dữ liệu, giúp chuẩn hóa kiến thức từ nhiều bộ sách, hỗ trợ cập nhật phương pháp giảng dạy mới cho gia sư (đặc biệt là giáo viên đã về hưu), đồng thời nâng cao hiệu quả tự học, tự kiểm tra cho học sinh.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                fontFamily: 'Montserrat, Arial, sans-serif',
                                fontSize: { xs: '1rem', md: '1.08rem' },
                                fontWeight: 700,
                                borderRadius: '10px',
                                padding: '14px 36px',
                                letterSpacing: 1,
                                textTransform: 'none',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 12px rgba(87,108,168,0.10)',
                                mt: 2,
                                mb: 1,
                            }}
                            onClick={() => navigate('/login')}
                            aria-label="Bắt đầu học ngay với Julie Academy"
                        >
                            Bắt đầu học ngay
                        </Button>
                    </Paper>
                </Container>
            </motion.div>

            {/* Features Section */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
                <Container maxWidth="lg" sx={{
                    mt: { xs: 7, md: 8 },
                    mb: { xs: 8, md: 10 },
                    px: { xs: 2, sm: 2 },
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: { xs: 4, md: 5 },
                    flexWrap: 'wrap',
                }} aria-labelledby="features-title">
                    <Typography component="h2" id="features-title" sx={{
                        position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden'
                    }}>Tính năng nổi bật</Typography>
                    {FEATURES.map((item, idx) => (
                        <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
                            <Paper
                                elevation={1}
                                sx={{
                                    flex: '1 1 300px',
                                    textAlign: 'center',
                                    p: { xs: 3.5, md: 4.5 },
                                    minWidth: 260,
                                    maxWidth: 360,
                                    background: theme.palette.background.paper,
                                    borderRadius: '20px',
                                    m: 0,
                                }}
                            >
                                <Box sx={{ width: 72, height: 72, mb: 2.5, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {idx === 0 && <TrendingUpIcon sx={{ fontSize: 56, color: theme.palette.primary.main }} titleAccess="Việc học được cá nhân hóa" />}
                                    {idx === 1 && <MenuBookIcon sx={{ fontSize: 56, color: theme.palette.primary.main }} titleAccess="Nội dung đáng tin cậy" />}
                                    {idx === 2 && <VolunteerActivismIcon sx={{ fontSize: 56, color: theme.palette.primary.main }} titleAccess="Công cụ hỗ trợ giáo viên" />}
                                </Box>
                                <Typography component="h3" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.25rem', fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
                                    {item.title}
                                </Typography>
                                <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1rem', lineHeight: 1.7, mb: 0, color: theme.palette.text.primary }}>
                                    {item.desc}
                                </Typography>
                            </Paper>
                        </motion.div>
                    ))}
                </Container>
            </motion.div>

            {/* Section 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
                <Container maxWidth="lg" sx={{
                    pt: { xs: 8, md: 10 },
                    pb: { xs: 4, md: 6 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 6, md: 8 },
                    flexDirection: isSmallScreen ? 'column' : 'row-reverse',
                    flexWrap: 'wrap',
                }} aria-labelledby="why-title">
                    <Box sx={{ flex: '1 1 340px', display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                            background: theme.palette.primary.main,
                            borderRadius: '32px',
                            boxShadow: '0 4px 20px rgba(50,130,184,0.15)',
                            p: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 320,
                            minHeight: 320,
                            maxWidth: 400,
                            maxHeight: 320,
                            overflow: 'hidden',
                        }}>
                            <Box
                                component="img"
                                src="/homepage2.webp"
                                alt="Kiến Tạo Tri Thức, Dẫn Lối Tương Lai."
                                loading="lazy"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '32px',
                                    background: theme.palette.secondary.main,
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Box>
                    <Paper
                        elevation={1}
                        sx={{
                            flex: '1 1 400px',
                            background: theme.palette.background.paper,
                            borderRadius: '24px',
                            p: { xs: 4, md: 5 },
                            maxWidth: 540,
                            border: `2px solid ${theme.palette.primary.main}`,
                        }}
                    >
                        <Typography component="h2" id="why-title" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.5rem', fontWeight: 700, mb: 3.5, color: theme.palette.text.primary }}>
                            Kiến Tạo Tri Thức, Dẫn Lối Tương Lai.
                        </Typography>
                        <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.0625rem', lineHeight: 1.7, mb: 0, color: theme.palette.text.primary }}>
                            Julie Academy không chỉ là một trang web ôn tập thông thường, mà là người bạn đồng hành thông minh được thiết kế riêng cho hành trình học tập của bạn. Tại đây, bạn sẽ được cá nhân hóa lộ trình học tập, giúp bạn tập trung vào những kiến thức còn yếu và phát huy tối đa điểm mạnh của mình, từ đó học hiệu quả hơn rất nhiều.
                        </Typography>
                    </Paper>
                </Container>
            </motion.div>

            {/* Section 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
                <Container maxWidth="lg" sx={{
                    pt: { xs: 8, md: 10 },
                    pb: { xs: 4, md: 6 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 6, md: 8 },
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    flexWrap: 'wrap',
                }} aria-labelledby="grow-title">
                    <Box sx={{ flex: '1 1 340px', display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                            background: theme.palette.primary.main,
                            borderRadius: '32px',
                            boxShadow: '0 4px 20px rgba(50,130,184,0.15)',
                            p: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 320,
                            minHeight: 320,
                            maxWidth: 400,
                            maxHeight: 320,
                            overflow: 'hidden',
                        }}>
                            <Box
                                component="img"
                                src="/homepage3.webp"
                                alt="Học sinh và gia sư cùng phát triển trên nền tảng Smart Practice System"
                                loading="lazy"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '32px',
                                    background: theme.palette.secondary.main,
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Box>
                    <Paper
                        elevation={1}
                        sx={{
                            flex: '1 1 400px',
                            background: theme.palette.background.paper,
                            borderRadius: '24px',
                            p: { xs: 4, md: 5 },
                            maxWidth: 540,
                            border: `2px solid ${theme.palette.primary.main}`,
                        }}
                    >
                        <Typography component="h2" id="grow-title" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.5rem', fontWeight: 700, mb: 3.5, color: theme.palette.text.primary }}>
                            Cùng phát triển, cùng thành công
                        </Typography>
                        <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.0625rem', lineHeight: 1.7, mb: 0, color: theme.palette.text.primary }}>
                            Julie Academy không chỉ là nơi học sinh ôn tập, mà còn là môi trường để gia sư, giáo viên cập nhật kiến thức, đổi mới phương pháp, cùng nhau phát triển trong kỷ nguyên giáo dục số.
                        </Typography>
                    </Paper>
                </Container>
            </motion.div>
        </Box>
    );
}

export default HomePage;