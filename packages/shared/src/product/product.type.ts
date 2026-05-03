export interface IProduct {
	productName: string;
	description: string;
	price: number;
	color: string[];
	discountPercentage: number;
	rating: number;
	category: string;
	images: string[];
	thumbnail: string;
	stockQuantity: number;
	isActive: boolean;
	reviews: string[];
}

export interface IProductResponse extends IProduct {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}
