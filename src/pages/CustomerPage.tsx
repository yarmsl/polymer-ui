import React from 'react';
import { useHistory } from 'react-router';

import Customer from '~/modules/Customer';
import { useGetCustomersDataQuery } from '~/store/Data';
import HelmetTitle from '~/UI/atoms/Helmet';

const CustomerPage: React.FC = () => {
  const router = useHistory();
  const { data, isLoading } = useGetCustomersDataQuery('');

  const customer = React.useMemo(() => {
    if (!isLoading && data != null && router?.location?.pathname != null) {
      return data?.find((customer) => `/customer/${customer.slug}` === router.location.pathname);
    }
  }, [data, isLoading, router.location.pathname]);

  return (
    <>
      <HelmetTitle title={`Совместные проекты${customer ? ` с ${customer.name}` : ''}`} />
      <Customer customer={customer} isLoading={isLoading} />
    </>
  );
};

export default CustomerPage;
