import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// --- MUI Imports ---
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useTheme, alpha, styled } from "@mui/material/styles";

// --- Icon Imports ---
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import homepage1 from "../assets/images/homepage1.webp";
import homepage2 from "../assets/images/homepage2.webp";
import homepage3 from "../assets/images/homepage3.webp";
// =================================================================
// --- CONFIGURATIONS ---
// =================================================================

const MOTION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] // Tối ưu easing để giảm tải CPU
      },
    },
  },
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1 } }, // Giảm stagger để nhanh hơn
  },
};

const FEATURES = [
  {
    Icon: TrendingUpIcon,
    title: "Cá nhân hóa việc học",
    desc: "AI phân tích điểm mạnh, điểm yếu, tạo ra lộ trình học tập tối ưu và hiệu quả nhất dành riêng cho bạn.",
  },
  {
    Icon: MenuBookIcon,
    title: "Nội dung đáng tin cậy",
    desc: "Hệ thống kiến thức chuẩn hóa từ nhiều bộ sách giáo khoa, được biên soạn và kiểm duyệt bởi các chuyên gia.",
  },
  {
    Icon: VolunteerActivismIcon,
    title: "Công cụ hỗ trợ giáo viên",
    desc: "Cung cấp công cụ mạnh mẽ giúp giáo viên và gia sư đổi mới phương pháp giảng dạy trong kỷ nguyên số.",
  },
];

const PAGE_SECTIONS = [
  {
    type: "content",
    imgSrc: homepage1,
    imgAlt: "Học sinh sử dụng công nghệ học tập hiện đại",
    title: "Cùng chúng tôi tạo nên sự khác biệt",
    content:
      "Nền tảng học tập trực tuyến ứng dụng AI & Khoa học Dữ liệu, giúp chuẩn hóa kiến thức từ nhiều bộ sách, hỗ trợ gia sư cập nhật phương pháp giảng dạy mới, đồng thời nâng cao hiệu quả tự học và tự kiểm tra cho học sinh.",
    showButton: true,
    direction: "row",
  },
  { type: "features" },
  {
    type: "content",
    imgSrc: homepage2,
    imgAlt: "Kiến Tạo Tri Thức",
    title: "Kiến Tạo Tri Thức, Dẫn Lối Tương Lai.",
    content:
      "Julie Academy không chỉ là một trang web ôn tập thông thường mà là người bạn đồng hành thông minh cho hành trình học tập của bạn. Bạn sẽ được cá nhân hóa lộ trình học tập để tập trung vào điểm yếu và phát huy điểm mạnh, từ đó học hiệu quả hơn.",
    direction: "row-reverse",
  },
  {
    type: "content",
    imgSrc: homepage3,
    imgAlt: "Học sinh và gia sư cùng phát triển",
    title: "Cùng phát triển, cùng thành công",
    content:
      "Julie Academy là môi trường để gia sư, giáo viên cập nhật kiến thức, đổi mới phương pháp và cùng nhau phát triển trong kỷ nguyên giáo dục số.",
    direction: "row",
  },
];

// =================================================================
// --- STYLED COMPONENTS ---
// =================================================================

const StyledSectionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingBlock: theme.spacing(6), // Giảm padding
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    paddingBlock: theme.spacing(4),
  },
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  borderRadius: "16px", // Giảm độ cong
  padding: theme.spacing(3), // Giảm padding
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper, // Bỏ alpha để tăng tốc render
  boxShadow: "none",
  transition: "transform 0.2s ease-in-out", // Rút ngắn thời gian animation
  "&:hover": {
    transform: "translateY(-5px)", // Giảm hiệu ứng
    boxShadow: `0 6px 12px -3px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));

const GradientText = styled("span")(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
}));

const StyledImageBox = ({ src, alt, isFirst = false }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: "24px",
        background: `linear-gradient(45deg, ${alpha(
          theme.palette.primary.main,
          0.1
        )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={isFirst ? "eager" : "lazy"}
        decoding="async"
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          objectFit: "cover",
          borderRadius: "16px",
          display: "block",
          maxWidth: "500px", // Giới hạn kích thước tối đa
        }}
      />
    </Box>
  );
};

// =================================================================
// --- PAGE SECTIONS AS COMPONENTS ---
// =================================================================

