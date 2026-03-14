import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { queryConfig } from "./query-config";
import RouterProvider from "./router-provider";

const queryClient = new QueryClient(queryConfig);

export default function Providers() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-right" closeButton richColors />
			<RouterProvider queryClient={queryClient} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
