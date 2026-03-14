import { Link } from "@tanstack/react-router";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerAccountLinks = [
	{ id: 1, title: "My Account", path: "/user/account" },
	{ id: 2, title: "Login / Register", path: "/auth" },
	{ id: 3, title: "Cart", path: "/cart" },
	{ id: 4, title: "Wishlist", path: "/wishlist" },
	{ id: 5, title: "Shop", path: "/" },
];

const quickLinks = [
	{ id: 1, title: "Privacy Policy", path: "/privacy-policy" },
	{ id: 2, title: "Terms of Use", path: "/terms-of-use" },
	{ id: 3, title: "FAQ", path: "/faq" },
	{ id: 4, title: "Contact", path: "/contact" },
];

export default function Footer() {
	return (
		<footer className="w-full bg-black text-white pt-16 pb-6">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
					{/* Subscribe Section */}
					<div className="flex flex-col space-y-4">
						<h3 className="text-xl font-bold uppercase tracking-wider mb-2">
							Hamro Store
						</h3>
						<p className="text-sm text-gray-300">Subscribe</p>
						<p className="text-sm text-gray-300">
							Get 10% off your first order
						</p>
						<div className="relative mt-2 flex items-center">
							<Input
								type="text"
								placeholder="Enter your email"
								className="bg-transparent border-gray-600 focus-visible:ring-1 focus-visible:ring-gray-400 pr-10 text-white placeholder:text-gray-500"
							/>
							<Button
								size="icon"
								variant="ghost"
								className="absolute right-0 hover:bg-transparent hover:text-white"
							>
								<SendHorizontal className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Support Section */}
					<div className="flex flex-col space-y-4">
						<h3 className="text-lg font-medium mb-2">Support</h3>
						<p className="text-sm text-gray-300">
							111 Bijayapur, Dharan, Nepal.
						</p>
						<p className="text-sm text-gray-300">hamrostore@gmail.com</p>
						<p className="text-sm text-gray-300">+977-9800000000</p>
					</div>

					{/* Account Section */}
					<div className="flex flex-col space-y-4">
						<h3 className="text-lg font-medium mb-2">Account</h3>
						<ul className="flex flex-col space-y-3">
							{footerAccountLinks.map((link) => (
								<li key={link.id}>
									<Link
										to={link.path}
										className="text-sm text-gray-300 transition-colors hover:text-white"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Quick Links Section */}
					<div className="flex flex-col space-y-4">
						<h3 className="text-lg font-medium mb-2">Quick Link</h3>
						<ul className="flex flex-col space-y-3">
							{quickLinks.map((link) => (
								<li key={link.id}>
									<Link
										to={link.path}
										className="text-sm text-gray-300 transition-colors hover:text-white"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex justify-center border-t border-gray-800 pt-6 mt-8 m-auto">
					<p className="text-sm text-gray-500">
						&copy; {new Date().getFullYear()} Hamro Store. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
