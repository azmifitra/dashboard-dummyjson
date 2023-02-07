import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AiOutlineEye } from 'react-icons/ai';

import { incrementSkip, decrementSkip } from '@/redux/slices/cartSlice';

import styles from '../styles/scrollbar.module.css';
import PaginationTable from './PaginationTable';

interface CartsProps {
  data: {
    limit: number;
    carts: any;
    skip: number;
    total: number;
    isLoadingCart: boolean;
  };
}

function TableCarts({ data }: CartsProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClickPagination = (param: string) => {
    if (param === 'inc') {
      dispatch(incrementSkip());
    } else {
      dispatch(decrementSkip());
    }
  };
  return (
    <div className={`centeredItem mt-8 flex-col md:mt-20`}>
      <div className="w-full px-4 md:w-3/4 lg:w-10/12 lg:px-0">
        <h2 className="pb-6 text-left text-2xl font-semibold">Carts</h2>
        <div className="rounded-lg border border-gray-300 bg-white">
          <div className="flex flex-col items-end px-4 py-2"></div>
          <div className={`table_wrapper ${styles.customScrollbar}`}>
            <table className="w-full min-w-[800px] table-fixed">
              <thead>
                <tr>
                  <th className="w-[5%]">No.</th>
                  <th className="w-[10%]">User</th>
                  <th className="w-[10%]">Total Items</th>
                  <th className="w-[20%]">Total Before Discount</th>
                  <th className="w-[15%]">Total Discount</th>
                  <th className="w-[20%]">Total After Discount</th>
                  <th className="w-[20%]"></th>
                </tr>
              </thead>
              <tbody>
                {data?.carts?.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}.</td>
                    <td className="font-medium"># {item.userId}</td>
                    <td className="text-gray-500">{item.totalProducts} pcs</td>
                    <td>$ {item.total}</td>
                    <td className="text-gray-500">$ {item.total - item.discountedTotal}</td>
                    <td className="font-medium">$ {item.discountedTotal}</td>
                    <td>
                      {' '}
                      <div className="flex cursor-pointer items-center text-gray-500 hover:text-black" onClick={() => router.push(`/carts/${item.userId}`)}>
                        <AiOutlineEye className="mr-2 mt-1" /> <p>See Details</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationTable limit={data?.limit} skip={data?.skip} total={data?.total} isLoading={data?.isLoadingCart} onClickPrev={() => handleClickPagination('dec')} onClickNext={() => handleClickPagination('inc')} />
        </div>
      </div>
    </div>
  );
}

export default TableCarts;
