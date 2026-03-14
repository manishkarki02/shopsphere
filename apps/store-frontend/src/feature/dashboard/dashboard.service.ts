import type { ApiResponse } from "@/common/types/api-response.type";
import { METHODS } from "@/enums/request-methods.enum";
import createApi from "@/utils/axios";
import type { IDashboardResponse } from "./dashboard.type";

const dashboardApi = createApi("/dashboard");

export const getDashboardData = async () => {
	const { data }: { data: ApiResponse<IDashboardResponse> } =
		await dashboardApi({
			method: METHODS.GET,
		});
	return data;
};
