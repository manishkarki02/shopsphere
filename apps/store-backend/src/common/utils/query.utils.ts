import { SORTING_ORDER } from "@shop-sphere/shared";
import type { FilterQuery, Model, SortOrder } from "mongoose";

interface QueryOptions {
	page?: number;
	limit?: number;
	search?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

interface SearchConfig {
	fieldsToSearch?: string[];
}

export async function applyQueryFeatures<ModelType, ResponseType = ModelType>(
	model: Model<ModelType>,
	filter: FilterQuery<ModelType>,
	options: QueryOptions,
	config?: SearchConfig,
) {
	const page = options.page || 1;
	const limit = options.limit || 10;
	const skip = (page - 1) * limit;

	// Build search filter
	if (options.search && config?.fieldsToSearch?.length) {
		const searchRegex = new RegExp(options.search, "i");
		const searchConditions = config.fieldsToSearch.map((field) => ({
			[field]: searchRegex,
		}));
		filter = { ...filter, $or: searchConditions } as FilterQuery<ModelType>;
	}

	// Build sort
	const sort: Record<string, SortOrder> = {};
	if (options.sortBy) {
		sort[options.sortBy] = options.sortOrder === SORTING_ORDER.desc ? -1 : 1;
	} else {
		sort.createdAt = -1;
	}

	const [data, totalRecords] = await Promise.all([
		model.find(filter).sort(sort).skip(skip).limit(limit).lean<ResponseType>(),
		model.countDocuments(filter),
	]);

	return {
		data,
		totalRecords,
		totalPages: Math.ceil(totalRecords / limit),
		currentPage: page,
	};
}
