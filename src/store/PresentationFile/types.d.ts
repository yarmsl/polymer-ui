interface IPresFileFull extends IPresFile {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IPresFile {
  file: string;
}
