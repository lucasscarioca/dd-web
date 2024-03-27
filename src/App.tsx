import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'

export default function App() {
	return (
		<div className='h-screen w-screen bg-background text-foreground grid place-content-center'>
			<BrowserRouter>
				<Routes>
					<Route index path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}
