import { Outlet } from "@tanstack/react-router";

export default function DashboardLayout() {
	return (
		<div className="flex min-h-screen bg-background">
			{/* Sidebar */}
			<aside className="hidden w-64 border-r border-border bg-card lg:block">
				<div className="flex h-16 items-center border-b border-border px-6">
					<h1 className="text-lg font-semibold">Store Admin</h1>
				</div>
				<nav className="space-y-1 p-4">
					<a
						href="/dashboard"
						className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
					>
						Dashboard
					</a>
				</nav>
			</aside>

			{/* Main Content */}
			<div className="flex flex-1 flex-col">
				{/* Header */}
				<header className="flex h-16 items-center border-b border-border bg-card px-6">
					<h2 className="text-lg font-semibold">Dashboard</h2>
				</header>

				{/* Page Content */}
				<main className="flex-1 p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
