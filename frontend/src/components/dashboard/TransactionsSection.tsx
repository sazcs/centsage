import { SmartEntry } from './transactions/SmartEntry';
import { TransactionsTable } from './transactions/TransactionsTable';

export function TransactionsSection() {
	return (
		<div className='flex flex-col'>
			<div className='flex items-end justify-between'>
				<h2 className='text-pretty text-lg font-medium text-foreground'>
					Transactions
				</h2>
			</div>

			<div className='mt-3'>
				<SmartEntry />
			</div>

			<div className='mt-4 rounded-lg border bg-card p-2 sm:p-3'>
				<TransactionsTable />
			</div>
		</div>
	);
}
