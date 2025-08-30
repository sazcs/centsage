import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

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
		path: '*',
		element: <NotFoundPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
