import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
	const navigate = useNavigate();

	// TODO: Replace with Zustand store auth state
	const user = null; // { firstName: "Admin", lastName: "User" }

	// TODO: Replace with Zustand store lengths
	const cartLength = 0;
	const wishlistLength = 0;

	const handleLogout = () => {
		// TODO: implement logout
		navigate({ to: "/" });
	};

	const NavLinks = () => (
		<>
			<Link
				to="/"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				Home
			</Link>
			<Link
				to="/contact"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				Contact
			</Link>
			<Link
				to="/about"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				About
			</Link>
			{!user && (
				<>
					<Link
						to="/auth/login"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Sign In
					</Link>
					<Link
						to="/auth/login"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Sign Up
					</Link>
				</>
			)}
		</>
	);

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-6 md:gap-10">
					<Link to="/" className="flex items-center space-x-2">
						<span className="inline-block font-bold text-xl uppercase tracking-wider">
							Hamro <span className="text-primary">Store</span>
						</span>
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden md:flex gap-6">
						<NavLinks />
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<Link to="/cart">
						<Button variant="ghost" size="icon" className="relative">
							<ShoppingCart className="h-5 w-5" />
							{cartLength > 0 && (
								<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
									{cartLength}
								</span>
							)}
						</Button>
					</Link>

					<Link to="/wishlist">
						<Button variant="ghost" size="icon" className="relative">
							<Heart className="h-5 w-5" />
							{wishlistLength > 0 && (
								<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
									{wishlistLength}
								</span>
							)}
						</Button>
					</Link>

					{user && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-full">
									<User className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>
									Hello, <br />
									<span className="font-normal text-muted-foreground">
										{user.firstName} {user.lastName}
									</span>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link to="/user/account" className="w-full cursor-pointer">
										My Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link to="/user/edit" className="w-full cursor-pointer">
										Edit Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className="text-destructive focus:text-destructive cursor-pointer"
								>
									<LogOut className="mr-2 h-4 w-4" />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}

					{/* Mobile Menu */}
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-[300px] sm:w-[400px]">
							<nav className="flex flex-col gap-4 mt-8">
								<NavLinks />
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
