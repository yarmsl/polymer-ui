import React from 'react';

import Contacts from '~/modules/Contacts';

import HelmetTitle from '../UI/atoms/Helmet';

const ContactsPage: React.FC = () => (
  <>
    <HelmetTitle title='Контакты' />
    <Contacts />
  </>
);
export default ContactsPage;
