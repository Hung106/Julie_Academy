import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { createQuestion } from "../../services/question";
import MultipleChoiceEditor from "../../components/QuestionType/MultipleChoice";
import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Chip,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import NotesIcon from "@mui/icons-material/Notes";

// --- HỆ THỐNG THEME CHUYÊN NGHIỆP ---
const darkPalette = {
  primary: "#A78BFA",
  secondary: "#2DD4BF",
  warning: "#FBBF24",
  background: "#0F172A",
  paper: "#1E293B",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
};

const typographyConfig = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h4: { fontSize: "1.5rem", fontWeight: 700 },
  h6: { fontSize: "1.1rem", fontWeight: 600 },
  button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.5px" },
};

const createAppTheme = () => {
  const paletteConfig = {
    mode: "dark",
    primary: {
      main: darkPalette.primary,
      contrastText: darkPalette.background,
    },
    secondary: {
      main: darkPalette.secondary,
      contrastText: darkPalette.background,
    },
    background: {
      default: darkPalette.background,
      paper: darkPalette.paper,
    },
    text: {
      primary: darkPalette.textPrimary,
      secondary: darkPalette.textSecondary,
    },
    divider: alpha(darkPalette.textSecondary, 0.2),
  };

  return createTheme({
    palette: paletteConfig,
    typography: typographyConfig,
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 8, padding: "8px 20px" },
          containedPrimary: {
            "&:hover": {
              backgroundColor: alpha(paletteConfig.primary.main, 0.9),
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
    },
  });
};

const professionalTheme = createAppTheme();

// --- Component chính để tạo câu hỏi ---
export default function CreateNewQuiz() {
  // --- Hooks ---
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();

  // --- State cho các trường ---
  const [questionType, setQuestionType] = useState("MULTIPLE_CHOICE_SINGLE");
  const [content, setContent] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("MEDIUM");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [currentSubject, setCurrentSubject] = useState("Toán học");
  const [answerData, setAnswerData] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // State riêng cho Autocomplete input để xử lý freeSolo
  const [inputValue, setInputValue] = useState("");

  // --- useEffect để khởi tạo state cho phần đáp án khi `type` thay đổi ---
  useEffect(() => {
    if (
      questionType === "MULTIPLE_CHOICE_SINGLE" ||
      questionType === "MULTIPLE_CHOICE_MULTI"
    ) {
      setAnswerData([
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
      ]);
    } else {
      setAnswerData([]);
    }
  }, [questionType]);

  // --- Hàm xử lý thêm skill mới ---
  const addNewSkill = (skillName) => {
    if (!skillName.trim()) return;
    
    const newSkill = {
      skillName: skillName.trim(),
      subject: currentSubject
    };
    
    // Kiểm tra xem skill đã tồn tại chưa
    const exists = selectedSkills.some(skill => 
      skill.skillName === newSkill.skillName && 
      skill.subject === newSkill.subject
    );
    
    if (!exists) {
      const updatedSkills = [...selectedSkills, newSkill];
      console.log("Thêm skill mới:", newSkill);
      console.log("Danh sách skills sau khi thêm:", updatedSkills);
      setSelectedSkills(updatedSkills);
    }
    
    setInputValue(""); // Clear input
  };

  // --- Hàm xử lý xóa skill ---
  const removeSkill = (indexToRemove) => {
    const updatedSkills = selectedSkills.filter((_, index) => index !== indexToRemove);
    console.log("Xóa skill tại index:", indexToRemove);
    console.log("Danh sách skills sau khi xóa:", updatedSkills);
    setSelectedSkills(updatedSkills);
  };

  // --- Hàm xử lý khi nhấn Enter ---
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      addNewSkill(inputValue);
    }
  };

  const handleSubmit = async () => {
    console.log("State `selectedSkills` ngay trước khi gửi:", selectedSkills);
    
    if (!initialized || !keycloak.token) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này.");
      return;
    }

    const payload = {
      content,
      difficulty,
      explanation,
      type: questionType,
      answers: answerData.filter((a) => a.content.trim() !== ""),
      skills: selectedSkills,
    };

    if (!payload.content.trim()) {
      alert("Vui lòng nhập nội dung câu hỏi.");
      return;
    }

    try {
      await createQuestion(payload, keycloak.token);
      alert("Tạo câu hỏi thành công!");
      navigate("/create-quiz/created");
    } catch (error) {
      console.error("Lỗi khi tạo câu hỏi:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <ThemeProvider theme={professionalTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "8px 16px",
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <FormControl size="small" sx={{ m: 1, minWidth: 220 }}>
            <Select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <MenuItem value="MULTIPLE_CHOICE_SINGLE">
                Nhiều lựa chọn - 1 đáp án
              </MenuItem>
              <MenuItem value="MULTIPLE_CHOICE_MULTI">
                Nhiều lựa chọn - nhiều đáp án
              </MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 1 }} />

          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              startAdornment={
                <StarBorderOutlinedIcon
                  sx={{ mr: 1, color: "text.secondary" }}
                />
              }
            >
              <MenuItem value="EASY">Dễ</MenuItem>
              <MenuItem value="MEDIUM">Trung bình</MenuItem>
              <MenuItem value="HARD">Khó</MenuItem>
            </Select>
          </FormControl>

          <Button
            size="small"
            startIcon={<TimerOutlinedIcon />}
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            30 giây
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            sx={{ ml: 2 }}
            onClick={handleSubmit}
          >
            Lưu câu hỏi
          </Button>
        </Box>

        {/* Main Content */}
        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* Left Column - Editor */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: 4,
              bgcolor: "background.default",
            }}
          >
            <TextField
              variant="standard"
              placeholder="Nhập câu hỏi vào đây..."
              multiline
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: "2.5rem",
                  textAlign: "center",
                  color: professionalTheme.palette.text.primary,
                  fontWeight: 700,
                },
              }}
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <MultipleChoiceEditor
              questionType={questionType}
              answerData={answerData}
              setAnswerData={setAnswerData}
            />
          </Box>

          {/* Right Sidebar */}
          <Box
            sx={{
              width: 300,
              bgcolor: "background.paper",
              p: 2,
              borderLeft: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Typography variant="h6">Tùy chọn</Typography>

            <TextField
              fullWidth
              variant="outlined"
              label="Môn học"
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
            />

            {/* Skills Input với cách tiếp cận mới */}
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                label="Gắn thẻ kỹ năng"
                placeholder="Nhập kỹ năng và nhấn Enter..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  // Tự động thêm khi mất focus
                  if (inputValue.trim()) {
                    addNewSkill(inputValue);
                  }
                }}
              />
              
              {/* Hiển thị các skill đã chọn */}
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selectedSkills.map((skill, index) => (
                  <Chip
                    key={`skill-${index}-${skill.skillName}`}
                    label={`${skill.skillName} (${skill.subject})`}
                    variant="outlined"
                    onDelete={() => removeSkill(index)}
                    size="small"
                  />
                ))}
              </Box>
              
              {/* Hiển thị số lượng skills */}
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Đã chọn: {selectedSkills.length} kỹ năng
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Button
              fullWidth
              startIcon={<NotesIcon />}
              onClick={() => setShowExplanation(!showExplanation)}
              sx={{ justifyContent: "flex-start", color: "text.secondary" }}
            >
              {showExplanation ? "Ẩn giải thích" : "Thêm giải thích"}
            </Button>
            
            {showExplanation && (
              <TextField
                fullWidth
                label="Giải thích đáp án"
                variant="outlined"
                multiline
                rows={5}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}