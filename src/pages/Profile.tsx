import { Loading } from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { updateUser } from '@/lib/firebase'
import { SquarePen, UserRound, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ProfilePage = () => {
	const { user } = useAuth()
	const [isEditting, setIsEditting] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [avatarUrl, setAvatarUrl] = useState('')
	const [avatar, setAvatar] = useState<File>()
	const [name, setName] = useState('')

	useEffect(() => {
		setName(user?.displayName || '')
		setAvatarUrl(user?.photoURL || '')
	}, [user])

	const handleUpdateProfile: React.FormEventHandler<
		HTMLFormElement
	> = event => {
		event.preventDefault()

		if (
			!name ||
			(name === user?.displayName && avatarUrl === user?.photoURL)
		) {
			setIsEditting(false)
			return
		}
		setIsLoading(true)
		updateUser(name, avatar).finally(() => {
			setIsLoading(false)
			setIsEditting(false)
		})
	}

	const handleLoadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return
		setAvatar(event.target.files[0])
		setAvatarUrl(URL.createObjectURL(event.target.files[0]))
	}

	return (
		<div className='pt-16 flex flex-col items-center gap-4'>
			<div className='flex items-center justify-between w-2/3 lg:w-1/3 p-2'>
				<h1 className='text-2xl font-semibold'>Profile</h1>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => setIsEditting(!isEditting)}
				>
					{isEditting ? (
						<X className='size-6 text-destructive' />
					) : (
						<SquarePen className='size-6' />
					)}
				</Button>
			</div>
			<form
				onSubmit={handleUpdateProfile}
				className='pt-8 flex flex-col gap-4 w-2/3 lg:w-1/3 bg-background rounded-md p-2'
			>
				<fieldset className='flex items-center'>
					<div className='basis-1/4 flex justify-center'>
						{avatarUrl ? (
							<img
								src={avatarUrl}
								id='avatar'
								alt='avatar'
								className='basis-1/4 rounded-full size-16'
							/>
						) : (
							<UserRound className='size-16 bg-primary text-primary-foreground rounded-full' />
						)}
					</div>
					<div className='basis-3/4 flex flex-col'>
						<label htmlFor='avatar'>Picture</label>
						<Input
							id='avatar'
							type='file'
							disabled={!isEditting}
							className='file:text-muted-foreground text-foreground'
							onChange={handleLoadAvatar}
						/>
					</div>
				</fieldset>
				<fieldset className='flex flex-col'>
					<label htmlFor='name'>Name</label>
					<Input
						type='text'
						id='name'
						required
						disabled={!isEditting}
						value={name}
						placeholder='Name'
						onChange={event => setName(event.target.value)}
					/>
				</fieldset>
				<Button
					type='submit'
					disabled={!isEditting || isLoading}
					className='w-full'
				>
					{isLoading && (
						<Loading className='mr-2 text-primary-foreground size-5' />
					)}
					Update
				</Button>
			</form>
		</div>
	)
}
