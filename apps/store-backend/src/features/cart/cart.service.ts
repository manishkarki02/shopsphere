import httpStatus from "http-status";
import { ApiError } from "@/common/utils/response.util";
import { Product } from "@/features/product/product.model";
import { Cart } from "./cart.model";
import type {
	AddAllToCartSchema,
	AddCartSchema,
	UpdateCartSchema,
} from "./validation/cart.validation";

export async function addCart(userId: string, body: AddCartSchema) {
	const { id, quantity } = body;

	const foundProduct = await Product.findById(id);
	if (!foundProduct) {
		throw new ApiError(httpStatus.NOT_FOUND, {
			message: `No product in database with id: ${id}`,
		});
	}

	const cartItem = {
		productId: foundProduct.id,
		quantity: quantity || 1,
	};

	const existingCart = await Cart.findOne({ userId });

	if (!existingCart) {
		const cartProduct = await Cart.create({
			userId,
			items: [cartItem],
		});
		return cartProduct;
	}

	const existingCartItem = existingCart.items.find(
		(item) => String(item.productId) === String(id),
	);

	if (existingCartItem) {
		existingCartItem.quantity += 1;
	} else {
		existingCart.items.push(cartItem);
	}

	await existingCart.save();
	return existingCart;
}

export async function addAllToCart(userId: string, body: AddAllToCartSchema) {
	const { productIds } = body;

	let userCart = await Cart.findOne({ userId });

	if (!userCart) {
		userCart = new Cart({ userId, items: [] });
	}

	for (const id of productIds) {
		const foundProduct = await Product.findById(id);
		if (!foundProduct) {
			throw new ApiError(httpStatus.NOT_FOUND, {
				message: `Product with id: ${id} not found`,
			});
		}

		const existingCartItem = userCart.items.find(
			(item) => String(item.productId) === String(id),
		);

		if (existingCartItem) {
			existingCartItem.quantity += 1;
		} else {
			userCart.items.push({ productId: foundProduct._id, quantity: 1 });
		}
	}

	await userCart.save();
	return userCart;
}

export async function updateCart(
	userId: string,
	id: string,
	body: UpdateCartSchema,
) {
	const { updatedItems } = body;

	const userCart = await Cart.findOne({ userId });
	if (!userCart)
		throw new ApiError(httpStatus.NOT_FOUND, { message: "User cart is empty" });

	updatedItems.forEach(({ productId, quantity }) => {
		const existingCartItem = userCart.items.find(
			(item) => String(item.productId) === String(productId),
		);
		if (existingCartItem) existingCartItem.quantity = quantity;
	});

	await userCart.save();
	return userCart;
}

export async function getCarts(userId: string) {
	const userCart = await Cart.findOne({ userId }).populate("items.productId");
	if (!userCart)
		throw new ApiError(httpStatus.NOT_FOUND, { message: "Cart is empty" });

	const productsInCart = userCart.items.map((item) => ({
		product: item.productId,
		quantity: item.quantity,
	}));

	return productsInCart;
}

export async function deleteCart(userId: string, id: string) {
	const userCart = await Cart.findOne({ userId });
	if (!userCart)
		throw new ApiError(httpStatus.NOT_FOUND, { message: "User cart is empty" });

	const productsInCart = await Cart.findOne({ userId, "items.productId": id });
	if (!productsInCart)
		throw new ApiError(httpStatus.NOT_FOUND, {
			message: "This product is not in cart",
		});

	const updatedCart = await Cart.findOneAndUpdate(
		{ userId },
		{ $pull: { items: { productId: id } } },
		{ new: true },
	);

	if (!updatedCart)
		throw new ApiError(httpStatus.NOT_FOUND, { message: "Cart not found" });

	return null;
}
