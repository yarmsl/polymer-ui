interface IProductionArticle extends IAddProductionArticle{
  _id: string;
  steps: IStep[];
}

interface IAddProductionArticle {
  title: string;
  content: string;
  order: number;
}

interface IProductionArticleFull extends IProductionArticle {
  author: IUserResponse;
  createdAt: string;
  updatedAt: string;
}

interface IEditProductionArticle {
  id: string;
  data: ISendProductionArticle;
}

interface ISendProductionArticle {
  title?: string;
  content?: string;
  steps?: string[];
  order?: number;
}

interface IStep {
  _id: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  order: number;
  image: string;
  productionArticle: string;
}

interface IStepFull {
  _id: string;
  author: IUserResponse;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  order: number;
  image: string;
  productionArticle: string;
}

interface IEditStep {
  id: string;
  data: ISendStep;
}

interface ISendStep {
  title?: string;
  content?: string;
  productionArticle?: string;
  order?: number;
}

interface IAddStep {
  title: string;
  content: string;
  productionArticle: string;
  order: number;
  image: string;
}
