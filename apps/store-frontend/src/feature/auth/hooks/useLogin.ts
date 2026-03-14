import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../auth.service";
import type { ILoginRequest } from "../auth.type";

export function useLogin() {
	return useMutation({
		mutationFn: (payload: ILoginRequest) => loginUser(payload),
	});
}
