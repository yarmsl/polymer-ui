interface IStoryArticle extends IAddStoryArticle {
  _id: string;
}

interface IAddStoryArticle {
  title: string;
  content: string;
}

interface IStoryArticleFull extends IStoryArticle {
  author: IUserResponse;
  createdAt: string;
  updatedAt: string;
}

interface IEditStoryArticle {
  id: string;
  data: ISendStoryArticle;
}

interface ISendStoryArticle {
  title?: string;
  content?: string;
}
