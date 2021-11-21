interface IUserResponse extends IEditUserById {
  createdAt: string;
  updatedAt: string;
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
