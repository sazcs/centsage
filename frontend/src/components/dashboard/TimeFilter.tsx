import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FilterOption = 'week' | 'month' | 'all';

interface TimeFilterProps {
	currentFilter: FilterOption;
	onFilterChange: (filter: FilterOption) => void;
}

export function TimeFilter({ currentFilter, onFilterChange }: TimeFilterProps) {
	const filters: { label: string; value: FilterOption }[] = [
		{ label: 'This Week', value: 'week' },
		{ label: 'This Month', value: 'month' },
		{ label: 'All Time', value: 'all' },
	];

	return (
		<div className='flex items-center gap-2 rounded-lg bg-muted p-1'>
			{filters.map(({ label, value }) => (
				<Button
					key={value}
					variant='ghost'
					size='sm'
					onClick={() => onFilterChange(value)}
					className={cn(
						'flex-1 justify-center',
						currentFilter === value && 'bg-background shadow'
					)}
				>
					{label}
				</Button>
			))}
		</div>
	);
}
