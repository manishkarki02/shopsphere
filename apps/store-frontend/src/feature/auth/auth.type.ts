export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginResponse {
	accessToken: string;
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
	};
}

export interface IRegisterResponse {
	message: string;
}
