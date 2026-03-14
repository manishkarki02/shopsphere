import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ENV } from "@/configs/environment";

const createApi = (path: string) => {
	const api = axios.create({
		baseURL: `${ENV.VITE_API_BASE_URL}/api${path}`,
		timeout: 10000,
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	});

	api.interceptors.request.use((config: InternalAxiosRequestConfig) => config);

	api.interceptors.response.use(
		null,
		(error: AxiosError<{ message: string }>) => {
			if (error.code === "ERR_NETWORK")
				throw new AxiosError("Server is unreachable");
			if (error.code === "ECONNABORTED")
				throw new AxiosError("Request timeout");
			if (Number(error.response?.status) >= 500) {
				throw new AxiosError(
					error.response?.data?.message || "Something went wrong",
				);
			}
			if (error.response?.status === 401) {
				localStorage.removeItem("auth.session");
				document.location.href = "/";
			}
			throw error;
		},
	);

	return api;
};

export default createApi;
