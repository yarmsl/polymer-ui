interface Project {
  _id: string;
  author: string;
  title: string;
  done: string;
  year: number;
  images: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface IProject extends Project {
  customer: string;
  tags: string[];
}

interface IProjectWithCustomer extends Project {
  customer: ICustomer;
  tags: string[];
}

interface IProjectFull {
  _id: string;
  author: IUserResponse;
  title: string;
  done: string;
  year: number;
  images: string[];
  slug: string;
  customer: ICustomer;
  tags: ITag[];
  createdAt: string;
  updatedAt: string;
}
interface IEditProject {
  id: string;
  data: FormData | ISendProjectData;
}

interface ISendProjectData {
  customer?: string;
  title?: string;
  done?: string;
  year?: number;
  images?: string[];
  tags?: string[];
  slug?: string;
}
