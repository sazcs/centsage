import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

interface SummaryData {
	income: number;
	expenses: number;
	savings: number;
}

interface SummaryCardsProps {
	data: SummaryData | null;
	loading: boolean;
}

export function SummaryCards({ data, loading }: SummaryCardsProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	};

	if (loading) {
		return (
			<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
				{[...Array(3)].map((_, i) => (
					<Card key={i} className='animate-pulse'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<div className='h-4 w-24 rounded bg-muted'></div>
							<div className='h-4 w-4 rounded bg-muted'></div>
						</CardHeader>
						<CardContent>
							<div className='mt-1 h-8 w-32 rounded bg-muted'></div>
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	const cards = [
		{
			title: 'Total Income',
			amount: data ? formatCurrency(data.income) : '$0.00',
			icon: TrendingUp,
			accentClass: 'text-emerald-500',
		},
		{
			title: 'Total Expenses',
			amount: data ? formatCurrency(data.expenses) : '$0.00',
			icon: TrendingDown,
			accentClass: 'text-red-500',
		},
		{
			title: 'Savings',
			amount: data ? formatCurrency(data.savings) : '$0.00',
			icon: PiggyBank,
			accentClass:
				data?.savings && data.savings < 0 ? 'text-red-500' : 'text-emerald-500',
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
