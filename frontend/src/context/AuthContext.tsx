import {
	createContext,
	useState,
	useEffect,
	useContext,
	type ReactNode,
} from 'react';
import axios from 'axios';

export interface User {
	_id: string;
	displayName: string;
	email: string;
	image?: string;
}

interface IAuthContext {
	token: string | null;
	user: User | null;
	loading: boolean;
	logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const urlToken = urlParams.get('token');

			if (urlToken) {
				localStorage.setItem('authToken', urlToken);
				window.history.replaceState(
					{},
					document.title,
					window.location.pathname
				);
			}

			const storedToken = urlToken || localStorage.getItem('authToken');

			if (storedToken) {
				setToken(storedToken);
				axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${storedToken}`;
				try {
					const { data } = await axios.get(`${API_BASE_URL}/auth/profile`);
					setUser(data);
				} catch (error) {
					console.error('Failed to fetch user profile', error);
					localStorage.removeItem('authToken');
					setToken(null);
					setUser(null);
				}
			}
			setLoading(false);
		};
		initAuth();
	}, []);

	const logout = () => {
		localStorage.removeItem('authToken');
		setToken(null);
		setUser(null);
		delete axios.defaults.headers.common['Authorization'];
	};

	return (
		<AuthContext.Provider value={{ token, user, loading, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
