import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us")({
	component: () => <div>Contact</div>,
});
