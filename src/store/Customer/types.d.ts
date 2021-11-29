interface ICustomer {
  author: string;
  projects: string[];
  name: string;
  logo: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface IEditCustomer {
    id: string;
    data: FormData
}
