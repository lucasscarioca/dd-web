import { Router } from './Router'
import { Layout } from './Layout'
import { AuthProvider } from './providers/auth'

export default function App() {
	return (
		<Layout>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</Layout>
	)
}
