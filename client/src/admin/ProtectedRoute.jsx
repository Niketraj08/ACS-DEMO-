import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLoader from '../components/ui/PageLoader';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/admin" replace />;
  return children;
}
// This component is a higher-order component that protects admin routes. It checks if the user is authenticated and optionally if they have admin privileges. If the user is not authenticated, it redirects them to the login page. If the user is authenticated but does not have the required admin role, it redirects them to the admin dashboard. While the authentication status is being determined, it displays a loading indicator.