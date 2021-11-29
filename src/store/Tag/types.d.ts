interface ITag {
  author: string;
  projects: string[];
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
  data: IAddTag;
}
