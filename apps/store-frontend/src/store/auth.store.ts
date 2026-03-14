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
	return session ? JSON.parse(session) : null;
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
