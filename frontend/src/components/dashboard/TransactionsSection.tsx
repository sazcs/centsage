import { SmartEntry } from './transactions/SmartEntry';
import { TransactionsTable } from './transactions/TransactionsTable';
import type { Transaction } from '@/pages/DashboardPage';
import { Input } from '@/components/ui/input';

interface TransactionsSectionProps {
	transactions: Transaction[];
	loading: boolean;
	onTransactionChange: () => void;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

export function TransactionsSection({
	transactions,
	loading,
	onTransactionChange,
	searchTerm,
	setSearchTerm,
}: TransactionsSectionProps) {
	return (
		<div className='flex flex-col'>
			<div className='flex items-end justify-between'>
				<h2 className='text-pretty text-lg font-medium text-foreground'>
					Transactions
				</h2>
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
