import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import homepage1 from '../assets/homepage1.webp';
import homepage2 from '../assets/homepage2.webp';
import homepage3 from '../assets/homepage3.webp';

const defaultEasing = [0.6, 0.01, -0.05, 0.95];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: defaultEasing } }
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const FEATURES = [
    { Icon: TrendingUpIcon, title: "Cá nhân hóa việc học", desc: "AI phân tích điểm mạnh, điểm yếu, tạo ra lộ trình học tập tối ưu và hiệu quả nhất dành riêng cho bạn." },
    { Icon: MenuBookIcon, title: "Nội dung đáng tin cậy", desc: "Hệ thống kiến thức chuẩn hóa từ nhiều bộ sách giáo khoa, được biên soạn và kiểm duyệt bởi các chuyên gia." },
    { Icon: VolunteerActivismIcon, title: "Công cụ hỗ trợ giáo viên", desc: "Cung cấp công cụ mạnh mẽ giúp giáo viên và gia sư đổi mới phương pháp giảng dạy trong kỷ nguyên số." }
];

const StyledImgBox = React.memo(({ src, alt, isFirst = false }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const wrapperSx = React.useMemo(() => ({
        p: 1.5,
        borderRadius: '32px',
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
        boxShadow: `0 8px 40px -12px ${alpha(isDark ? theme.palette.common.black : theme.palette.grey[500], 0.3)}`,
    }), [theme, isDark]);

    return (
        <Box sx={wrapperSx}>
            <Box
                component="img"
                src={src}
                alt={alt}
                loading={isFirst ? 'eager' : 'lazy'}
                fetchPriority={isFirst ? 'high' : 'auto'}
                decoding="async"
                sx={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: '24px',
                    display: 'block',
                }}
            />
        </Box>
    );
});

const FeatureCard = React.memo(({ item }) => {
    const theme = useTheme();
    const { Icon, title, desc } = item;

    const paperSx = React.useMemo(() => ({
        flex: '1 1 300px',
        textAlign: 'center',
        p: { xs: 3.5, md: 4 },
        maxWidth: 360,
        background: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        border: '1px solid',
        borderColor: theme.palette.divider,
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)'
        }
    }), [theme]);

    const iconWrapperSx = React.useMemo(() => ({
        mb: 2.5,
        background: `linear-gradient(45deg, ${theme.palette.info.light}, ${theme.palette.primary.main})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }), [theme]);

    return (
        <motion.div variants={fadeInUp}>
            <Paper elevation={0} sx={paperSx}>
                <Box sx={iconWrapperSx}>
                    <Icon sx={{ fontSize: 52 }} />
                </Box>
                <Typography component="h3" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.25rem', fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
                    {title}
                </Typography>
                <Typography component="p" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1rem', lineHeight: 1.7, color: 'text.secondary' }}>
                    {desc}
                </Typography>
            </Paper>
        </motion.div>
    );
});

const ContentSection = React.memo(({ imgSrc, imgAlt, title, children, direction = 'row', showButton = false, isFirstImage = false }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const paperSx = React.useMemo(() => ({
        flex: '1 1 540px',
        background: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        p: { xs: 4, md: 5 },
        border: '1px solid',
        borderColor: theme.palette.divider,
    }), [theme]);

    return (
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 6, md: 8 },
                    flexDirection: { xs: 'column', md: direction }
                }}>
                    <Box sx={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                        <StyledImgBox src={imgSrc} alt={imgAlt} isFirst={isFirstImage} />
                    </Box>
                    <Paper elevation={0} sx={paperSx} aria-labelledby={`${imgAlt.replace(/\s+/g, '-').toLowerCase()}-title`}>
                        <Typography component="h2" id={`${imgAlt.replace(/\s+/g, '-').toLowerCase()}-title`} sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.5rem', fontWeight: 700, mb: 2.5, color: 'text.primary' }}>
                            {title}
                        </Typography>
                        <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.0625rem', lineHeight: 1.7, mb: showButton ? 4 : 0, color: 'text.secondary' }}>
                            {children}
                        </Typography>
                        {showButton && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/login')}
                                aria-label="Bắt đầu học ngay với Julie Academy"
                                sx={{ fontFamily: 'Montserrat, Arial, sans-serif', fontSize: { xs: '1rem', md: '1.08rem' }, fontWeight: 700, borderRadius: '10px', padding: '14px 36px', letterSpacing: 1, textTransform: 'none' }}
                            >
                                Bắt đầu học ngay
                            </Button>
                        )}
                    </Paper>
                </Box>
            </Container>
        </motion.section>
    );
});

const HeroSection = React.memo(() => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const h1Sx = React.useMemo(() => ({
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontWeight: 800,
        fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem' },
        letterSpacing: { xs: '2px', md: '4px' },
        textTransform: 'uppercase',
        background: `linear-gradient(45deg, ${theme.palette.info.light} 20%, ${theme.palette.primary.main} 85%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: isDark ? `0 2px 24px ${alpha(theme.palette.primary.dark, 0.3)}` : 'none',
        mb: 1.2,
        lineHeight: 1.13,
    }), [theme, isDark]);

    return (
        <motion.header style={{ width: '100%' }} initial="initial" animate="animate" variants={fadeInUp}>
            <Container maxWidth="lg" sx={{ textAlign: 'center', pt: { xs: 8, md: 10 }, pb: { xs: 4, md: 7 } }}>
                <Typography component="h1" sx={h1Sx}>
                    Julie Academy
                </Typography>
                <Typography component="h2" sx={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 600, fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.35rem' }, color: 'text.secondary', letterSpacing: 1.1, mb: 0.5, lineHeight: 1.4 }}>
                    Nền tảng học tập trực tuyến
                    <span style={{ color: theme.palette.text.primary, fontWeight: 700, marginLeft: 8 }}>
                        Cầu nối giữa gia sư & học sinh
                    </span>
                </Typography>
                <Typography component="p" sx={{ fontFamily: 'Open Sans, Arial, sans-serif', fontWeight: 500, fontSize: { xs: '1rem', sm: '1.08rem', md: '1.13rem' }, color: 'text.secondary', letterSpacing: 0.7, maxWidth: 650, mx: 'auto', mt: 0.5, lineHeight: 1.7 }}>
                    <span style={{ fontWeight: 700, color: theme.palette.text.primary, fontSize: '1.08em' }}>
                        Tất cả mọi học sinh
                    </span> đều xứng đáng có cơ hội được học tập, phát triển và tỏa sáng.
                </Typography>
            </Container>
        </motion.header>
    );
});

