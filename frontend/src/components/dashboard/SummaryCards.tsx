import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

export function SummaryCards() {
	const cards = [
		{
			title: 'Total Income',
			amount: '$5,000.00',
			icon: TrendingUp,
			accentClass: 'text-emerald-500',
		},
		{
			title: 'Total Expenses',
			amount: '$3,200.00',
			icon: TrendingDown,
			accentClass: 'text-red-500',
		},
		{
			title: 'Savings',
			amount: '$1,800.00',
			icon: PiggyBank,
			accentClass: 'text-emerald-500',
		},
	] as const;

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
			{cards.map(({ title, amount, icon: Icon, accentClass }) => (
				<Card key={title} className='bg-card'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium text-muted-foreground'>
							{title}
						</CardTitle>
						<Icon aria-hidden='true' className={`h-4 w-4 ${accentClass}`} />
					</CardHeader>
					<CardContent>
						<p className='text-2xl font-semibold tracking-tight text-foreground'>
							{amount}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
