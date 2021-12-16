interface ITag {
  _id: string;
  author: string;
  projects: string[];
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

interface ITagFull {
  _id: string;
  author: IUserResponse;
  projects: IProject[];
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

interface IAddTag {
  name: string;
  slug: string;
  order: number;
}

interface IEditTag {
  id: string;
  data: IEditTagData;
}

interface IEditTagData {
  name?: string;
  slug?: string;
  order?: number;
}
