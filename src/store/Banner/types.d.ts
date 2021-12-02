interface IBanner {
  _id: string;
  text: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface IEditBanner {
  id: string;
  data: { text: string };
}
