import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useApi = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		if (!API_BASE_URL) {
			setError(
				'API base URL is not configured. Please check VITE_API_BASE_URL environment variable.'
			);
			setLoading(false);
			return;
		}

		setLoading(true);
		try {
			const response = await axios.get(`${API_BASE_URL}${url}`);
			setData(response.data);
			setError(null);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
			setData(null);
		} finally {
			setLoading(false);
		}
	}, [url]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
};

export default useApi;
