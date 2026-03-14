import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_guard")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: "/auth/login" });
		}
	},
	component: GuardLayout,
});

function GuardLayout() {
	return <Outlet />;
}
