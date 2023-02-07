import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { FaFilter } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { incrementSkip, decrementSkip, resetLimitSkip } from '@/redux/slices/productSlice';
import useDebounce from '@/hooks/useDebounce';
import { useIsMount } from '@/hooks/useIsMount';
import { filterProduct, selectActiveFilter } from '@/redux/slices/productSlice';

import styles from '../styles/scrollbar.module.css';
import PaginationTable from './PaginationTable';

interface ProductsProps {
  data: {
    limit: number;
    products: any;
    skip: number;
    total: number;
    isLoadingProduct: boolean;
  };
  dataListCategory: string[];
}

interface FilterSectionProps {
  dataListCategory: string[];
}

function FilterSection({ dataListCategory }: FilterSectionProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMount = useIsMount();
  const [searchProducts, setSearchProducts] = useState<string>('');
  const [listFilterBy, setListFilterBy] = useState<string[]>(['Category']);
  const [listFilterValue, setListFilterValue] = useState<string[]>([]);
  const debouncedSearch = useDebounce(searchProducts, 500);
  const { filterBy, filterValue, filterActive } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (!isMount) {
      router.push(`?q=${searchProducts}`);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setListFilterValue(dataListCategory);
  }, [dataListCategory]);

  const handeChangeSearchBar = (e: any) => {
    setSearchProducts(e.target.value);
    dispatch(resetLimitSkip());
  };
  const handleChangeFilterBy = (e: any) => {
    dispatch(filterProduct({ filterBy: e.target.value, filterValue }));
    dispatch(resetLimitSkip());
    router.push(`?filterby=${e.target.value}&filtervalue=${filterValue}`);
  };
  const handleChangeFilterValue = (e: any) => {
    dispatch(filterProduct({ filterBy, filterValue: e.target.value }));
    dispatch(resetLimitSkip());
    router.push(`?filterby=${filterBy}&filtervalue=${e.target.value}`);
  };
  const handleClickIconFilter = (payload: string) => {
    setSearchProducts('');
    router.push(`/`);
    dispatch(selectActiveFilter(payload));
  };

  if (filterActive === 'search') {
    return (
      <div className="flex items-center justify-between">
        <div className="relative">
          <BiSearch className="absolute left-4 top-1.5 text-base text-gray-500" />
          <input type="text" placeholder="Search by Product Name" className="mx-2 pl-8 sm:w-60" value={searchProducts} onChange={(e) => handeChangeSearchBar(e)} />
        </div>
        <div className="group mx-2 flex cursor-pointer items-center justify-center rounded-full border border-purple-600 p-2 hover:bg-purple-600 hover:opacity-80" onClick={() => handleClickIconFilter('filter')}>
          <FaFilter className="text-purple-600 group-hover:text-white" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="flex flex-col sm:flex-row">
        <select
          className={`${!filterBy && 'text-gray-400'} mx-2 cursor-pointer rounded-md border border-slate-300 bg-white py-1 pl-2 pr-8 leading-tight focus:border-purple-500 focus:bg-white focus:outline-none`}
          value={filterBy}
          placeholder="select"
          onChange={handleChangeFilterBy}
        >
          <option disabled value="">
            {' '}
            -- Select Filter By --{' '}
          </option>
          {listFilterBy.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className={`${!filterBy && 'hidden'} ${!filterValue && 'text-gray-400'} mx-2 cursor-pointer rounded-md border border-slate-300 bg-white py-1 pl-2 pr-8 leading-tight focus:border-purple-500 focus:bg-white focus:outline-none`}
          value={filterValue}
          placeholder="select"
          onChange={handleChangeFilterValue}
        >
          <option disabled value="">
            {' '}
            -- Select Filter Value --{' '}
          </option>
          {listFilterValue.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="group mx-2 flex cursor-pointer items-center justify-center rounded-full border border-purple-600 p-2 hover:bg-purple-600 hover:opacity-80" onClick={() => handleClickIconFilter('search')}>
        <BiSearch className="text-purple-600 group-hover:text-white" />
      </div>
    </div>
  );
}

function TableProducts({ data, dataListCategory }: ProductsProps) {
  const dispatch = useDispatch();

  const handleClickPagination = (param: string) => {
    if (param === 'inc') {
      dispatch(incrementSkip());
    } else {
      dispatch(decrementSkip());
    }
  };

  const DataNotFound = () => {
    return (
      <div className="my-4 flex h-80 w-full flex-col items-center justify-center text-purple-700">
        <MdOutlineErrorOutline className="my-1 text-4xl" />
        <h3 className="text-lg font-medium">Sorry, item not found!</h3>
      </div>
    );
  };

  return (
    <div className={`centeredItem mt-8 flex-col md:mt-20`}>
      <div className="w-full px-4 md:w-3/4 lg:w-11/12 lg:px-0">
        <h2 className="pb-6 text-left text-2xl font-semibold">Products</h2>
        <div className="rounded-lg border border-gray-300 bg-white">
          <div className="flex flex-col items-end px-4 py-2">
            <FilterSection dataListCategory={dataListCategory} />
          </div>
          <div className={`table_wrapper ${styles.customScrollbar}`}>
            <table className="w-full min-w-[700px] table-fixed">
              <thead>
                <tr>
                  <th className="w-[5%]">No.</th>
                  <th className="w-[35%]">Product Name</th>
                  <th className="w-[20%]">Brand</th>
                  <th className="w-[10%]">Price</th>
                  <th className="w-[10%]">Stock</th>
                  <th className="w-[20%]">Category</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}.</td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">{item.title}</td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">{item.brand}</td>
                    <td className="font-medium">$ {item.price}</td>
                    <td className="font-medium">{item.stock}</td>
                    <td>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!data?.products.length && <DataNotFound />}
          <PaginationTable limit={data?.limit} skip={data?.skip} total={data?.total} isLoading={data?.isLoadingProduct} onClickPrev={() => handleClickPagination('dec')} onClickNext={() => handleClickPagination('inc')} />
        </div>
      </div>
    </div>
  );
}

export default TableProducts;
