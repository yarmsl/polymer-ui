interface IAuth extends IUser {
  isAuth: boolean;
}

interface IUser {
  token: string;
  name: string;
  role: RoleTypes;
  articles: string[];
  companies: string[];
  presentationFile: string;
  productions: string[];
  projects: string[];
  steps: string[];
  stories: string[];
  storyArticles: string[];
  tags: string[];
  vacancies: string[];
}

type RoleTypes = 'admin' | 'user';