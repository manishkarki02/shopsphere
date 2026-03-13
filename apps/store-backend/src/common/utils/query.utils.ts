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

export async function applyQueryFeatures<T>(
    model: Model<T>,
    filter: FilterQuery<T>,
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
        filter = { ...filter, $or: searchConditions } as FilterQuery<T>;
    }

    // Build sort
    const sort: Record<string, SortOrder> = {};
    if (options.sortBy) {
        sort[options.sortBy] = options.sortOrder === "desc" ? -1 : 1;
    } else {
        sort.createdAt = -1; // Default: newest first
    }

    const [data, totalRecords] = await Promise.all([
        model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
        model.countDocuments(filter),
    ]);

    return {
        data,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
    };
}
