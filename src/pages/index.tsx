import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { AppDispatch, RootState } from '@/redux/store';
import { useGetProductsQuery, useGetListOfCategoryQuery } from '@/redux/services/dummyJSONCore';

import Loader from '@/components/Loader';
import TableProducts from '../components/TableProducts';

export default function Home() {
  const router = useRouter();
  const { limit, skip, filterBy, filterValue } = useSelector((state: RootState) => state.product);

  const { data: dataProduct, error: errorProduct, isLoading: isLoadingProduct, isFetching } = useGetProductsQuery({ limit, skip, search: router.query.q || '', filterBy, filterValue });
  const { data: dataListCategory, error: errorListCategory, isLoading: isLoadingListCategory } = useGetListOfCategoryQuery();

  return (
    <div>
      <Head>
        <title>Technical Test Deall Jobs - Azmi Fitra</title>
      </Head>

      {isLoadingProduct && <Loader />}
      {!isLoadingProduct && <TableProducts data={{ ...dataProduct, isLoadingProduct: isFetching }} dataListCategory={dataListCategory} />}
    </div>
  );
}
