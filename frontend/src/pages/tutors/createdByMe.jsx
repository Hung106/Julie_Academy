import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { getQuestions, deleteQuestion } from '../../services/question';

import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CreatedByMe() {
    const navigate = useNavigate();
    const { keycloak, initialized } = useKeycloak();

    // State để lưu danh sách câu hỏi, trạng thái loading và lỗi
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State cho hộp thoại xác nhận xóa
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);

    // useEffect để gọi API khi component được mount và người dùng đã xác thực
    useEffect(() => {
        const fetchQuestions = async () => {
            if (initialized && keycloak.token) {
                try {
                    setLoading(true);
                    // TODO: Backend cần hỗ trợ lọc câu hỏi theo creatorId
                    // Hiện tại, chúng ta lấy tất cả câu hỏi và sẽ lọc ở frontend (nếu cần)
                    const response = await getQuestions({ limit: 100 }, keycloak.token);
                    // Lọc những câu hỏi do người dùng hiện tại tạo
                    const myQuestions = response.data.filter(q => q.creatorId === keycloak.subject);
                    setQuestions(myQuestions);
                    setError(null);
                } catch (err) {
                    setError("Không thể tải danh sách câu hỏi. Vui lòng thử lại.");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchQuestions();
    }, [initialized, keycloak.token, keycloak.subject]);

    // --- Các hàm xử lý sự kiện ---

    const handleEdit = (questionId) => {
        // Điều hướng đến trang chỉnh sửa câu hỏi
        navigate(`/dashboard/edit-question/${questionId}`);
    };

    const handleOpenDeleteDialog = (questionId) => {
        setQuestionToDelete(questionId);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setQuestionToDelete(null);
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = async () => {
        if (!questionToDelete || !keycloak.token) return;

        try {
            await deleteQuestion(questionToDelete, keycloak.token);
            // Xóa câu hỏi khỏi state để UI cập nhật ngay lập tức
            setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== questionToDelete));
            handleCloseDeleteDialog();
        } catch (err) {
            setError("Xóa câu hỏi thất bại. Vui lòng thử lại.");
            console.error(err);
            handleCloseDeleteDialog();
        }
    };


    // --- Render ---

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
    }

    return (
        <Paper sx={{ m: 2, p: 2, borderRadius: 4 }}>
            <Typography variant="h4" gutterBottom>
                Câu hỏi của tôi
            </Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nội dung</TableCell>
                            <TableCell align="center">Độ khó</TableCell>
                            <TableCell align="center">Loại</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.length > 0 ? (
                            questions.map((question) => (
                                <TableRow key={question.id} hover>
                                    <TableCell sx={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {question.content}
                                    </TableCell>
                                    <TableCell align="center">{question.difficulty}</TableCell>
                                    <TableCell align="center">{question.type}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Chỉnh sửa">
                                            <IconButton onClick={() => handleEdit(question.id)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xóa">
                                            <IconButton onClick={() => handleOpenDeleteDialog(question.id)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Bạn chưa tạo câu hỏi nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Hộp thoại xác nhận xóa */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Xác nhận xóa câu hỏi?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa câu hỏi này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}