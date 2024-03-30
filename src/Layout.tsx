import { ThemeProvider } from './providers/theme'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<div className='h-screen w-screen bg-background text-foreground'>
				{children}
			</div>
		</ThemeProvider>
	)
}
