export type PaginationData = {
	totalRecords: number;
	totalPages: number;
	page: number;
	limit: number;
} | null;

export type ApiResponse<T> = {
	success: boolean;
	data: T;
	message?: string;
};
