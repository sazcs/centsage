import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
	const { token, loading } = useAuth();

	if (loading) {
		return (
			<div className='flex h-screen w-screen items-center justify-center'>
				Loading...
			</div>
		);
	}

	return token ? <Outlet /> : <Navigate to='/' replace />;
};

export default ProtectedRoute;
