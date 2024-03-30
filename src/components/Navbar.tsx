import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const Navbar = () => {
	const handleSignOut = () => {
		signOut(auth)
			.then(() => console.log('Sucessfully signed out'))
			.catch(console.error)
	}
	return (
		<nav className='py-2 px-8 flex items-center justify-between bg-muted'>
			<h1>Home</h1>
			<Button variant='ghost' onClick={handleSignOut}>
				<LogOut />
				<span className='sr-only'>Sign out</span>
			</Button>
		</nav>
	)
}
