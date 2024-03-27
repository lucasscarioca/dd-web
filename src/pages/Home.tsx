import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export const Home = () => {
	const [isSignUp, setIsSignUp] = useState(false)
	const handleMethodChange = () => {
		setIsSignUp(!isSignUp)
	}
	return (
		<main className='flex w-screen h-screen'>
			<h2 className='h-full w-full flex-1 text-2xl flex items-center justify-center font-bold'>
				Dino Diary
			</h2>
			<section className='h-full w-full flex-1 flex flex-col items-center justify-center gap-1 bg-primary'>
				<form className='flex flex-col gap-4 items-center rounded bg-background px-4 py-6 w-80 h-80 justify-center'>
					<span className='text-xl font-semibold'>
						{isSignUp ? 'Sign Up' : 'Login'}
					</span>
					<fieldset className='flex flex-col w-full'>
						<label htmlFor='email'>Email</label>
						<Input type='email' id='email' placeholder='Email' />
					</fieldset>
					<fieldset className='flex flex-col w-full'>
						<label htmlFor='password'>Password</label>
						<Input
							type='password'
							id='password'
							placeholder='Password'
						/>
					</fieldset>
					<Button type='submit' className='w-full'>
						{isSignUp ? 'Sign Up' : 'Login'}
					</Button>
				</form>
				<Button
					variant='link'
					onClick={handleMethodChange}
					className='text-primary-foreground'
				>
					{isSignUp
						? 'Already have an account?'
						: 'Create an account'}
				</Button>
			</section>
		</main>
	)
}
