import { create } from "zustand";

export interface ISession {
	id: string;
	name: string;
	email: string;
	role: string;
}

export type AuthState = {
	isAuthenticated: boolean;
	session: ISession | null;
};

export type AuthActions = {
	login: (session: ISession) => void;
	logout: () => void;
};

export type AuthContext = AuthState & AuthActions;

const STORAGE_KEY = "auth.session";

function getStoredSession(): ISession | null {
	const session = localStorage.getItem(STORAGE_KEY);
	if (session) return JSON.parse(session);

	// MOCK DEFAULT SESSION FOR E2E TESTING
	return {
		id: "u1",
		name: "Admin Mock",
		email: "admin@mock.com",
		role: "ADMIN",
	};
}

function setStoredSession(session: ISession | null) {
	if (session) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
	} else {
		localStorage.removeItem(STORAGE_KEY);
	}
}

export const useAuth = create<AuthContext>((set) => ({
	isAuthenticated: !!getStoredSession(),
	session: getStoredSession(),

	login: (session: ISession) => {
		setStoredSession(session);
		set({ session, isAuthenticated: true });
	},

	logout: () => {
		setStoredSession(null);
		set({ session: null, isAuthenticated: false });
	},
}));
