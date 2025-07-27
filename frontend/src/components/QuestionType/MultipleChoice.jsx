import React from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    RadioGroup,
    Radio,
    Checkbox,
    Button
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// --- Component để soạn thảo đáp án trắc nghiệm ---
export default function MultipleChoiceEditor({ questionType, answerData, setAnswerData }) {
    // Hàm cập nhật nội dung của một đáp án
    const handleAnswerContentChange = (index, value) => {
        const newAnswers = [...answerData];
        newAnswers[index].content = value;
        setAnswerData(newAnswers);
    };

    // Hàm xử lý khi chọn đáp án đúng
    const handleCorrectChange = (index) => {
        const newAnswers = [...answerData];
        if (questionType === 'MULTIPLE_CHOICE_SINGLE') {
            // Chỉ cho phép một đáp án đúng
            newAnswers.forEach((answer, i) => {
                answer.isCorrect = (i === index);
            });
        } else {
            // Cho phép nhiều đáp án đúng
            newAnswers[index].isCorrect = !newAnswers[index].isCorrect;
        }
        setAnswerData(newAnswers);
    };
    
    // Hàm thêm một lựa chọn mới
    const addAnswerOption = () => {
        setAnswerData([...answerData, { content: '', isCorrect: false }]);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Đáp án</Typography>
            <RadioGroup>
                {answerData.map((answer, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {questionType === 'MULTIPLE_CHOICE_SINGLE' ? (
                            <Radio 
                                checked={answer.isCorrect} 
                                onChange={() => handleCorrectChange(index)}
                            />
                        ) : (
                            <Checkbox 
                                checked={answer.isCorrect} 
                                onChange={() => handleCorrectChange(index)}
                            />
                        )}
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={`Lựa chọn ${index + 1}`}
                            value={answer.content}
                            onChange={(e) => handleAnswerContentChange(index, e.target.value)}
                            required
                        />
                    </Box>
                ))}
            </RadioGroup>
             <Button startIcon={<AddCircleOutlineIcon />} onClick={addAnswerOption}>
                Thêm lựa chọn
            </Button>
        </Box>
    );
}