import { createFileRoute } from "@tanstack/react-router";
import { AdminUserList } from "@/feature/user/components/admin/AdminUserList";

export const Route = createFileRoute("/admin/users")({
	component: AdminUserList,
});
