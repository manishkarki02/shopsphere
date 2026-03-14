import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

interface IQueryParams<TData, TError = unknown> {
	queryKey: unknown[];
	queryFn: () => Promise<TData>;
	options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">;
}

export function useCustomQuery<TData, TError = unknown>({
	queryKey,
	queryFn,
	options,
}: IQueryParams<TData, TError>) {
	return useQuery<TData, TError, TData>({
		queryKey,
		queryFn,
		...options,
	});
}
