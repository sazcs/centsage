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

type Txn = {
	id: string;
	description: string;
	category: string;
	date: string;
	amount: string;
};

const rows: Txn[] = [
	{
		id: '1',
		description: 'Salary',
		category: 'Income',
		date: '2025-08-01',
		amount: '+$3,500.00',
	},
	{
		id: '2',
		description: 'Rent - August',
		category: 'Housing',
		date: '2025-08-02',
		amount: '-$1,200.00',
	},
	{
		id: '3',
		description: 'Groceries - Market',
		category: 'Groceries',
		date: '2025-08-05',
		amount: '-$145.35',
	},
	{
		id: '4',
		description: 'Gym Membership',
		category: 'Health',
		date: '2025-08-07',
		amount: '-$45.00',
	},
];

export function TransactionsTable() {
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
					{rows.map((r) => (
						<TableRow key={r.id}>
							<TableCell className='font-medium'>{r.description}</TableCell>
							<TableCell className='text-muted-foreground'>
								{r.category}
							</TableCell>
							<TableCell className='text-muted-foreground'>{r.date}</TableCell>
							<TableCell className='text-right'>
								<span
									className={
										r.amount.startsWith('-')
											? 'text-red-500'
											: 'text-emerald-500'
									}
								>
									{r.amount}
								</span>
							</TableCell>
							<TableCell className='text-right'>
								<RowActions id={r.id} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function RowActions({ id }: { id: string }) {
	const onEdit = () => console.log('[v0] Edit txn:', id);
	const onDelete = () => console.log('[v0] Delete txn:', id);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' aria-label='Row actions'>
					<MoreHorizontal className='h-4 w-4' />
					<span className='sr-only'>Open actions</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
				<DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
