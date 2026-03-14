import { Link } from "@tanstack/react-router";
import type { ICategory } from "../category.service";

export function CategoryCard({ id, name, icon }: ICategory) {
	return (
		<Link
			to="/products"
			search={{ category: name }}
			className="group flex flex-col items-center justify-center gap-3 rounded-md border bg-background p-6 transition-colors hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm"
		>
			<div className="flex text-4xl">
				{/* Since icon is dynamic, a text or img tag works based on the backend returning an emoji/SVG path. */}
				{icon ? (
					<span>{icon}</span>
				) : (
					<div className="h-10 w-10 bg-muted rounded-md" />
				)}
			</div>
			<span className="text-sm font-medium">{name}</span>
		</Link>
	);
}
