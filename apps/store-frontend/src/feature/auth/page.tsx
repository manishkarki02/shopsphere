import { useSearch } from "@tanstack/react-router";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

export default function AuthPage() {
	const search = useSearch({ strict: false });
	const isRegister = (search as any)?.type === "register";

	return (
		<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
			{isRegister ? <SignUpForm /> : <LoginForm />}
		</div>
	);
}
