import { useState } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomQuery } from "@/common/hooks/useCustomQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { METHODS } from "@/enums/request-methods.enum";
import createApi from "@/utils/axios";
import type { ApiResponse } from "@/common/types/api-response.type";

const userApi = createApi("/users");

type UserRole = "CUSTOMER" | "STAFF" | "ADMIN";

interface IUser {
	_id: string;
	firstName?: string;
	lastName?: string;
	name?: string;
	email: string;
	role: UserRole;
	isVerified: boolean;
}

const USER_KEYS = {
	all: ["admin-users"] as const,
	list: () => [...USER_KEYS.all, "list"],
};

const getUsers = async () => {
	const { data }: { data: ApiResponse<{ data: IUser[] }> } = await userApi({
		method: METHODS.GET,
		url: "/",
		params: { limit: 50 },
	});
	return data.data;
};

const createUser = async (userData: any) => {
	const { data }: { data: ApiResponse<IUser> } = await userApi({
		method: METHODS.POST,
		url: "/",
		data: userData,
	});
	return data.data;
};

const updateRole = async (id: string, role: UserRole) => {
	const { data }: { data: ApiResponse<IUser> } = await userApi({
		method: METHODS.PATCH,
		url: `/${id}/role`,
		data: { role },
	});
	return data.data;
};

const blockUser = async (id: string, isBlocked: boolean) => {
	const { data }: { data: ApiResponse<IUser> } = await userApi({
		method: METHODS.PATCH,
		url: `/${id}/block`,
		data: { isBlocked },
	});
	return data.data;
};

const roleColors: Record<UserRole, string> = {
	ADMIN: "bg-red-100 text-red-800 border-red-200",
	STAFF: "bg-blue-100 text-blue-800 border-blue-200",
	CUSTOMER: "bg-green-100 text-green-800 border-green-200",
};

export function AdminUserList() {
	const queryClient = useQueryClient();
	const [blockingId, setBlockingId] = useState<string | null>(null);

	const { data, isLoading } = useCustomQuery({
		queryKey: USER_KEYS.list(),
		queryFn: getUsers,
	});

	const { mutateAsync: createNewUser, isPending: isCreating } = useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.list() });
			toast.success("User created successfully");
		},
		onError: (err: any) => toast.error(err?.response?.data?.message || "Failed to create user"),
	});

	const { mutate: changeRole } = useMutation({
		mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
			updateRole(id, role),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.list() });
			toast.success("Role updated");
		},
		onError: () => toast.error("Failed to update role"),
	});

	const { mutate: toggleBlock, isPending: isToggling } = useMutation({
		mutationFn: ({ id, isBlocked }: { id: string; isBlocked: boolean }) =>
			blockUser(id, isBlocked),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.list() });
			toast.success("User status updated");
			setBlockingId(null);
		},
		onError: () => {
			toast.error("Failed to update user status");
			setBlockingId(null);
		},
	});

	const users: IUser[] = (data as any) || [];

	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
		role: "CUSTOMER" as UserRole,
	});

	const handleCreate = async () => {
		if (!userData.name || !userData.email || !userData.password) {
			toast.error("Please fill all required fields");
			return;
		}
		try {
			await createNewUser(userData);
			setIsCreateOpen(false);
			setUserData({ name: "", email: "", password: "", role: "CUSTOMER" });
		} catch (e) {}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Users & Staff</h1>
					<p className="text-muted-foreground">Manage user accounts and roles</p>
				</div>
				<Button onClick={() => setIsCreateOpen(true)}>
					<PlusCircle className="mr-2 h-4 w-4" />
					Add User / Staff
				</Button>
			</div>

			<div className="rounded-lg border bg-white shadow-sm overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-muted/50 text-left">
						<tr>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Name</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Email</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Role</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Status</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Change Role</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{isLoading
							? Array.from({ length: 8 }).map((_, i) => (
									<tr key={i}>
										{[...Array(6)].map((__, j) => (
											<td key={j} className="px-4 py-3">
												<Skeleton className="h-4 w-full" />
											</td>
										))}
									</tr>
								))
							: users.length === 0
								? (
										<tr>
											<td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
												No users found.
											</td>
										</tr>
									)
								: users.map((u) => (
										<tr key={u._id} className="hover:bg-muted/50 transition-colors">
											<td className="px-4 py-3 font-medium">
												{u.firstName && u.lastName
													? `${u.firstName} ${u.lastName}`
													: u.name || "—"}
											</td>
											<td className="px-4 py-3 text-muted-foreground">{u.email}</td>
											<td className="px-4 py-3">
												<Badge variant="outline" className={roleColors[u.role]}>
													{u.role}
												</Badge>
											</td>
											<td className="px-4 py-3">
												<Badge
													variant="outline"
													className={u.isVerified
														? "bg-green-50 text-green-700 border-green-200"
														: "bg-red-50 text-red-700 border-red-200"}
												>
													{u.isVerified ? "Active" : "Blocked"}
												</Badge>
											</td>
											<td className="px-4 py-3">
												<Select
													defaultValue={u.role}
													onValueChange={(val) =>
														changeRole({ id: u._id, role: val as UserRole })
													}
												>
													<SelectTrigger className="w-32 h-8 text-xs">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														{(["CUSTOMER", "STAFF", "ADMIN"] as UserRole[]).map((r) => (
															<SelectItem key={r} value={r} className="text-xs">
																{r}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</td>
											<td className="px-4 py-3 text-right">
												<Button
													size="sm"
													variant={u.isVerified ? "destructive" : "outline"}
													disabled={isToggling && blockingId === u._id}
													onClick={() => {
														setBlockingId(u._id);
														toggleBlock({ id: u._id, isBlocked: u.isVerified });
													}}
												>
													{isToggling && blockingId === u._id ? (
														<Loader2 className="h-3.5 w-3.5 animate-spin" />
													) : u.isVerified ? (
														"Block"
													) : (
														"Unblock"
													)}
												</Button>
											</td>
										</tr>
									))}
					</tbody>
				</table>
			</div>

			<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add New User / Staff</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								placeholder="John Doe"
								value={userData.name}
								onChange={(e) => setUserData({ ...userData, name: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								type="email"
								placeholder="john@example.com"
								value={userData.email}
								onChange={(e) => setUserData({ ...userData, email: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Initial Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={userData.password}
								onChange={(e) => setUserData({ ...userData, password: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="role">Role</Label>
							<Select
								value={userData.role}
								onValueChange={(val) => setUserData({ ...userData, role: val as UserRole })}
							>
								<SelectTrigger id="role">
									<SelectValue placeholder="Select role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
									<SelectItem value="STAFF">STAFF</SelectItem>
									<SelectItem value="ADMIN">ADMIN</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsCreateOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleCreate} disabled={isCreating}>
							{isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Create Account
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
