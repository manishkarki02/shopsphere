import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { QueryKeyString } from "@/enums/query-key-string.enum";
import { getDashboardData } from "@/feature/dashboard/dashboard.service";
import DashboardPage from "@/feature/dashboard/page";

// Define query options (shared between loader and component)
export const dashboardQueryOptions = queryOptions({
	queryKey: [QueryKeyString.GET_DASHBOARD],
	queryFn: getDashboardData,
});

export const Route = createFileRoute("/_guard/dashboard/")({
	// Loader uses queryClient from router context to prefetch data
	loader: ({ context: { queryClient } }) => {
		return queryClient.ensureQueryData(dashboardQueryOptions);
	},
	component: DashboardPage,
});
