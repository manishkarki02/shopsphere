export interface IWishlistItem {
	productId: string;
}

export interface IWishlistResponse {
	_id: string;
	userId: string;
	items: IWishlistItem[];
	createdAt: Date;
	updatedAt: Date;
}
