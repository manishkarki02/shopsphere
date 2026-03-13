import httpStatus from "http-status";
import { User, type IUser } from "@/features/user/user.model";
import { ApiError } from "@/common/utils/response.util";
import { hashPasswordGenerator, comparePassword } from "@/common/services/auth/hash.service";
import { otpGenerator } from "@/common/services/auth/otp.service";
import { createNewAccessToken, createNewRefreshToken } from "@/common/services/auth/jwt.service";
import { sendEmail } from "@/common/services/email/email.service";

import type { SignUpSchema, SignInSchema, VerifyEmailSchema, ResendOtpSchema } from "./validation/auth.validation";

export async function signUpUser(body: SignUpSchema) {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        if (existingUser.isVerified) {
            throw new ApiError(httpStatus.CONFLICT, { message: "This user is already registered and verified." });
        } else {
            throw new ApiError(httpStatus.CONFLICT, { message: "This user is already registered." });
        }
    }

    const hashedPassword = await hashPasswordGenerator(body.password);
    const generatedOTP = otpGenerator();
    const userData = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
        otp: generatedOTP,
        isVerified: false,
    });
    await sendEmail({
        to: userData.email,
        html: `Your OTP is ${generatedOTP}`,
        subject: "User registration OTP for Hamro store application"
    });

    return {
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        isVerified: userData.isVerified,
    };
}

export async function verifyEmail(body: VerifyEmailSchema) {
    const user = await User.findOne({ email: body.email });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, { message: "Your Email is not Registered." });
    }
    
    // Check if genuinely verified
    if (user.isVerified) {
        throw new ApiError(httpStatus.BAD_REQUEST, { message: "Your email is already verified." });
    }

    if (body.otp !== user.otp) {
        throw new ApiError(httpStatus.BAD_REQUEST, { message: "Your otp does not match." });
    }

    await User.findByIdAndUpdate(
        user._id,
        { otp: "", isVerified: true },
        { new: true }
    );

    return null;
}

export async function signIn(body: SignInSchema) {
    const user = await User.findOne({ email: body.email });
    
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, { message: "This Email is not Registered." });
    }

    if (!user.isVerified) {
        throw new ApiError(httpStatus.BAD_REQUEST, { message: "This Email is not verified" });
    }

    const isCorrectPassword = await comparePassword(body.password, user.password!);
    if (!isCorrectPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, { message: "Your password is wrong." });
    }

    const accessToken = createNewAccessToken(user.email);
    const refreshToken = createNewRefreshToken(user.email);

    await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken });

    return { accessToken, refreshToken };
}

export async function resendOtpCode(body: ResendOtpSchema) {
    const otp = otpGenerator();
    const updatedUser = await User.findOneAndUpdate({ email: body.email }, { otp: otp }, { new: true });

    if (!updatedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, { message: "No user with this email" });
    }

    return updatedUser;
}

export async function accessTokenGenerator(email: string) {
    const newAccessToken = createNewAccessToken(email);
    const updatedUser = await User.findOneAndUpdate(
        { email },
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    if (!updatedUser) throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });

    return { accessToken: newAccessToken };
}

export async function logoutHandler(userId: string) {
    await User.findByIdAndUpdate(userId, { refreshToken: "" });
    return null;
}
