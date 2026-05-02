import mongoose from "mongoose";
import z from "zod/v4";

// Validate MongoDB ObjectId
export const objectIdSchema = z
	.string()
	.refine((val) => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid ObjectId",
	});
