interface IVacancy extends IAddVacancy {
  _id: string;
}

interface IAddVacancy {
  title: string;
  requirements: string;
  wage: number;
}

interface IVacancyFull extends IVacancy {
  author: IUserResponse;
  createdAt: string;
  updatedAt: string;
}

interface IEditVacancy {
  id: string;
  data: ISendVacancy;
}

interface ISendVacancy {
  title?: number;
  requirements?: string;
  wage?: string;
}
