export const CATEGORIES = [
	{ name: 'Food', color: '#10b981' },
	{ name: 'Groceries', color: '#06b6d4' },
	{ name: 'Gas', color: '#ef4444' },
	{ name: 'Bills', color: '#f97316' },
	{ name: 'Subscription', color: '#8b5cf6' },
	{ name: 'Shopping', color: '#ec4899' },
	{ name: 'Entertainment', color: '#3b82f6' },
	{ name: 'Health', color: '#f59e0b' },
	{ name: 'Transport', color: '#6366f1' },
	{ name: 'Salary', color: '#22c55e' },
	{ name: 'Other', color: '#6b7280' },
];

export const CATEGORY_COLORS: { [key: string]: string } = Object.fromEntries(
	CATEGORIES.map(({ name, color }) => [name, color])
);
