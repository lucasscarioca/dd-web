import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

export const Loading = ({ className }: { className?: string }) => {
	return (
		<LoaderCircle
			className={cn('animate-spin text-primary size-12', className)}
		/>
	)
}
