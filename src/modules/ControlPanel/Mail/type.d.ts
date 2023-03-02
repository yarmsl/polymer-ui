interface IAddMails extends IMails {
  pass: string;
}

interface IMails {
  email: string;
  feedback: string;
  provider: 'Yandex' | 'Yahoo' | 'Mail.ru';
}

interface IWantFile {
  email: string;
}

interface Ifeedback {
  name: string;
  email: string;
  phone: string;
}
