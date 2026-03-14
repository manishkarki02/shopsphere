import { useQuery } from "@tanstack/react-query";
import { QueryKeyString } from "@/enums/query-key-string.enum";
import { getDashboardData } from "../dashboard.service";

export function useGetDashboard() {
	return useQuery({
		queryKey: [QueryKeyString.GET_DASHBOARD],
		queryFn: getDashboardData,
	});
}
