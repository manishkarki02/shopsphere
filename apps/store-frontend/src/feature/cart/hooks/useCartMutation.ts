import { toast } from "sonner";
import { useCustomMutation } from "@/common/hooks/useCustomMutation";
import { useAuth } from "@/store/auth.store";
import {
	addAllToCartApi,
	addToCartApi,
	deleteCartApi,
	updateCartApi,
} from "../cart.service";
import { useCartStore } from "../store/cart.store";

export function useAddToCart() {
	const { isAuthenticated } = useAuth();
	const addToCartLocal = useCartStore((state) => state.addToCart);

	return useCustomMutation({
		api: addToCartApi,
		onSuccess: (data) => {
			// If we want to keep them in sync, we could refetch or update local
			// For now, let's just toast
		},
	});
}

export function useUpdateCart() {
	return useCustomMutation({
		api: ({ id, body }: { id: string; body: any }) => updateCartApi(id, body),
	});
}

export function useDeleteCart() {
	return useCustomMutation({
		api: deleteCartApi,
	});
}

export function useAddAllToCart() {
	return useCustomMutation({
		api: addAllToCartApi,
		success: "All items moved to cart",
	});
}
