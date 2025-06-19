import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Container,
    Paper,
    useMediaQuery,
} from '@mui/material';

const COLORS = {
    bg: '#1B262C',
    card: '#0F4C75',
    accent: '#3282B8',
    primary: '#BBE1FA',
    text: '#FFFFFF',
};

function HomePage() {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width:960px)');

    return (
        <Box sx={{
            backgroundColor: COLORS.bg,
            color: COLORS.text,
            flexGrow: 1,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Open Sans, sans-serif',
        }}>
            <Box component="header" sx={{ width: '100%', textAlign: 'center', pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 } }}>
                <Typography
                    component="h1"
                    sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4rem' },
                        textTransform: 'uppercase',
                        letterSpacing: { xs: '2px', md: '4px' },
                        color: COLORS.text,
                        fontWeight: 900,
                        lineHeight: 1.1,
                        px: { xs: 1, sm: 2 },
                        // Thêm hiệu ứng phát sáng nhẹ
                        textShadow: `0 0 15px ${COLORS.text}, 0 0 25px ${COLORS.primary}`,
                    }}
                >
                    Julie Academy
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        color: COLORS.text,
                        fontWeight: 600,
                        mt: { xs: 1, md: 2 },
                        px: { xs: 2, sm: 0 }
                    }}
                >
                    Nền tảng học tập trực tuyến - Cầu nối giữa gia sư và học sinh
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: { xs: '0.9rem', sm: '1.125rem' },
                        color: COLORS.text,
                        fontWeight: 500,
                        mt: { xs: 1, md: 2 },
                        px: { xs: 2, sm: 0 }
                    }}
                >
                    Tất cả mọi học sinh đều xứng đáng có cơ hội được học tập.
                </Typography>
            </Box>

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
                        background: COLORS.accent,
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
                            src="/homepage1.jpg"
                            alt="Học sinh vui vẻ sử dụng công nghệ học tập hiện đại trên Smart Practice System"
                            loading="lazy"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '32px',
                                background: COLORS.card,
                                display: 'block',
                            }}
                        />
                    </Box>
                </Box>
                <Paper
                    elevation={2}
                    sx={{
                        flex: '1 1 400px',
                        background: COLORS.card,
                        borderRadius: '24px',
                        p: { xs: 4, md: 5 },
                        maxWidth: 540,
                        border: `2px solid ${COLORS.accent}`,
                    }}
                    aria-labelledby="intro-title"
                >
                    <Typography component="h2" id="intro-title" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.5rem', fontWeight: 700, mb: 2.5, color: COLORS.text }}>
                        Cùng chúng tôi tạo nên sự khác biệt
                    </Typography>
                    <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.0625rem', lineHeight: 1.7, mb: 4, color: COLORS.text }}>
                        Nền tảng học tập trực tuyến ứng dụng AI & Khoa học Dữ liệu, giúp chuẩn hóa kiến thức từ nhiều bộ sách, hỗ trợ cập nhật phương pháp giảng dạy mới cho gia sư (đặc biệt là giáo viên đã về hưu), đồng thời nâng cao hiệu quả tự học, tự kiểm tra cho học sinh.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: { xs: '1rem', md: '1.0625rem' },
                            fontWeight: 600,
                            borderRadius: '8px',
                            padding: '14px 32px',
                            backgroundColor: COLORS.accent,
                            color: COLORS.text,
                            '&:hover': {
                                backgroundColor: COLORS.primary,
                                color: COLORS.bg,
                            }
                        }}
                        onClick={() => navigate('/login')}
                        aria-label="Bắt đầu học ngay với Julie Academy"
                    >
                        Bắt đầu học ngay
                    </Button>
                </Paper>
            </Container>

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
                {[
                    {
                        img: '/personalized.png',
                        alt: 'Biểu tượng cá nhân hóa việc học',
                        title: 'Việc học được cá nhân hóa',
                        desc: 'Học sinh có thể học theo tốc độ và khả năng của riêng mình, lấp đầy các lỗ hổng kiến thức (nếu có), từ đó tạo đà để tiếp tục tiến bộ.'
                    },
                    {
                        img: '/reliable.png',
                        alt: 'Biểu tượng nội dung đáng tin cậy',
                        title: 'Nội dung đáng tin cậy',
                        desc: 'Thư viện tài nguyên được xây dựng bởi đội ngũ chuyên gia uy tín, bao gồm hệ thống bài giảng và bài tập thực hành các môn toán, khoa học cũng như nhiều bộ môn khác. Đặc biệt là miễn phí trọn đời với tất cả mọi người.'
                    },
                    {
                        img: '/teacher-tool.png',
                        alt: 'Biểu tượng công cụ hỗ trợ giáo viên',
                        title: 'Công cụ hỗ trợ giáo viên',
                        desc: 'Hệ thống giúp giáo viên xác định lỗ hổng kiến thức của học sinh, từ đó điều chỉnh hướng dẫn phù hợp, đáp ứng nhu cầu của mọi học sinh.'
                    }
                ].map((item, idx) => (
                    <Paper
                        key={item.title}
                        elevation={1}
                        sx={{
                            flex: '1 1 300px',
                            textAlign: 'center',
                            p: { xs: 3.5, md: 4.5 },
                            minWidth: 260,
                            maxWidth: 360,
                            background: COLORS.card,
                            borderRadius: '20px',
                            m: 0,
                        }}
                    >
                        <Box
                            component="img"
                            src={item.img}
                            alt={item.alt}
                            loading="lazy"
                            sx={{ width: 72, height: 72, mb: 2.5 }}
                        />
                        <Typography component="h3" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.25rem', fontWeight: 700, mb: 2, color: COLORS.text }}>
                            {item.title}
                        </Typography>
                        <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1rem', lineHeight: 1.7, mb: 0, color: COLORS.text }}>
                            {item.desc}
                        </Typography>
                    </Paper>
                ))}
            </Container>

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
                        background: COLORS.accent,
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
                            src="/homepage2.jpg"
                            alt="Kiến Tạo Tri Thức, Dẫn Lối Tương Lai."
                            loading="lazy"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '32px',
                                background: COLORS.card,
                                display: 'block',
                            }}
                        />
                    </Box>
                </Box>
                <Paper
                    elevation={1}
                    sx={{
                        flex: '1 1 400px',
                        background: COLORS.card,
                        borderRadius: '24px',
                        p: { xs: 4, md: 5 },
                        maxWidth: 540,
                        border: `2px solid ${COLORS.accent}`,
                    }}
                >
                    <Typography component="h2" id="why-title" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.5rem', fontWeight: 700, mb: 3.5, color: COLORS.text }}>
                        Kiến Tạo Tri Thức, Dẫn Lối Tương Lai.
                    </Typography>
                    <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.0625rem', lineHeight: 1.7, mb: 0, color: COLORS.text }}>
                        Julie Academy không chỉ là một trang web ôn tập thông thường, mà là người bạn đồng hành thông minh được thiết kế riêng cho hành trình học tập của bạn. Tại đây, bạn sẽ được cá nhân hóa lộ trình học tập, giúp bạn tập trung vào những kiến thức còn yếu và phát huy tối đa điểm mạnh của mình, từ đó học hiệu quả hơn rất nhiều.
                    </Typography>
                </Paper>
            </Container>

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
                        background: COLORS.accent,
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
                            src="/homepage3.jpg"
                            alt="Học sinh và gia sư cùng phát triển trên nền tảng Smart Practice System"
                            loading="lazy"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '32px',
                                background: COLORS.card,
                                display: 'block',
                            }}
                        />
                    </Box>
                </Box>
                <Paper
                    elevation={1}
                    sx={{
                        flex: '1 1 400px',
                        background: COLORS.card,
                        borderRadius: '24px',
                        p: { xs: 4, md: 5 },
                        maxWidth: 540,
                        border: `2px solid ${COLORS.accent}`,
                    }}
                >
                    <Typography component="h2" id="grow-title" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.5rem', fontWeight: 700, mb: 3.5, color: COLORS.text }}>
                        Cùng phát triển, cùng thành công
                    </Typography>
                    <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.0625rem', lineHeight: 1.7, mb: 0, color: COLORS.text }}>
                        Julie Academy không chỉ là nơi học sinh ôn tập, mà còn là môi trường để gia sư, giáo viên cập nhật kiến thức, đổi mới phương pháp, cùng nhau phát triển trong kỷ nguyên giáo dục số.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}

export default HomePage;