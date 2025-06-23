// src/constants/index.js

export const COLORS = {
  bg: '#1B264F',      // background
  card: '#274690',    // card, highlight
  accent: '#576CA8',  // accent, button, border
  secondary: '#A6B0CF', // secondary, icon
  light: '#F5F3F5',   // light background
  text: '#FFFFFF',    // text on dark
  textDark: '#222222' // text on light
};

export const FEATURES = [
  {
    img: '/assets/personalized.png',
    alt: 'Biểu tượng cá nhân hóa việc học',
    title: 'Việc học được cá nhân hóa',
    desc: 'Học sinh có thể học theo tốc độ và khả năng của riêng mình, lấp đầy các lỗ hổng kiến thức (nếu có), từ đó tạo đà để tiếp tục tiến bộ.'
  },
  {
    img: '/assets/reliable.png',
    alt: 'Biểu tượng nội dung đáng tin cậy',
    title: 'Nội dung đáng tin cậy',
    desc: 'Thư viện tài nguyên được xây dựng bởi đội ngũ chuyên gia uy tín, bao gồm hệ thống bài giảng và bài tập thực hành các môn toán, khoa học cũng như nhiều bộ môn khác. Đặc biệt là miễn phí trọn đời với tất cả mọi người.'
  },
  {
    img: '/assets/teacher-tool.png',
    alt: 'Biểu tượng công cụ hỗ trợ giáo viên',
    title: 'Công cụ hỗ trợ giáo viên',
    desc: 'Hệ thống giúp giáo viên xác định lỗ hổng kiến thức của học sinh, từ đó điều chỉnh hướng dẫn phù hợp, đáp ứng nhu cầu của mọi học sinh.'
  }
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
};

export const SEO = {
  title: 'Julie Academy - Nền tảng học tập trực tuyến, kết nối gia sư & học sinh',
  description: 'Julie Academy - Nền tảng học tập trực tuyến ứng dụng AI, kết nối gia sư và học sinh, cá nhân hóa lộ trình học, miễn phí trọn đời, hỗ trợ giáo viên đổi mới phương pháp.',
  canonical: 'https://julieacademy.vn/'
};
