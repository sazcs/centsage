import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
} from 'recharts';

const data = [
	{ name: 'Rent', value: 1200 },
	{ name: 'Groceries', value: 450 },
	{ name: 'Transport', value: 180 },
	{ name: 'Utilities', value: 220 },
	{ name: 'Leisure', value: 300 },
];

const COLORS = ['#10b981', '#6b7280', '#ef4444', '#374151', '#047857'];

export function SpendingPie() {
	return (
		<div className='h-[280px] w-full md:h-[320px]'>
			<ResponsiveContainer width='100%' height='100%'>
				<PieChart>
					<Pie
						data={data}
						dataKey='value'
						nameKey='name'
						innerRadius={55}
						outerRadius={90}
						paddingAngle={3}
						cornerRadius={4}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${entry.name}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
