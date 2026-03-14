import { createRootRouteWithContext, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer from "@/common/components/Footer";
import Navbar from "@/common/components/Navbar";
import type { RouterContext } from "@/configs/router-provider";

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => {
		const location = useLocation();
		const isAdminRoute = location.pathname.startsWith("/admin");

		return (
			<div className="flex min-h-screen flex-col">
				{!isAdminRoute && <Navbar />}
				<main className="flex-1">
					<Outlet />
				</main>
				{!isAdminRoute && <Footer />}
				<TanStackRouterDevtools />
			</div>
		);
	},
});
