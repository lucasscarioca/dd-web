import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Navbar } from './Navbar'

export const ProtectedLayout = ({ page }: { page: JSX.Element }) => {
	const { user } = useAuth()
	if (!user) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className='h-full flex flex-col'>
			<Navbar />
			<main className='h-full w-full py-2 px-4'>
				<div className='h-full w-full bg-secondary text-secondary-foreground rounded-md py-2 px-4'>
					{page}
				</div>
			</main>
		</div>
	)
}
