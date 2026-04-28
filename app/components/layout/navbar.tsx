import Link from 'next/link'

export default function Navbar() {
	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/auctions', label: 'Auctions' },
		{ href: '/create', label: 'Create' },
		{ href: '/example', label: 'Example' },
	]

	return (
		<nav
			className="w-full border-b"
			style={{ background: 'var(--background)', color: 'var(--foreground)' }}
		>
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between h-14">
					<div className="flex items-center space-x-4">
						<Link href="/" className="font-semibold text-base">
							Auction
						</Link>

						<div className="hidden md:flex items-center space-x-2">
							{links.map((l) => (
								<Link
									key={l.href}
									href={l.href}
									className="text-sm px-2 py-1"
									style={{ color: 'var(--foreground)' }}
								>
									{l.label}
								</Link>
							))}
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<Link href="/login" className="text-sm px-2 py-1" style={{ color: 'var(--foreground)' }}>
							Sign in
						</Link>
						<Link
							href="/signup"
							className="text-sm px-3 py-1 border"
							style={{ color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
						>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}
