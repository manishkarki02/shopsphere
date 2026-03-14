import type { AxiosError, AxiosResponse } from "axios";

export interface ApiResponse<T> {
	code: number;
	message: string;
	data: T;
}

export type ApiAxiosResponse<T> = AxiosResponse<ApiResponse<T>>;
export type ApiAxiosErrorResponse = AxiosError<{
	code: number;
	message: string;
	error?: unknown;
}>;
