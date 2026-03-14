import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/feature/auth/page";

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
});
