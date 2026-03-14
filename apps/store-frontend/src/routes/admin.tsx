import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut, Settings } from "lucide-react";
import type { AuthContext } from "@/store/auth.store";

export const Route = createFileRoute("/admin")({
	beforeLoad: ({ context }) => {
		const auth = (context as { auth: AuthContext }).auth;
		if (!auth.isAuthenticated) {
			throw redirect({ to: "/auth/login", search: { redirect: "/admin" } });
		}
		const role = auth.session?.role;
		if (role !== "STAFF" && role !== "ADMIN") {
			throw redirect({ to: "/" });
		}
	},
	component: AdminLayout,
});

function AdminLayout() {
	return (
		<div className="flex h-screen w-full overflow-hidden bg-gray-100">
			{/* Sidebar */}
			<aside className="w-64 flex-shrink-0 bg-white border-r">
				<div className="flex h-16 items-center px-6 border-b">
					<h2 className="font-bold text-lg">Admin Panel</h2>
				</div>
				<nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
					<Link
						to="/admin/dashboard"
						className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 [&.active]:bg-gray-100"
					>
						<LayoutDashboard className="h-5 w-5 text-gray-400" />
						Dashboard
					</Link>
					<Link
						to="/admin/products"
						className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 [&.active]:bg-gray-100"
					>
						<Package className="h-5 w-5 text-gray-400" />
						Products
					</Link>
					<Link
						to="/admin/categories"
						className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 [&.active]:bg-gray-100"
					>
						<Settings className="h-5 w-5 text-gray-400" />
						Categories
					</Link>
					<Link
						to="/admin/orders"
						className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 [&.active]:bg-gray-100"
					>
						<ShoppingBag className="h-5 w-5 text-gray-400" />
						Orders
					</Link>
					<Link
						to="/admin/users"
						className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 [&.active]:bg-gray-100"
					>
						<Users className="h-5 w-5 text-gray-400" />
						Users & Staff
					</Link>
				</nav>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				<header className="h-16 flex-shrink-0 bg-white border-b flex items-center justify-end px-6">
					<button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
						<LogOut className="h-4 w-4" />
						Sign Out
					</button>
				</header>
				<main className="flex-1 overflow-y-auto p-6 bg-gray-50">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
