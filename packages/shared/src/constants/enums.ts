export const SORTING_TYPE = {
    asc: "asc",
    desc: "desc",
} as const;
export type SORTING_TYPE = (typeof SORTING_TYPE)[keyof typeof SORTING_TYPE];

export const Roles = {
	ADMIN: "ADMIN",
    STAFF: "STAFF",
	CUSTOMER: "CUSTOMER",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
