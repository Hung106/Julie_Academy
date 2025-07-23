import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
const HomePage = lazy(() => import('../pages/homePage.jsx'));
const Login = lazy(() => import('../pages/loginPage.jsx'));
const AuthCallback = lazy(() => import('../services/AuthCallback.jsx'));
const TutorDashboard = lazy(() => import('../pages/tutors/tutorDashboard.jsx'));
const CreateQuiz = lazy(() => import('../pages/tutors/createQuiz.jsx'));
const StudentManagement = lazy(() => import('../pages/tutors/studentManagement.jsx'));
const StudentDashboard = lazy(() => import('../pages/students/studentDashboard.jsx'));
const ParentDashboard = lazy(() => import('../pages/parents/parentDashboard.jsx'));
const TutorVoice = lazy(() => import('../pages/tutorVoicePage.jsx'));
const ProtectedRoute = lazy(() => import('./protectedRoute.jsx'));

const LoadingFallback = () => (
    <Box sx={{ textAlign: 'center', mt: 5, py: 2 }}>
        <CircularProgress size={32} color="primary" />
        <Box sx={{ color: 'primary.main', fontSize: 18, mt: 2 }}>Đang tải nội dung...</Box>
    </Box>
);

function AppRoutes() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* === Route công khai === */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />

                {/* === Route được bảo vệ cho Tutor === */}
                <Route path="/dashboard/tutor" element={<ProtectedRoute allowedRoles={['tutor']}><TutorDashboard /></ProtectedRoute>} />
                <Route path="/studentManagement" element={<ProtectedRoute allowedRoles={['tutor']}><StudentManagement /></ProtectedRoute>} />
                <Route path="/createQuiz" element={<ProtectedRoute allowedRoles={['tutor']}><CreateQuiz /></ProtectedRoute>} />
                <Route path="/tutor-voice" element={<ProtectedRoute allowedRoles={['tutor']}><TutorVoice /></ProtectedRoute>} />

                {/* === Route được bảo vệ cho Student === */}
                <Route path="/dashboard/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
                
                {/* === Route được bảo vệ cho Parent === */}
                <Route path="/dashboard/parent" element={<ProtectedRoute allowedRoles={['parent']}><ParentDashboard /></ProtectedRoute>} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;