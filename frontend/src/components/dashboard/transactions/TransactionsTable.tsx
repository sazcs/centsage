import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import type { Transaction } from '@/pages/DashboardPage';
import { Skeleton } from '@/components/ui/skeleton';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { EditTransactionDialog } from './EditTransactionDialog';
import apiClient from '@/api/axios';

interface TransactionsTableProps {
	transactions: Transaction[];
	loading: boolean;
	onTransactionChange: () => void;
}

export function TransactionsTable({
	transactions,
	loading,
	onTransactionChange,
}: TransactionsTableProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	};
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	if (loading) {
		return (
			<div className='space-y-2'>
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className='h-12 w-full' />
				))}
			</div>
		);
	}

	return (
		<div className='overflow-x-auto'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='min-w-[200px]'>Description</TableHead>
						<TableHead className='min-w-[140px]'>Category</TableHead>
						<TableHead className='min-w-[120px]'>Date</TableHead>
						<TableHead className='min-w-[120px] text-right'>Amount</TableHead>
						<TableHead className='w-[60px] text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions.map((txn) => (
						<TableRow key={txn._id}>
							<TableCell className='font-medium'>{txn.description}</TableCell>
							<TableCell className='text-muted-foreground'>
								{txn.category}
							</TableCell>
							<TableCell className='text-muted-foreground'>
								{formatDate(txn.date)}
							</TableCell>
							<TableCell className='text-right'>
								<span
									className={
										txn.type === 'expense' ? 'text-red-500' : 'text-emerald-500'
									}
								>
									{txn.type === 'expense' ? '-' : '+'}
									{formatCurrency(txn.amount)}
								</span>
							</TableCell>
							<TableCell className='text-right'>
								<RowActions
									transaction={txn}
									onTransactionChange={onTransactionChange}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function RowActions({
	transaction,
	onTransactionChange,
}: {
	transaction: Transaction;
	onTransactionChange: () => void;
}) {
	const handleDelete = async () => {
		try {
			await apiClient.delete(`/transactions/${transaction._id}`);
			toast.success('Success', {
				description: 'Transaction deleted successfully.',
			});
			onTransactionChange();
		} catch (error) {
			console.error('Failed to delete transaction', error);
			toast.error('Error', { description: 'Failed to delete transaction.' });
		}
	};

	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon' aria-label='Row actions'>
						<MoreHorizontal className='h-4 w-4' />
						<span className='sr-only'>Open actions</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<EditTransactionDialog
						transaction={transaction}
						onTransactionChange={onTransactionChange}
					>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
							Edit
						</DropdownMenuItem>
					</EditTransactionDialog>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							onSelect={(e) => e.preventDefault()}
							className='text-red-500'
						>
							Delete
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this
						transaction record.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
