import { ReactElement } from 'react';

import { Container, Typography } from '@mui/material';

import HelmetTitle from '../../UI/atoms/Helmet';

const ControlPanel = (): ReactElement => {
  return (
    <>
      <HelmetTitle title='Панель управления' />
      <Container maxWidth='sm' sx={styles.root}>
        <Typography variant='h6'>Добро пожаловать в панель управления!</Typography>
        <Typography>
          Для настройки требуемой части вашего приложения пройдите в соответствующий пункт Меню
        </Typography>
        <Typography>
          Для настройки Главной страницы приложения потребуется создать Проекты и Заказчиков они
          будут отображены в каруселе Заказчиков. (создав Заказчика, его можно выбрать в Меню
          Проектов) Также в Меню в пункте Баннеры можно выбрать проекты, которые требуется показать
          в Подвале приложения, там же можно создать слайды для главного Баннера
        </Typography>
        <Typography>
          Для страницы Промышленный Дизайн и инжиниринг потребуется создать Теги они же тематики,
          которые объединяют проекты, у одного Проекта может быть несколько Тегов, Создав Тег не
          забудьте выбрать его в меню Проектов. Так же в меню есть раздел для публикации статей на
          этой странице
        </Typography>
        <Typography>
          Для настройки страницы Производство в соответствующем пункте Меню, можно создать статьи,
          создав статью без текста вы тем самым создадите заголовок превого уровня, порядок статей
          можно контролировать с помощью Порядкогового номера. Также для каждой статьи можно создать
          подстатьи с изображениями
        </Typography>
        <Typography>
          Для настройки страницы О компании можно создать Историю по годам, обычные статьи и
          Вакансии.
        </Typography>
        <Typography>
          Обязательно перед использованием создайте пользователей, настройте Почту и загрузите файл
          презентации. Сделать это можно только с правами Администратора
        </Typography>
      </Container>
    </>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    flexDirection: 'column',
    pt: '100px',
    '&>*': {
      mb: '8px',
    },
  },
};

export default ControlPanel;
