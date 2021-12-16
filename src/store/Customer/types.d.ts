interface ICustomer extends IAddCustomer {
  _id: string;
  author: string;
  projects: string[];
  createdAt: string;
  updatedAt: string;
  order: number;
}

interface ICustomerFull extends IAddCustomer {
  _id: string;
  author: IUserResponse;
  projects: IProject[];
  createdAt: string;
  updatedAt: string;
  order: number;
}
interface IEditCustomer {
  id: string;
  data: IEditCustomerData;
}

interface IEditCustomerData {
  name?: string;
  description?: string;
  slug?: string;
  order?: number;
}
interface IAddCustomer {
  name: string;
  logo: string;
  description: string;
  slug: string;
  order: number;
}
