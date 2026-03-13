import jwt from 'jsonwebtoken';
import Environment from '@/configs/env';

//====>>>> Creates a new access token for a user. <<<<====//
export const createNewAccessToken = (userEmail: string) => {
  const accessToken = jwt.sign(
    { email: userEmail },
    Environment.get('ACCESS_TOKEN_SECRET') as string,
    { expiresIn: "1d" }
  );

  return accessToken;
};

export const createNewRefreshToken = (userEmail: string) => {
  const refreshToken = jwt.sign(
    { email: userEmail },
    Environment.get('REFRESH_TOKEN_SECRET') as string,
    { expiresIn: "3d" }
  );

  return refreshToken;
};

//====>>>> Verify the access token and return the email address <<<<====//
export const validateAccessToken = (accessToken: string) => {
  try {
    const jwtVerification: any = jwt.verify(
      accessToken,
      Environment.get('ACCESS_TOKEN_SECRET') as string
    );
    return jwtVerification.email;
  } catch (err: any) {
    // Checks if the access token is valid
    if (err.message == "jwt malformed" || err.message == "invalid token") {
      throw Error(
        "Please provide a valid access token. Error Message: " + err.message
      );
    } else if (err.message == "jwt expired") {
      throw Error("The token is expired.");
    }
    throw err;
  }
};

//====>>>> Verify the refresh token <<<<====//
export const validateRefreshToken = (refreshToken: string) => {
  try {
    const jwtVerification: any = jwt.verify(
      refreshToken,
      Environment.get('REFRESH_TOKEN_SECRET') as string
    );
    return jwtVerification.email;
  } catch (err: any) {
    // Verify that the refresh token is valid.
    if (err.message == "jwt malformed") {
      throw Error("Please provide a valid refresh token.");
    } else if (err.message == "jwt expired") {
      throw Error("The refresh token is expired.");
    }
    throw err;
  }
};
