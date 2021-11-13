interface IAuth {
  isAuth: boolean;
  token: string;
}

interface ISignUpResponse {
  token: string;
  id: string;
}

interface ISignInResponse extends ISignUpResponse {
  name: string;
  avatar: string;
}

interface IUser {
  id: string;
  name: string;
  avatar: string;
}

