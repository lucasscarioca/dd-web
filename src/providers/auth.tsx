import { Loading } from '@/components/Loading'
import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'

type AuthProviderState = {
	user: User | null
}
const initialState: AuthProviderState = {
	user: null,
}
export const AuthProviderContext =
	createContext<AuthProviderState>(initialState)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [isFetching, setIsFetching] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setUser(user)
			setIsFetching(false)
		})

		return () => unsubscribe()
	}, [])

	const value = {
		user,
	}
	return (
		<AuthProviderContext.Provider value={value}>
			{isFetching ? (
				<Loading className='absolute top-1/2 left-1/2' />
			) : (
				children
			)}
		</AuthProviderContext.Provider>
	)
}
