import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Heart, Settings, User } from "lucide-react";

export const Route = createFileRoute("/user")({
	component: UserLayout,
});

function UserLayout() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
				<Link to="/" className="hover:text-foreground">
					Home
				</Link>
				<span>/</span>
				<span className="text-foreground">My Account</span>
			</div>

			<div className="flex flex-col md:flex-row gap-8">
				<aside className="w-full md:w-64 shrink-0">
					<div className="font-semibold mb-4">Manage My Account</div>
					<nav className="flex flex-col gap-2 pl-4 mb-6">
						<Link
							to="/user"
							className="hover:text-destructive text-muted-foreground [&.active]:text-destructive"
						>
							My Profile
						</Link>
						{/* 
                  Add other tabs here like Address / Payment Options etc.
                */}
					</nav>

					<div className="font-semibold mb-4 mt-8">My Orders</div>
					<nav className="flex flex-col gap-2 pl-4 mb-6">
						<Link
							to="/user"
							className="hover:text-destructive text-muted-foreground [&.active]:text-destructive"
						>
							My Returns
						</Link>
						<Link
							to="/user"
							className="hover:text-destructive text-muted-foreground [&.active]:text-destructive"
						>
							My Cancellations
						</Link>
					</nav>

					<div className="font-semibold mb-4 mt-8">
						<Link
							to="/wishlist"
							className="hover:text-destructive text-foreground [&.active]:text-destructive"
						>
							My Wishlist
						</Link>
					</div>
				</aside>

				<main className="flex-1 bg-card rounded-md border p-6 md:p-10 shadow-sm">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
