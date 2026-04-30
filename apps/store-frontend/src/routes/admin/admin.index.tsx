import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/admin/")({
	beforeLoad: () => {
		throw redirect({ to: "/admin/dashboard" });
	},
});
