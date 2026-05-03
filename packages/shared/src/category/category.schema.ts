import z from "zod/v4";

export const addCategoryBodySchema = z.object({
	categoryName: z
		.string({
			error: (issue) =>
				issue.input === undefined
					? "categoryName is required."
					: "invalid category name",
		})
		.min(1, "categoryName is required."),
	description: z
		.string({
			error: (issue) =>
				issue.input === undefined
					? "description is required."
					: "invalid description",
		})
		.min(1, "description is required."),
});

export const updateCategoryBodySchema = z.object({
	categoryName: z
		.string({
			error: (issue) =>
				issue.input === undefined
					? "categoryName is required."
					: "invalid category name",
		})
		.optional(),
	description: z
		.string({
			error: (issue) =>
				issue.input === undefined
					? "description is required."
					: "invalid description",
		})
		.optional(),
});
