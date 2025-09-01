import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Bot, BarChart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
	const apiBaseUrl =
		import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
	const googleLoginUrl = `${apiBaseUrl}/auth/google`;

	const features = [
		{
			icon: <Bot className='h-6 w-6' />,
			title: 'Smart Entry',
			description:
				'Type transactions like "coffee $5" and let our AI parse and categorize it instantly.',
		},
		{
			icon: <BarChart className='h-6 w-6' />,
			title: 'Data Visualization',
			description:
				'Understand your spending with beautiful, interactive charts and summaries.',
		},
		{
			icon: <Shield className='h-6 w-6' />,
			title: 'Secure & Private',
			description:
				'Log in with your Google account. We never see or store your password.',
		},
	];

	return (
		<Dialog>
			<div className='flex min-h-screen flex-col bg-background'>
				{/* Header */}
				<header className='container mx-auto flex h-16 items-center justify-between px-4 md:px-6'>
					<Link to='/' className='flex items-center gap-2'>
						<img
							src='/logo.png'
							alt='CentSage Vault Logo'
							className='h-8 w-8 object-contain'
						/>
						<span className='text-lg font-bold'>CentSage</span>
					</Link>
					<nav>
						<DialogTrigger asChild>
							<Button>Sign In</Button>
						</DialogTrigger>
					</nav>
				</header>

				{/* Main Content */}
				<main className='flex-1'>
					<section className='container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:py-32'>
						<h1 className='text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl'>
							Effortless Finance Tracking,
							<br />
							<span className='text-primary'>Powered by AI.</span>
						</h1>
						<p className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'>
							Stop manually categorizing. Just type what you spent, and let
							CentSage handle the rest. Secure, insightful, and beautifully
							simple.
						</p>
						<DialogTrigger asChild>
							<Button size='lg' className='mt-8'>
								Get Started for Free
							</Button>
						</DialogTrigger>
					</section>

					<section className='container mx-auto grid gap-8 px-4 py-16 md:grid-cols-3 md:px-6'>
						{features.map((feature) => (
							<div
								key={feature.title}
								className='flex flex-col items-center rounded-lg border p-6 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg'
							>
								<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
									{feature.icon}
								</div>
								<h3 className='text-xl font-bold'>{feature.title}</h3>
								<p className='mt-2 text-muted-foreground'>
									{feature.description}
								</p>
							</div>
						))}
					</section>
				</main>

				{/* Footer */}
				<footer className='container mx-auto py-6 text-center text-sm text-muted-foreground'>
					© {new Date().getFullYear()} CentSage. All rights reserved.
				</footer>
			</div>

			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Get Started</DialogTitle>
					<DialogDescription>
						Sign in with your Google account to securely track your finances.
					</DialogDescription>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<a
							href={googleLoginUrl}
							className='inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
						>
							<svg className='h-4 w-4' viewBox='0 0 24 24'>
								<path
									fill='#4285F4'
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
								/>
								<path
									fill='#34A853'
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.3v2.84C4.08 20.98 7.74 23 12 23z'
								/>
								<path
									fill='#FBBC05'
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.3C1.48 8.88 1 10.4 1 12s.48 3.12 1.3 4.93l3.54-2.84z'
								/>
								<path
									fill='#EA4335'
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.74 1 4.08 3.02 2.3 6.23l3.54 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
								/>
								<path fill='none' d='M1 1h22v22H1z' />
							</svg>
							Sign in with Google
						</a>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
