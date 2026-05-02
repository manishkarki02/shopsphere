export const SORTING_ORDER = {
	asc: "asc",
	desc: "desc",
} as const;
export type SORTING_ORDER = (typeof SORTING_ORDER)[keyof typeof SORTING_ORDER];

export const Roles = {
	ADMIN: "ADMIN",
	STAFF: "STAFF",
	CUSTOMER: "CUSTOMER",
} as const;
export type Role = (typeof Roles)[keyof typeof Roles];
