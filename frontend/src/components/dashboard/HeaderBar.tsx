import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '../ThemeToggle';
import { Link } from 'react-router-dom';

export function HeaderBar() {
	const { user, logout } = useAuth();

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase();
	};

	return (
		<header className='flex w-full items-center justify-between py-2'>
			<Link to='/dashboard' className='flex items-center gap-2'>
				<img
					src='/logo.png'
					alt='CentSage Vault Logo'
					className='h-8 w-8 object-contain'
				/>
				<h1 className='text-balance text-xl font-semibold tracking-tight text-foreground'>
					CentSage
				</h1>
			</Link>
			{user && (
				<div className='flex items-center gap-4'>
					<ThemeToggle />
					<div className='flex items-center gap-2'>
						<span className='hidden text-sm text-muted-foreground sm:inline'>
							{user.displayName}
						</span>
						<Avatar className='h-8 w-8'>
							<AvatarFallback aria-label='User initials'>
								{getInitials(user.displayName)}
							</AvatarFallback>
						</Avatar>
					</div>
					<Button variant='outline' aria-label='Log out' onClick={logout}>
						Log out
					</Button>
				</div>
			)}
		</header>
	);
}
