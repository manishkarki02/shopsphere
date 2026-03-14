import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/feature/product/page";

export const Route = createFileRoute("/")({
	component: HomePage,
});
