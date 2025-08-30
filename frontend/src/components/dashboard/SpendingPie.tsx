import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
} from 'recharts';
import { CATEGORY_COLORS } from '@/lib/categories';
import { Skeleton } from '@/components/ui/skeleton';
import type { CategorySpending } from '@/pages/DashboardPage';

interface SpendingPieProps {
	data: CategorySpending[];
	loading: boolean;
}

export function SpendingPie({ data, loading }: SpendingPieProps) {
	if (loading) {
		return <Skeleton className='h-[280px] w-full rounded-full md:h-[320px]' />;
	}

	const chartData = data.map((item) => ({
		name: item._id,
		value: item.total,
		fill: CATEGORY_COLORS[item._id] || CATEGORY_COLORS['Other'],
	}));

	if (chartData.length === 0) {
		return (
			<div className='flex h-[280px] w-full flex-col items-center justify-center text-muted-foreground md:h-[320px]'>
				<p>No spending data available.</p>
				<p className='text-sm'>Add an expense to see the chart.</p>
			</div>
		);
	}

	return (
		<div className='h-[280px] w-full md:h-[320px]'>
			<ResponsiveContainer width='100%' height='100%'>
				<PieChart>
					<Pie
						data={chartData}
						dataKey='value'
						nameKey='name'
						innerRadius={60}
						outerRadius={100}
						paddingAngle={5}
						cornerRadius={5}
					>
						{chartData.map((entry) => (
							<Cell key={`cell-${entry.name}`} fill={entry.fill} />
						))}
					</Pie>
					<Tooltip
						formatter={(value: number) =>
							new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD',
							}).format(value)
						}
					/>
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
