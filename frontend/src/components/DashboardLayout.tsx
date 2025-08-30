import { HeaderBar } from './dashboard/HeaderBar';
import { SummaryCards } from './dashboard/SummaryCards';
import { SpendingPie } from './dashboard/SpendingPie';
import { TransactionsSection } from './dashboard/TransactionsSection';
import { TrendsChart } from './dashboard/TrendsChart';
import type {
	Transaction,
	CategorySpending,
	SummaryData,
	TrendData,
} from '@/pages/DashboardPage';
import { Toaster } from 'sonner';

interface DashboardLayoutProps {
	summaryData: SummaryData | null;
	summaryLoading: boolean;
	transactions: Transaction[];
	transactionsLoading: boolean;
	onTransactionChange: () => void;
	categorySpending: CategorySpending[];
	categorySpendingLoading: boolean;
	spendingTrends: TrendData[];
	spendingTrendsLoading: boolean;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

export default function DashboardLayout({
	summaryData,
	summaryLoading,
	transactions,
	transactionsLoading,
	onTransactionChange,
	categorySpending,
	categorySpendingLoading,
	spendingTrends,
	spendingTrendsLoading,
	searchTerm,
	setSearchTerm,
}: DashboardLayoutProps) {
	return (
		<>
			<main className='min-h-dvh bg-background'>
				<div className='mx-auto w-full max-w-6xl px-4 py-6 md:py-8'>
					<HeaderBar />

					<section aria-labelledby='summary-heading' className='mt-6'>
						<h2 id='summary-heading' className='sr-only'>
							Account summary
						</h2>
						<SummaryCards data={summaryData} loading={summaryLoading} />
					</section>

					<section
						aria-labelledby='analytics-and-transactions'
						className='mt-8 grid grid-cols-1 gap-6 md:mt-10 lg:grid-cols-5' // Changed grid to 5 cols for better layout
					>
						<div className='flex flex-col gap-6 lg:col-span-2'>
							{' '}
							{/* Left column takes 2 of 5 cols */}
							<div className='flex flex-col'>
								<h2 className='text-pretty text-lg font-medium text-foreground'>
									Spending by Category
								</h2>
								<div className='mt-3 rounded-lg border bg-card p-4'>
									<SpendingPie
										data={categorySpending}
										loading={categorySpendingLoading}
									/>
								</div>
							</div>
							<div className='flex flex-col'>
								<h2 className='text-pretty text-lg font-medium text-foreground'>
									Spending Trends
								</h2>
								<div className='mt-3 rounded-lg border bg-card p-4'>
									<TrendsChart
										data={spendingTrends}
										loading={spendingTrendsLoading}
									/>
								</div>
							</div>
						</div>

						<div className='lg:col-span-3'>
							{' '}
							{/* Right column takes 3 of 5 cols */}
							<TransactionsSection
								transactions={transactions}
								loading={transactionsLoading}
								onTransactionChange={onTransactionChange}
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
							/>
						</div>
					</section>
				</div>
			</main>
			<Toaster richColors />
		</>
	);
}
