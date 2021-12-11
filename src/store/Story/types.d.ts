interface IStory extends IAddStory {
  _id: string;
}

interface IAddStory {
  from: number;
  to: number;
  content: string;
}

interface IStoryFull extends IStory {
  author: IUserResponse;
  createdAt: string;
  updatedAt: string;
}

interface IEditStory {
  id: string;
  data: ISendStory;
}

interface ISendStory {
  from?: number;
  to?: number;
  content?: string;
}
