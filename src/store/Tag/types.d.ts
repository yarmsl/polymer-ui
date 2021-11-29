interface ITag {
  _id: string;
  author: string;
  projects: string[];
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface ITagFull {
  _id: string;
  author: IUserResponse;
  projects: IProject[];
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface IAddTag {
  name: string;
  slug: string;
}

interface IEditTag {
  id: string;
  data: IEditTagData;
}

interface IEditTagData {
  name?: string;
  slug?: string;
}
