import { HeaderBar } from './dashboard/HeaderBar';
import { SummaryCards } from './dashboard/SummaryCards';
import { SpendingPie } from './dashboard/SpendingPie';
import { TransactionsSection } from './dashboard/TransactionsSection';

export default function DashboardLayout() {
	return (
		<main className='min-h-dvh bg-background'>
			<div className='mx-auto w-full max-w-6xl px-4 py-6 md:py-8'>
				<HeaderBar />

				<section aria-labelledby='summary-heading' className='mt-6'>
					<h2 id='summary-heading' className='sr-only'>
						Account summary
					</h2>
					<SummaryCards />
				</section>

				<section
					aria-labelledby='analytics-and-transactions'
					className='mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2'
				>
					<div className='flex flex-col'>
						<h2
							id='analytics-and-transactions'
							className='text-pretty text-lg font-medium text-foreground'
						>
							Spending by Category
						</h2>
						<div className='mt-3 rounded-lg border bg-card p-4'>
							<SpendingPie />
						</div>
					</div>

					<TransactionsSection />
				</section>
			</div>
		</main>
	);
}
