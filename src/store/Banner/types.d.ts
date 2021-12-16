interface IBanner {
  _id: string;
  text: string;
  image: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface IBottomBanner {
  _id: string;
  projects: string[];
  createdAt: string;
  updatedAt: string;
}

interface IAddBanner {
  text: string;
  image: string;
  order: number;
}

interface IEditBanner {
  id: string;
  data: IEditBannerData;
}

interface IEditBannerData {
  text: string;
  order: number;
}

interface IEditBottomBanner {
  projects: string[];
}
