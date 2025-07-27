import React from 'react';
import { 
    Modal, 
    Box, 
    Paper, 
    Typography, 
    IconButton, 
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const questionTypes = [
    {
      id: "MULTIPLE_CHOICE_SINGLE",
      icon: "🔘",
      title: "Chọn một đáp án",
      desc: "Câu hỏi trắc nghiệm cổ điển với chỉ một lựa chọn đúng duy nhất.",
    },
    {
      id: "MULTIPLE_CHOICE_MULTI",
      icon: "✅",
      title: "Chọn nhiều đáp án",
      desc: "Cho phép người học chọn một hoặc nhiều phương án đúng.",
    },
    {
      id: "FILL_IN_BLANK",
      icon: "✍️",
      title: "Điền vào chỗ trống",
      desc: "Học sinh phải tự điền câu trả lời vào ô trống.",
    },
    {
      id: "ORDERING",
      icon: "📊",
      title: "Sắp xếp thứ tự",
      desc: "Yêu cầu người học sắp xếp các mục theo một trình tự đúng.",
    },
];

export default function QuizPopup({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleOptionClick = (type) => {
    navigate(`/create-quiz/new?type=${type}`);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="create-quiz-title"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper 
        elevation={5} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          width: '90%', 
          maxWidth: '600px',
          borderRadius: 4, 
          position: 'relative',
          outline: 'none',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography id="create-quiz-title" variant="h5" component="h2" gutterBottom>
            Tạo nội dung mới
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lựa chọn của bạn sẽ quyết định cách học sinh tương tác.
          </Typography>
        </Box>

        <List sx={{ width: '100%' }}>
          {questionTypes.map((opt, index) => (
            <React.Fragment key={opt.id}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleOptionClick(opt.id)}
                  sx={{ borderRadius: 2, p: 2 }}
                >
                  <ListItemIcon sx={{ fontSize: 28, minWidth: 50, color: 'primary.main' }}>
                    {opt.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={opt.title}
                    secondary={opt.desc}
                    primaryTypographyProps={{ fontWeight: '600', variant: 'body1' }}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItemButton>
              </ListItem>
              {index < questionTypes.length - 1 && <Divider component="li" variant="inset" />}
            </React.Fragment>
          ))}
        </List>
        
      </Paper>
    </Modal>
  );
}