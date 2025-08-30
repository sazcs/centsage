import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: '/dashboard',
		element: <ProtectedRoute />,
		children: [
			{
				path: '/dashboard',
				element: <DashboardPage />,
			},
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
