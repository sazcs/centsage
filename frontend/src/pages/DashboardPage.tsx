import { useState, useMemo } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import useApi from '../hooks/useApi';
import { startOfWeek, startOfMonth, format } from 'date-fns';

export interface SummaryData {
	income: number;
	expenses: number;
	savings: number;
}
export interface Transaction {
	_id: string;
	type: 'income' | 'expense';
	amount: number;
	category: string;
	description: string;
	date: string;
}
export interface CategorySpending {
	_id: string;
	total: number;
}
export interface TrendData {
	_id: string;
	total: number;
}
export type FilterOption = 'week' | 'month' | 'all';

const DashboardPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState<FilterOption>('all');

	const dateRange = useMemo(() => {
		const today = new Date();
		if (filter === 'week') {
			return `?startDate=${format(startOfWeek(today), 'yyyy-MM-dd')}`;
		}
		if (filter === 'month') {
			return `?startDate=${format(startOfMonth(today), 'yyyy-MM-dd')}`;
		}
		return ''; // All time
	}, [filter]);

	const {
		data: summaryData,
		loading: summaryLoading,
		refetch: refetchSummary,
	} = useApi<SummaryData>(`/analytics/summary${dateRange}`);

	const {
		data: transactionsData,
		loading: transactionsLoading,
		refetch: refetchTransactions,
	} = useApi<Transaction[]>(`/transactions${dateRange}`);

	const {
		data: categoriesData,
		loading: categoriesLoading,
		refetch: refetchCategories,
	} = useApi<CategorySpending[]>(`/analytics/categories${dateRange}`);

	const {
		data: trendsData,
		loading: trendsLoading,
		refetch: refetchTrends,
	} = useApi<TrendData[]>(`/analytics/trends${dateRange}`);

	const handleTransactionChange = () => {
		refetchSummary();
		refetchTransactions();
		refetchCategories();
		refetchTrends();
	};

	const filteredTransactions = (transactionsData || []).filter(
		(transaction) =>
			transaction.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<DashboardLayout
			summaryData={summaryData}
			summaryLoading={summaryLoading}
			transactions={filteredTransactions}
			transactionsLoading={transactionsLoading}
			onTransactionChange={handleTransactionChange}
			categorySpending={categoriesData || []}
			categorySpendingLoading={categoriesLoading}
			spendingTrends={trendsData || []}
			spendingTrendsLoading={trendsLoading}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
			currentFilter={filter}
			onFilterChange={setFilter}
		/>
	);
};

export default DashboardPage;
