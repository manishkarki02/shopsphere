import type { QueryClient } from "@tanstack/react-query";
import {
	createRouter,
	RouterProvider as TanStackRouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { useAuth } from "@/store/auth.store";

// Router context includes both auth and queryClient
export interface RouterContext {
	auth: ReturnType<typeof useAuth>;
	queryClient: QueryClient;
}

const router = createRouter({
	routeTree,
	defaultNotFoundComponent: () => <div>Page Not Found</div>,
	context: {
		auth: undefined!,
		queryClient: undefined!,
	},
});

// Type-safe router registration
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default function RouterProvider({
	queryClient,
}: {
	queryClient: QueryClient;
}) {
	const auth = useAuth();
	return (
		<TanStackRouterProvider router={router} context={{ auth, queryClient }} />
	);
}
