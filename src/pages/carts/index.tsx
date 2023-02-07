import TableCarts from '@/components/TableCarts';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import { RootState } from '@/redux/store';
import { useGetCartsQuery } from '@/redux/services/dummyJSONCore';
import Loader from '@/components/Loader';

type Props = {};

function Carts({}: Props) {
  const { limit, skip } = useSelector((state: RootState) => state.cart);
  const { data: dataCart, error: errorCart, isLoading: isLoadingCart, isFetching } = useGetCartsQuery({ limit, skip });

  return (
    <div>
      <Head>
        <title>Table Carts</title>
      </Head>

      {isLoadingCart && <Loader />}
      {!isLoadingCart && <TableCarts data={{ ...dataCart, isLoadingCart: isFetching }} />}
    </div>
  );
}

export default Carts;
