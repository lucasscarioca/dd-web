import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useEffect, useState } from 'react'
import { Router } from './Router'
import { Layout } from './Layout'
import { Loading } from './components/Loading'

export default function App() {
	const [user, setUser] = useState<User>()
	const [isFetching, setIsFetching] = useState(true)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setUser(user ?? undefined)
			setIsFetching(false)
		})
		return () => unsubscribe()
	}, [])

	return (
		<Layout>
			{isFetching ? (
				<Layout>
					<Loading />
				</Layout>
			) : (
				<Router user={user} />
			)}
		</Layout>
	)
}