function HomePage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const mainBoxSx = React.useMemo(() => ({
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: theme.typography.fontFamily,
        background: isDark
            ? `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(220, 15%, 15%), ${theme.palette.background.default})`
            : `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 40%, 98%), ${theme.palette.background.default})`,
    }), [theme, isDark]);

    return (
        <Box component="main" sx={mainBoxSx}>
            <Helmet>
                <title>Julie Academy - Nền tảng học tập trực tuyến, kết nối gia sư & học sinh</title>
                <meta name="description" content="Julie Academy - Nền tảng học tập trực tuyến ứng dụng AI, kết nối gia sư và học sinh, cá nhân hóa lộ trình học, miễn phí trọn đời, hỗ trợ giáo viên đổi mới phương pháp." />
                <link rel="canonical" href="https://julieacademy.vn/" />
                <meta property="og:title" content="Julie Academy - Nền tảng học tập trực tuyến, kết nối gia sư & học sinh" />
                <meta property="og:description" content="Julie Academy - Nền tảng học tập trực tuyến ứng dụng AI, kết nối gia sư và học sinh, cá nhân hóa lộ trình học, miễn phí trọn đời, hỗ trợ giáo viên đổi mới phương pháp." />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="https://julieacademy.vn/" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <HeroSection />

            <Box sx={{ bgcolor: isDark ? 'transparent' : 'background.paper' }}>
                <ContentSection
                    imgSrc={homepage1}
                    imgAlt="Học sinh vui vẻ sử dụng công nghệ học tập hiện đại trên Smart Practice System"
                    title="Cùng chúng tôi tạo nên sự khác biệt"
                    showButton={true}
                    isFirstImage={true}
                >
                    Nền tảng học tập trực tuyến ứng dụng AI & Khoa học Dữ liệu, giúp chuẩn hóa kiến thức từ nhiều bộ sách, hỗ trợ cập nhật phương pháp giảng dạy mới cho gia sư (đặc biệt là giáo viên đã về hưu), đồng thời nâng cao hiệu quả tự học, tự kiểm tra cho học sinh.
                </ContentSection>
            </Box>

            <motion.section>
                <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 2 }, mb: { xs: 4, md: 4 }, px: { xs: 2, sm: 2 } }}>
                    <Typography component="h2" sx={{ position: 'absolute', left: '-9999px' }}>Tính năng nổi bật</Typography>
                    <Box
                        component={motion.div}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', gap: { xs: 4, md: 4 }, flexWrap: 'wrap' }}
                    >
                        {FEATURES.map((item) => (
                            <FeatureCard key={item.title} item={item} />
                        ))}
                    </Box>
                </Container>
            </motion.section>

            <Box sx={{ bgcolor: isDark ? 'transparent' : 'background.paper' }}>
                <ContentSection
                    imgSrc={homepage2}
                    imgAlt="Kiến Tạo Tri Thức, Dẫn Lối Tương Lai."
                    title="Kiến Tạo Tri Thức, Dẫn Lối Tương Lai."
                    direction="row-reverse"
                >
                    Julie Academy không chỉ là một trang web ôn tập thông thường, mà là người bạn đồng hành thông minh được thiết kế riêng cho hành trình học tập của bạn. Tại đây, bạn sẽ được cá nhân hóa lộ trình học tập, giúp bạn tập trung vào những kiến thức còn yếu và phát huy tối đa điểm mạnh của mình, từ đó học hiệu quả hơn rất nhiều.
                </ContentSection>
            </Box>

            <ContentSection
                imgSrc={homepage3}
                imgAlt="Học sinh và gia sư cùng phát triển trên nền tảng Smart Practice System"
                title="Cùng phát triển, cùng thành công"
            >
                Julie Academy không chỉ là nơi học sinh ôn tập, mà là môi trường để gia sư, giáo viên cập nhật kiến thức, đổi mới phương pháp, cùng nhau phát triển trong kỷ nguyên giáo dục số.
            </ContentSection>
        </Box>
    );
}

export default HomePage;