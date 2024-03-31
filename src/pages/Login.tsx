import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Navigate, useNavigate } from 'react-router-dom'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks/useAuth'
import { loginUser, signInWithGoogle } from '@/lib/firebase'

export const LoginPage = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		if (!email || !password) return

		setIsLoading(true)
		loginUser(email, password)
			.then(userCredential => {
				const user = userCredential.user
				console.log('authenticated as user:', user)
			})
			.catch(console.error)
			.finally(() => setIsLoading(false))
	}

	if (user) {
		return <Navigate to='/' />
	}

	return (
		<main className='flex flex-col md:flex-row w-screen h-screen'>
			<div className='absolute right-4 top-2 text-primary-foreground'>
				<ThemeToggle />
			</div>
			<h2 className='h-44 bg-primary text-primary-foreground md:bg-background md:text-foreground md:h-full w-full md:flex-1 text-2xl flex items-center justify-center font-bold'>
				Dino Diary
			</h2>
			<section className='h-full w-full flex-1 flex flex-col items-center md:justify-center gap-1 bg-primary'>
				<form
					onSubmit={handleLogin}
					className='flex flex-col gap-2 items-center rounded-md bg-background px-4 py-6 w-1/2 justify-center'
				>
					<span className='text-xl font-semibold'>Login</span>
					<fieldset className='flex flex-col w-full'>
						<label htmlFor='email'>Email</label>
						<Input
							type='email'
							id='email'
							placeholder='Email'
							onChange={event => setEmail(event.target.value)}
						/>
					</fieldset>
					<fieldset className='flex flex-col w-full'>
						<label htmlFor='password'>Password</label>
						<Input
							type='password'
							id='password'
							placeholder='Password'
							required
							minLength={6}
							onChange={event => setPassword(event.target.value)}
						/>
					</fieldset>
					<div className='flex flex-col w-full gap-2 pt-6'>
						<Button
							type='submit'
							className='w-full'
							disabled={isLoading}
						>
							{isLoading && (
								<Loading className='mr-2 text-primary-foreground size-5' />
							)}
							Login
						</Button>
						<Button
							className='w-full'
							type='button'
							variant='secondary'
							disabled={isLoading}
							onClick={() =>
								signInWithGoogle().catch(console.error)
							}
						>
							Sign In with Google
						</Button>
					</div>
				</form>
				<Button
					variant='link'
					onClick={() => navigate('/register')}
					className='text-primary-foreground'
				>
					Create an account
				</Button>
			</section>
		</main>
	)
}
