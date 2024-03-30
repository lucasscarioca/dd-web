import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
	User,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'

import { auth } from '@/lib/firebase'
import { FirebaseError } from 'firebase/app'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Navigate, useNavigate } from 'react-router-dom'
import { Loading } from '@/components/Loading'

export const AuthPage = ({ user }: { user?: User }) => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [isSignUp, setIsSignUp] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleMethodChange = () => {
		setIsSignUp(!isSignUp)
	}

	const handleAuth: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		if (!email || !password) return

		setIsLoading(true)
		if (isSignUp) {
			createUserWithEmailAndPassword(auth, email, password)
				.then(userCredential => {
					const user = userCredential.user
					console.log('created and authenticated as user:', user)
					navigate('/')
				})
				.catch((error: FirebaseError) => {
					console.log(error.code, error.message)
				})
				.finally(() => setIsLoading(false))
		} else {
			signInWithEmailAndPassword(auth, email, password)
				.then(userCredential => {
					const user = userCredential.user
					console.log('authenticated as user:', user)
					navigate('/')
				})
				.catch((error: FirebaseError) => {
					console.log(error.code, error.message)
				})
				.finally(() => setIsLoading(false))
		}
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
					onSubmit={handleAuth}
					className='flex flex-col gap-4 items-center rounded-md bg-background px-4 py-6 w-80 h-80 justify-center'
				>
					<span className='text-xl font-semibold'>
						{isSignUp ? 'Sign Up' : 'Login'}
					</span>
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
					<Button
						type='submit'
						className='w-full'
						disabled={isLoading}
					>
						{isLoading && (
							<Loading className='mr-2 text-primary-foreground size-5' />
						)}
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
