// import type { ApiResponse } from "@/common/types/api-response.type";
import type {
	ResendOtpBody,
	SignUpBody,
	VerifyEmailBody,
} from "@shop-sphere/shared";
import type { ApiResponse } from "@/common/types/api-response.type";
import { METHODS } from "@/enums/request-methods.enum";
import createApi from "@/utils/axios";
import type {
	ILoginRequest,
	ILoginResponse,
	IRegisterResponse,
} from "./auth.type";

const authApi = createApi("/auth");

export const loginUser = async (payload: ILoginRequest) => {
	const { data }: { data: ApiResponse<ILoginResponse> } = await authApi({
		method: METHODS.POST,
		url: "/login",
		data: payload,
	});
	return data;
};

export const registerUser = async (payload: SignUpBody) => {
	const { data }: { data: ApiResponse<IRegisterResponse> } = await authApi({
		method: METHODS.POST,
		url: "/signup",
		data: payload,
	});
	return data;
};

export const verifyOtp = async (payload: VerifyEmailBody) => {
	const { data }: { data: ApiResponse<any> } = await authApi({
		method: METHODS.POST,
		url: "/verify",
		data: payload,
	});
	return data;
};

export const resendOtp = async (payload: ResendOtpBody) => {
	const { data }: { data: ApiResponse<any> } = await authApi({
		method: METHODS.POST,
		url: "/resend-verification-email",
		data: payload,
	});
	return data;
};

export const logoutUser = async () => {
	const { data }: { data: ApiResponse<null> } = await authApi({
		method: METHODS.POST,
		url: "/logout",
	});
	return data;
};
