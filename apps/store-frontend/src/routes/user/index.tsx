import { createFileRoute } from "@tanstack/react-router";
import { ProfileForm } from "@/feature/user/components/ProfileForm";

export const Route = createFileRoute("/user/")({
	component: UserProfilePage,
});

function UserProfilePage() {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-6 text-destructive">
				Edit Your Profile
			</h2>
			<ProfileForm />
		</div>
	);
}
