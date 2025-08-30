import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import type { TrendData } from '@/pages/DashboardPage';

interface TrendsChartProps {
	data: TrendData[];
	loading: boolean;
}

export function TrendsChart({ data, loading }: TrendsChartProps) {
	const formatXAxis = (tickItem: string) => {
		return new Date(tickItem).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		});
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(value);
	};

	if (loading) {
		return <Skeleton className='h-[280px] w-full md:h-[320px]' />;
	}

	if (data.length === 0) {
		return (
			<div className='flex h-[280px] w-full flex-col items-center justify-center text-center text-muted-foreground md:h-[320px]'>
				<p>Not enough data for a trend.</p>
				<p className='text-sm'>
					Add expenses on different days to see a chart.
				</p>
			</div>
		);
	}

	return (
		<div className='h-[280px] w-full md:h-[320px]'>
			<ResponsiveContainer width='100%' height='100%'>
				<LineChart
					data={data}
					margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray='3 3' strokeOpacity={0.2} />
					<XAxis dataKey='_id' tickFormatter={formatXAxis} />
					<YAxis tickFormatter={(value) => `$${value}`} />
					<Tooltip
						contentStyle={{ backgroundColor: 'hsl(var(--background))' }}
						formatter={formatCurrency}
					/>
					<Line
						type='monotone'
						dataKey='total'
						stroke='#3b82f6'
						strokeWidth={2}
						dot={{ r: 4 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
