import { SmartEntry } from './transactions/SmartEntry';
import { TransactionsTable } from './transactions/TransactionsTable';
import type { Transaction, FilterOption } from '@/pages/DashboardPage';
import { Input } from '@/components/ui/input';
import { TimeFilter } from './TimeFilter';

interface TransactionsSectionProps {
	transactions: Transaction[];
	loading: boolean;
	onTransactionChange: () => void;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	currentFilter: FilterOption;
	onFilterChange: (filter: FilterOption) => void;
}

export function TransactionsSection({
	transactions,
	loading,
	onTransactionChange,
	searchTerm,
	setSearchTerm,
	currentFilter,
	onFilterChange,
}: TransactionsSectionProps) {
	return (
		<div className='flex flex-col'>
			<div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
				<h2 className='text-pretty text-lg font-medium text-foreground'>
					Transactions
				</h2>
				<div className='w-full md:w-auto'>
					<TimeFilter
						currentFilter={currentFilter}
						onFilterChange={onFilterChange}
					/>
				</div>
			</div>

			<div className='mt-3'>
				<SmartEntry onTransactionAdded={onTransactionChange} />
			</div>

			<div className='mt-4 space-y-3'>
				<Input
					placeholder='Search by description or category...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div className='rounded-lg border bg-card p-2 sm:p-3'>
					<TransactionsTable
						transactions={transactions}
						loading={loading}
						onTransactionChange={onTransactionChange}
					/>
				</div>
			</div>
		</div>
	);
}
