interface IArticle {
  _id: string;
  title: string;
  content: string;
  images: string[];
}

interface IArticleFull extends IArticle {
  author: IUserResponse;
  createdAt: string;
  updatedAt: string;
}

interface IEditArticle {
  id: string;
  data: FormData | ISendArticle;
}

interface ISendArticle {
  title?: string;
  content?: string;
  images?: string[];
}
