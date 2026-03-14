import otpGen from "otp-generator";

export const otpGenerator = () => {
	const generatedOtp = otpGen.generate(6, {
		lowerCaseAlphabets: false,
		upperCaseAlphabets: false,
		specialChars: false,
	});

	return `${generatedOtp}`;
};
