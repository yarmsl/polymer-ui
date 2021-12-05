interface Project {
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
interface IEditProject {
  id: string;
  data: FormData | ISendProjectData;
}

interface ISendProjectData {
  customer?: string;
  title?: string;
  done?: string;
  year?: number;
  photoes: string[];
  tags?: string[];
  slug?: string;
}
