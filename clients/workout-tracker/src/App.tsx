import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './lib/auth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage';
import WorkoutsPage from './pages/WorkoutsPage';
import WorkoutLogPage from './pages/WorkoutLogPage';
import TemplatesPage from './pages/TemplatesPage';
import TemplateFormPage from './pages/TemplateFormPage';
import SchedulesPage from './pages/SchedulesPage';
import ScheduleFormPage from './pages/ScheduleFormPage';
import Layout from './components/Layout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="schedules" element={<SchedulesPage />} />
        <Route path="schedules/:id" element={<ScheduleFormPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="templates/:id" element={<TemplateFormPage />} />
        <Route path="exercises" element={<ExercisesPage />} />
        <Route path="workouts" element={<WorkoutsPage />} />
        <Route path="workouts/:id" element={<WorkoutLogPage />} />
      </Route>
    </Routes>
  );
}

export default App;

