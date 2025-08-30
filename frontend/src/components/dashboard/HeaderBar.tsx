import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

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
		<header className='flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<div
					aria-hidden='true'
					className='h-8 w-8 rounded-md bg-emerald-500'
					title='CentSage'
				/>
				<h1 className='text-balance text-xl font-semibold tracking-tight text-foreground'>
					CentSage
				</h1>
			</div>

			{user && (
				<div className='flex items-center gap-3'>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-muted-foreground'>
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
