import { User } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({
	children,
	user,
}: {
	children: React.ReactNode
	user?: User
}) => {
	return user ? children : <Navigate to={'/auth'} />
}
