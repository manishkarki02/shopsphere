import { Outlet } from "@tanstack/react-router";

export default function BlankLayout() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<Outlet />
		</div>
	);
}
