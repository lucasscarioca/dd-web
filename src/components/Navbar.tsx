import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { logoutUser } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import { UserAvatar } from './UserAvatar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export const Navbar = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const handleSignOut = () => {
		logoutUser()
			.then(() => console.log('Sucessfully signed out'))
			.catch(console.error)
	}
	return (
		<nav className='py-2 px-8 flex items-center justify-between bg-primary/80 text-primary-foreground'>
			<Button
				variant='ghost'
				className={
					pathname === '/profile'
						? 'flex items-center gap-2 rounded-full pl-1 py-0.5 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
						: 'flex items-center gap-2 rounded-full pl-1 py-0.5 hover:bg-primary hover:text-primary-foreground'
				}
				onClick={() => navigate('/profile')}
			>
				<UserAvatar url={user?.photoURL} />
				<span className='text-xs'>
					{user?.displayName || user?.email}
				</span>
			</Button>
			<div className='flex items-center gap-4'>
				<Link
					to='/'
					className={
						pathname === '/'
							? 'bg-primary rounded-full px-2 py-1'
							: 'hover:bg-primary rounded-full px-2 py-1'
					}
				>
					Home
				</Link>
				<Link
					to='/pacients'
					className={
						pathname === '/pacients'
							? 'bg-primary rounded-full px-2 py-1'
							: 'hover:bg-primary rounded-full px-2 py-1'
					}
				>
					Pacients
				</Link>
				<Link
					to='/messages'
					className={
						pathname === '/messages'
							? 'bg-primary rounded-full px-2 py-1'
							: 'hover:bg-primary rounded-full px-2 py-1'
					}
				>
					Messages
				</Link>
			</div>
			<div className='flex items-center gap-2'>
				<ThemeToggle className='hover:bg-primary hover:text-primary-foreground' />
				<Button
					variant='ghost'
					size='icon'
					onClick={handleSignOut}
					className='hover:bg-primary hover:text-primary-foreground'
				>
					<LogOut className='size-5' />
					<span className='sr-only'>Sign out</span>
				</Button>
			</div>
		</nav>
	)
}
