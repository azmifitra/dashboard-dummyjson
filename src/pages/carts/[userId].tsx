import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useGetUserCartDetailsQuery } from '@/redux/services/dummyJSONCore';
import HeaderCartDetails from '@/components/CartDetails/Header';
import TableProductsCartDetails from '@/components/CartDetails/TableProducts';
import Loader from '@/components/Loader';

type Props = {};

function Carts({}: Props) {
  const router = useRouter();
  const { userId } = router?.query;
  const { data: dataDetailCart, error: errorDetailCart, isLoading: isLoadingDetailCart, isFetching } = useGetUserCartDetailsQuery(userId);

  const DetailsCart = () => {
    return (
      <div className={`centeredItem mt-8 flex-col md:mt-12`}>
        <Head>
          <title>Cart Details {userId}</title>
        </Head>
        <div className="w-full px-4 md:w-3/4 lg:w-11/12 lg:px-0">
          <h2 className="pb-6 text-left text-2xl font-semibold underline">Cart {dataDetailCart?.carts[0].id}</h2>

          <HeaderCartDetails data={{ ...dataDetailCart?.carts[0], isLoadingDetailCart }} />

          <TableProductsCartDetails data={{ ...dataDetailCart?.carts[0], isLoadingDetailCart }} />
        </div>
      </div>
    );
  };
  return (
    <div>
      {isLoadingDetailCart && <Loader />}
      {!isLoadingDetailCart && <DetailsCart />}
    </div>
  );
}

export default Carts;
