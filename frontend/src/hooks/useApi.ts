import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/api/axios';

const useApi = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await apiClient.get(url);
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
