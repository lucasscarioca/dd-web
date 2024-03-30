import { Navbar } from '@/components/Navbar'

export const HomePage = () => {
	return (
		<div className='h-full flex flex-col'>
			<Navbar />
			<main className='h-full flex flex-1 py-2 px-4'>
				<div className='py-2 px-4 w-full rounded-md bg-primary'>
					Home
				</div>
			</main>
		</div>
	)
}
