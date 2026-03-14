import bcrypt from "bcrypt";

const salt = 10;

export const hashPasswordGenerator = async (password: string) => {
	const generatedPassword = await bcrypt.hash(password, salt);
	return `${generatedPassword}`;
};

export const comparePassword = async (
	userPassword: string,
	hashPassword: string,
) => {
	const isMatched = await bcrypt.compare(userPassword, hashPassword);

	return isMatched;
};
