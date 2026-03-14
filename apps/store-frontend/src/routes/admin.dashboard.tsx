import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/store/auth.store";
import { ShoppingBag, Package, Users, Tag } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
	component: AdminDashboardPage,
});

function AdminDashboardPage() {
	const { session } = useAuth();

	const stats = [
		{ label: "Products", icon: Package, link: "/admin/products", color: "text-blue-500", bg: "bg-blue-50" },
		{ label: "Categories", icon: Tag, link: "/admin/categories", color: "text-purple-500", bg: "bg-purple-50" },
		{ label: "Orders", icon: ShoppingBag, link: "/admin/orders", color: "text-orange-500", bg: "bg-orange-50" },
		{ label: "Users", icon: Users, link: "/admin/users", color: "text-green-500", bg: "bg-green-50" },
	];

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">
					Welcome back, {session?.name || "Admin"}!
				</h1>
				<p className="text-muted-foreground mt-1">
					Here's what's happening with your store today.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Link
						key={stat.label}
						to={stat.link as any}
						className="group rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
					>
						<div className="flex items-center justify-between space-x-4">
							<div className={`p-3 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
								<stat.icon className="h-6 w-6" />
							</div>
							<div className="text-right">
								<p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
								<p className="text-2xl font-bold text-gray-900">Manage</p>
							</div>
						</div>
					</Link>
				))}
			</div>

			<div className="rounded-xl border bg-gray-50/50 p-8 text-center">
				<div className="max-w-md mx-auto space-y-3">
					<h3 className="text-lg font-semibold">Ready to scale?</h3>
					<p className="text-sm text-muted-foreground">
						The admin panel is now fully configured with product management, 
						inventory tracking, and customer data management capabilities.
					</p>
				</div>
			</div>
		</div>
	);
}