const HeroSection = () => {
  const theme = useTheme();
  return (
    <StyledSectionWrapper>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <motion.div
          variants={MOTION_VARIANTS.staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={MOTION_VARIANTS.fadeInUp}>
            <Typography
              component="h1"
              variant="h2" // Giảm kích thước
              fontWeight={700}
              sx={{ textWrap: "balance" }}
            >
              <GradientText>Julie Academy</GradientText>
            </Typography>
          </motion.div>
          <motion.div variants={MOTION_VARIANTS.fadeInUp}>
            <Typography
              component="h2"
              variant="h5" // Giảm kích thước
              color="text.primary"
              mt={1.5}
              mb={2}
              fontWeight={600}
            >
              Nền tảng học tập trực tuyến
              <Box
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  display: "block",
                  mt: 0.5,
                }}
              >
                Cầu nối giữa Gia sư & Học sinh
              </Box>
            </Typography>
          </motion.div>
          <motion.div variants={MOTION_VARIANTS.fadeInUp}>
            <Typography
              component="p"
              variant="body1" // Sử dụng body1 thay vì h6
              color="text.secondary"
              sx={{
                maxWidth: 680,
                mx: "auto",
                lineHeight: 1.6, // Giảm line-height
              }}
            >
              Tất cả mọi học sinh đều xứng đáng có cơ hội được học tập, phát
              triển và tỏa sáng.
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </StyledSectionWrapper>
  );
};

const FeatureSection = () => (
  <Container maxWidth="lg">
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 3, // Giảm gap
      }}
    >
      {FEATURES.map(({ Icon, title, desc }) => (
        <StyledCard
          key={title}
          sx={{ textAlign: "center" }}
        >
          <GradientText sx={{ mb: 2 }}>
            <Icon sx={{ fontSize: 40 }} /> {/* Giảm kích thước icon */}
          </GradientText>
          <Typography variant="h6" component="h3" fontWeight={700} mb={1}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
            {desc}
          </Typography>
        </StyledCard>
      ))}
    </Box>
  </Container>
);

const ContentSection = ({
  isFirstImage,
  imgSrc,
  imgAlt,
  title,
  content,
  showButton,
  direction,
}) => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 6 }, // Giảm gap
          flexDirection: { xs: "column", md: direction },
        }}
      >
        <Box
          sx={{
            flex: "1 1 400px",
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <StyledImageBox src={imgSrc} alt={imgAlt} isFirst={isFirstImage} />
        </Box>
        <StyledCard
          sx={{ flex: "1 1 500px" }} // Giảm kích thước linh hoạt
        >
          <Typography
            component="h2"
            variant="h4" // Giảm kích thước
            fontWeight={700}
            mb={2}
          >
            {title}
          </Typography>
          <Typography
            component="div"
            variant="body1"
            sx={{
              flexGrow: 1,
              lineHeight: 1.6, // Giảm line-height
              color: "text.secondary",
            }}
          >
            {content}
          </Typography>
          {showButton && (
            <Button
              variant="contained"
              color="primary"
              size="medium" // Giảm kích thước
              onClick={() => navigate("/login")}
              sx={{ mt: 3, alignSelf: "flex-start" }}
            >
              Bắt đầu học ngay
            </Button>
          )}
        </StyledCard>
      </Box>
    </Container>
  );
};

// =================================================================
// --- MAIN PAGE COMPONENT ---
// =================================================================

function HomePage() {
  const theme = useTheme();
  
  // Sử dụng Intersection Observer để lazy load các section không trong viewport
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-animate').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, background: theme.palette.background.default }}
    >
      <Helmet>
        <title>
          Julie Academy - Nền tảng học tập trực tuyến, kết nối gia sư & học sinh
        </title>
        <meta
          name="description"
          content="Julie Academy - Nền tảng học tập AI kết nối gia sư và học sinh, cá nhân hóa lộ trình học, miễn phí trọn đời."
        />
        <link rel="canonical" href="https://julieacademy.vn/" />
      </Helmet>

      <HeroSection />

      {PAGE_SECTIONS.map((section, index) => {
        const key = `${section.type}-${index}`;
        const bgColor = alpha(
          index % 2 === 0
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
          0.03
        );

        return (
          <motion.div
            key={key}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }} 
            variants={MOTION_VARIANTS.fadeInUp}
            className="section-animate" 
            style={{ 
              opacity: 0, 
              transition: 'opacity 0.3s ease-in-out' 
            }}
          >
            <StyledSectionWrapper sx={{ background: bgColor }}>
              {section.type === "features" ? (
                <FeatureSection />
              ) : (
                <ContentSection {...section} isFirstImage={index === 0} />
              )}
            </StyledSectionWrapper>
          </motion.div>
        );
      })}
    </Box>
  );
}

export default HomePage;