import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiAxiosErrorResponse } from "../types/api-response.type";

interface ApiErrorResponse {
	message: string | string[];
	code?: number;
}

interface IMutateParams<Param, ReturnType> {
	api: (param: Param) => Promise<ReturnType>;
	success?: string;
	error?: string;
	onSuccess?: (data: ReturnType) => void;
	onError?: (err: ApiErrorResponse) => void;
}

export function useCustomMutation<Param, ReturnType>({
	api,
	success,
	error,
	onSuccess,
	onError,
}: IMutateParams<Param, ReturnType>) {
	return useMutation({
		mutationFn: async (param: Param) => api(param),
		onSuccess: (data) => {
			if (onSuccess) onSuccess(data);
			if (success) toast.success(success);
		},
		onError: (err: ApiAxiosErrorResponse) => {
			if (onError) onError((err.response?.data as ApiErrorResponse) ?? err);
			if (err.response?.data?.message) {
				if (Array.isArray(err.response.data.message))
					err.response.data.message.map((message) => {
						toast.error(message);
					});
				else toast.error(err.response.data.message);

				return;
			}
			if (error) toast.error(error);
		},
	});
}
