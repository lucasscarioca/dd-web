import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedLayout } from './components/ProtectedLayout'
import { HomePage } from './pages/Home'
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'
import { ProfilePage } from './pages/Profile'
import { PacientsPage } from './pages/Pacients'
import { MessagesPage } from './pages/Messages'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					path='/'
					element={<ProtectedLayout page={<HomePage />} />}
				/>
				<Route
					path='/profile'
					element={<ProtectedLayout page={<ProfilePage />} />}
				/>
				<Route
					path='/pacients'
					element={<ProtectedLayout page={<PacientsPage />} />}
				/>
				<Route
					path='/messages'
					element={<ProtectedLayout page={<MessagesPage />} />}
				/>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	)
}
