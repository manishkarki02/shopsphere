import type { QueryClientConfig } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
			refetchOnMount: false,
			retry(failureCount, error: unknown) {
				if (failureCount > 1) {
					const err = error as {
						response?: { data?: { message?: string } };
						message?: string;
					};
					toast.error(
						err?.response?.data?.message ||
							err?.message ||
							"Something went wrong",
					);
					return false;
				}
				return true;
			},
			staleTime: 1000 * 60 * 2, // 2 minutes
		},
	},
};
