import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import useApi from '../hooks/useApi';

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
	_id: string; // This will be the date, e.g., "2025-08-30"
	total: number;
}

const DashboardPage = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const {
		data: summaryData,
		loading: summaryLoading,
		refetch: refetchSummary,
	} = useApi<SummaryData>('/analytics/summary');

	const {
		data: transactionsData,
		loading: transactionsLoading,
		refetch: refetchTransactions,
	} = useApi<Transaction[]>('/transactions');

	const {
		data: categoriesData,
		loading: categoriesLoading,
		refetch: refetchCategories,
	} = useApi<CategorySpending[]>('/analytics/categories');

	const {
		data: trendsData,
		loading: trendsLoading,
		refetch: refetchTrends,
	} = useApi<TrendData[]>('/analytics/trends');

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
		/>
	);
};

export default DashboardPage;
