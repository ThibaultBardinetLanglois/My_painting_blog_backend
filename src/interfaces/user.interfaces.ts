export interface User {
  username: string;
  email: string;
  hashedPassword: string;
}

export interface UserInDB extends User {
  id: number;
  role: string;
}

export interface UserPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface UserLoginPayload {
  username: string;
  password: string;
}

// Interface to decode user token
export interface DecodedToken {
  id: number,
  username: string,
  email: string,
  role: string,
  iat: number,
  exp: number
};

export interface RequestWithUserRole extends Request {
  decodedToken?: DecodedToken,
}