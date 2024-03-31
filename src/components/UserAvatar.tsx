import { UserRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export const UserAvatar = ({ url }: { url?: string | null }) => {
	return (
		<Avatar>
			<AvatarImage src={url || ''} alt='Avatar' />
			<AvatarFallback className='bg-primary'>
				<UserRound />
			</AvatarFallback>
		</Avatar>
	)
}
