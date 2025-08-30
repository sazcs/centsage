import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center'>
			<h1 className='text-8xl font-bold text-primary'>404</h1>
			<h2 className='text-3xl font-semibold tracking-tight'>Page Not Found</h2>
			<p className='max-w-md text-muted-foreground'>
				Oops! The page you're looking for doesn't exist. You might have mistyped
				the address or the page may have moved.
			</p>
			<Link to='/'>
				<Button>Go Back to Homepage</Button>
			</Link>
		</div>
	);
}
