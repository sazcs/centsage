import { Button } from '@/components/ui/button';
import { Bot, BarChart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
	return (
		<div className='flex min-h-screen flex-col bg-background'>
			{/* Header */}
			<header className='container mx-auto flex h-16 items-center justify-between px-4 md:px-6'>
				<Link to='/' className='flex items-center gap-2'>
					<div
						aria-hidden='true'
						className='h-6 w-6 rounded-md bg-emerald-500'
					/>
					<span className='text-lg font-bold'>CentSage</span>
				</Link>
				<nav>
					<Link to='/login'>
						<Button>Sign In</Button>
					</Link>
				</nav>
			</header>

			{/* Main Content */}
			<main className='flex-1'>
				<section className='container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:py-32'>
					<h1 className='text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl'>
						Effortless Finance Tracking, Powered by AI.
					</h1>
					<p className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'>
						Stop manually categorizing. Just type what you spent, and let
						CentSage handle the rest. Secure, insightful, and beautifully
						simple.
					</p>
					<Link to='/login' className='mt-8'>
						<Button size='lg'>Get Started for Free</Button>
					</Link>
				</section>

				<section className='container mx-auto grid gap-8 px-4 py-16 md:grid-cols-3 md:px-6'>
					<div className='flex flex-col items-center text-center'>
						<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
							<Bot className='h-6 w-6' />
						</div>
						<h3 className='text-xl font-bold'>Smart Entry</h3>
						<p className='mt-2 text-muted-foreground'>
							Type transactions like "coffee $5" and let our AI parse and
							categorize it instantly.
						</p>
					</div>
					<div className='flex flex-col items-center text-center'>
						<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
							<BarChart className='h-6 w-6' />
						</div>
						<h3 className='text-xl font-bold'>Data Visualization</h3>
						<p className='mt-2 text-muted-foreground'>
							Understand your spending with beautiful, interactive charts and
							summaries.
						</p>
					</div>
					<div className='flex flex-col items-center text-center'>
						<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
							<Shield className='h-6 w-6' />
						</div>
						<h3 className='text-xl font-bold'>Secure & Private</h3>
						<p className='mt-2 text-muted-foreground'>
							Log in with your Google account. We never see or store your
							password.
						</p>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className='container mx-auto py-6 text-center text-sm text-muted-foreground'>
				© {new Date().getFullYear()} CentSage. All rights reserved.
			</footer>
		</div>
	);
}
