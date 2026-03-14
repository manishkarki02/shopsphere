export interface IPagination<T> {
	totalRecords: number;
	totalPages: number;
	currentPage: number;
	data: T;
}
