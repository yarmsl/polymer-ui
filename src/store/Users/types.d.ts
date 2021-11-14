interface IUserResponse extends IEditUserById {
  created_on: string;
  email: string;
}

interface IEditUserById extends IEditUser {
  id: string;
}

interface IEditUser {
  name: string;
  role: RoleTypes;
}

interface IEditPassword {
  id: string;
  password: string;
}

interface IDeleteUser {
  id: string;
}
