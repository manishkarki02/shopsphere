import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
	return (
		<div className="p-6">
			<h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Total Users</CardTitle>
						<CardDescription>Active users on the platform</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">0</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Total Orders</CardTitle>
						<CardDescription>Orders processed</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">0</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Total Revenue</CardTitle>
						<CardDescription>Revenue generated</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">$0.00</p>
					</CardContent>
				</Card>
			</div>

			<div className="mt-6">
				<Button
					onClick={() =>
						toast.success("Welcome to the Dashboard!", {
							description: "Sonner notifications are working correctly.",
						})
					}
				>
					Test Notification
				</Button>
			</div>
		</div>
	);
}
