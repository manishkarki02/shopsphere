export interface ICartItem {
	productId: string;
	quantity: number;
}

export interface ICartResponse {
	_id: string;
	userId: string;
	items: ICartItem[];
	createdAt: string;
	updatedAt: string;
}
