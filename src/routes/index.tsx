import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Login } from '../pages/auth/Login';
import { Dashboard } from '../pages/dashboard';
import { Schedule } from '../pages/schedule';
import { Members } from '../pages/members';
import { Workouts } from '../pages/workouts';
import { DietPlans } from '../pages/diet-plans';
import { Notifications } from '../pages/notifications';
import { Settings } from '../pages/settings';
import { Payments } from '../pages/payments';

export function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/members" element={<Members />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/diet-plans" element={<DietPlans />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}