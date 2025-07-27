import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

// Layouts
const DashboardLayout = lazy(() => import("../components/DashboardLayout.jsx"));
import PublicLayout from "../components/PublicLayout.jsx";
import HomePage from "../pages/homePage.jsx";
const Login = lazy(() => import("../pages/loginPage.jsx"));
const AuthCallback = lazy(() => import("../services/authCallback.jsx"));
const TutorDashboard = lazy(() => import("../pages/tutors/tutorDashboard.jsx"));
const CreateQuiz = lazy(() => import("../pages/tutors/createQuiz.jsx"));
const StudentManagement = lazy(() =>
  import("../pages/tutors/studentManagement.jsx")
);
const StudentDashboard = lazy(() =>
  import("../pages/students/studentDashboard.jsx")
);
const ParentDashboard = lazy(() =>
  import("../pages/parents/parentDashboard.jsx")
);
const CreateNewQuiz = lazy(() => import("../pages/tutors/createNewQuiz.jsx"));
const CreatedByMe = lazy(() => import("../pages/tutors/createdByMe.jsx"));

// Components
const ProtectedRoute = lazy(() => import("./protectedRoute.jsx"));

const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress size={32} color="primary" />
  </Box>
);

function AppRoutes({ mode, toggleMode }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<PublicLayout mode={mode} toggleMode={toggleMode} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Route>

        <Route
          element={<DashboardLayout mode={mode} toggleMode={toggleMode} />}
        >
          <Route
            path="/tutor-dashboard"
            element={
              <ProtectedRoute allowedRoles={["tutor"]}>
                <TutorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-management"
            element={
              <ProtectedRoute allowedRoles={["tutor"]}>
                <StudentManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-quiz"
            element={
              <ProtectedRoute allowedRoles={["tutor"]}>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-quiz/new"
            element={
              <ProtectedRoute allowedRoles={["tutor"]}>
                <CreateNewQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-quiz/created"
            element={
              <ProtectedRoute allowedRoles={["tutor"]}>
                <CreatedByMe/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent-dashboard"
            element={
              <ProtectedRoute allowedRoles={["parent"]}>
                <ParentDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
