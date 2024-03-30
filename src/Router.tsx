import { User } from 'firebase/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { HomePage } from './pages/Home'
import { AuthPage } from './pages/Auth'

export const Router = ({ user }: { user?: User }) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					path='/'
					element={
						<ProtectedRoute user={user}>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route path='/auth' element={<AuthPage user={user} />} />
			</Routes>
		</BrowserRouter>
	)
}
