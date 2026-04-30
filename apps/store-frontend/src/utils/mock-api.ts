import type { AxiosInstance } from "axios";

// Helper to delay the response to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data
const MOCK_DB = {
	users: [
		{ _id: "u1", name: "Admin Mock", email: "admin@mock.com", role: "ADMIN", isVerified: true },
		{ _id: "u2", firstName: "Jane", lastName: "Smith", email: "jane@example.com", role: "CUSTOMER", isVerified: true },
		{ _id: "u3", name: "Bob Staff", email: "bob@staff.com", role: "STAFF", isVerified: true },
	],
	products: [
		{
			_id: "p1", productName: "Mock Minimalist Watch", description: "A sleek, minimalist watch.",
			price: 199.99, category: "Accessories", stockQuantity: 15, isActive: true,
			images: ["https://placehold.co/400x400/png?text=Watch", "https://placehold.co/400x400/png?text=Watch+2"],
			rating: 4.5, features: [{ key: "Water Resistance", value: "50m" }, { key: "Material", value: "Stainless Steel" }],
			specifications: { weight: "50g", dimensions: "40mm x 40mm x 8mm" }
		},
		{
			_id: "p2", productName: "Mock Wireless Earbuds", description: "High quality wireless earbuds with noise cancellation.",
			price: 149.99, category: "Electronics", stockQuantity: 50, isActive: true,
			images: ["https://placehold.co/400x400/png?text=Earbuds"],
			rating: 4.8, features: [{ key: "Battery Life", value: "24h" }],
			specifications: { weight: "15g", connectivity: "Bluetooth 5.3" }
		},
		{
			_id: "p3", productName: "Mock Ergonomic Chair", description: "Comfortable ergonomic office chair.",
			price: 299.99, category: "Furniture", stockQuantity: 5, isActive: true,
			images: ["https://placehold.co/400x400/png?text=Chair"],
			rating: 4.2, features: [{ key: "Adjustable", value: "Yes" }],
			specifications: { weight: "15kg", material: "Mesh & Plastic" }
		},
	],
	categories: [
		{ _id: "c1", name: "Accessories", description: "Timeless pieces.", isActive: true, icon: "Watch", productCount: 1 },
		{ _id: "c2", name: "Electronics", description: "Gadgets and tech.", isActive: true, icon: "Laptop", productCount: 1 },
		{ _id: "c3", name: "Furniture", description: "Home and office.", isActive: true, icon: "Sofa", productCount: 1 },
	],
	orders: [
		{
			_id: "o1", userId: "u2", status: "PENDING", totalAmount: 349.98,
			items: [
				{ productId: "p1", productName: "Mock Minimalist Watch", price: 199.99, quantity: 1 },
				{ productId: "p2", productName: "Mock Wireless Earbuds", price: 149.99, quantity: 1 }
			],
			createdAt: new Date().toISOString()
		},
		{
			_id: "o2", userId: "u1", status: "DELIVERED", totalAmount: 299.99,
			items: [
				{ productId: "p3", productName: "Mock Ergonomic Chair", price: 299.99, quantity: 1 }
			],
			createdAt: new Date(Date.now() - 86400000).toISOString()
		}
	],
	dashboard: {
		overview: {
			totalRevenue: 15430.50,
			revenueGrowth: 12.5,
			totalOrders: 142,
			ordersGrowth: 5.2,
			activeCustomers: 89,
			customersGrowth: -2.1,
			totalProducts: 45,
			productsGrowth: 0,
		},
		revenueData: [
			{ date: "Mon", revenue: 1200 }, { date: "Tue", revenue: 1500 },
			{ date: "Wed", revenue: 1100 }, { date: "Thu", revenue: 1800 },
			{ date: "Fri", revenue: 2200 }, { date: "Sat", revenue: 2500 }, { date: "Sun", revenue: 2100 }
		],
		recentOrders: []
	}
};

export function setupMockApi(api: AxiosInstance) {
	// Override the axios adapter so it never reaches the network
	api.defaults.adapter = async (config) => {
		const fullUrl = (config.baseURL || "") + (config.url || "");
		const url = fullUrl.toLowerCase();
		
		await delay(400); // Simulate network delay

		let responseData: any = { data: null, message: "Success", code: 200 };

		try {
			// Strip query params for easier matching
			const urlWithoutQuery = url.split("?")[0];

			// 1. Auth & Users
			if (urlWithoutQuery.includes("/auth/me") || urlWithoutQuery.includes("/user/profile")) {
				responseData.data = MOCK_DB.users[0];
			} else if (urlWithoutQuery.includes("/users")) {
				responseData.data = MOCK_DB.users;
			}

			// 2. Product dashboard specifics
			else if (urlWithoutQuery.includes("/best-selling")) {
				responseData.data = MOCK_DB.products;
			} else if (urlWithoutQuery.includes("/new-arrivals")) {
				responseData.data = MOCK_DB.products;
			} else if (urlWithoutQuery.includes("/flash-sales")) {
				responseData.data = MOCK_DB.products;
			}
			
			// 3. Products
			else if (urlWithoutQuery.includes("/products")) {
				const segments = urlWithoutQuery.split("/");
				const lastSegment = segments[segments.length - 1];
				
				if (lastSegment && lastSegment.length > 5 && lastSegment !== "products") {
					// Single product detail
					const product = MOCK_DB.products.find(p => p._id === lastSegment);
					responseData.data = product || MOCK_DB.products[0];
				} else {
					// List products
					responseData.data = { products: MOCK_DB.products, total: MOCK_DB.products.length };
				}
			}

			// 3. Categories
			else if (urlWithoutQuery.includes("/categor")) {
				responseData.data = MOCK_DB.categories;
			}
			
			// 4. Orders
			else if (urlWithoutQuery.includes("/order")) {
				responseData.data = { orders: MOCK_DB.orders, total: MOCK_DB.orders.length };
			}

			// 5. Dashboard
			else if (urlWithoutQuery.includes("/dashboard")) {
				responseData.data = {
					...MOCK_DB.dashboard,
					recentOrders: MOCK_DB.orders
				};
			}

			// Fallback
			else {
				responseData.data = [];
			}

			// Resolve identically to what XMLHttpRequest adapter would return
			return {
				data: responseData,
				status: 200,
				statusText: "OK",
				headers: {},
				config
			} as any;
		} catch (e) {
			console.error("Mock Server Error:", e);
			throw e;
		}
	};
}
