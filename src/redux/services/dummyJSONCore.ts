import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dummyJSONApi = createApi({
  reducerPath: 'dummyJSONApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (build) => ({
    // getProducts: build.query<any, { limit: number; skip: number; search: any }>({ query: ({ limit, skip, search }) => `/products/search?q=${search}&limit=${limit}&skip=${skip}` }),
    getCarts: build.query<any, { limit: number; skip: number }>({ query: ({ limit, skip }) => `/carts?limit=${limit}&skip=${skip}` }),
    getUserCartDetails: build.query<any, any>({ query: (userId) => `/carts/user/${userId}` }),
    getProducts: build.query<any, any>({
      async queryFn(_arg: any, _queryApi, _extraOptions, fetching) {
        let result;
        if (_arg.filterBy === 'Category' && _arg.filterValue) {
          result = fetching(`/products/category/${_arg.filterValue}?limit=${_arg.limit}&skip=${_arg.skip}`);
        } else {
          result = fetching(`/products/search?q=${_arg.search}&limit=${_arg.limit}&skip=${_arg.skip}`);
        }
        return result;
      },
    }),
    getListOfCategory: build.query<any, void>({
      query: () => '/products/categories',
      transformResponse: (response: string[], meta, arg) => {
        return response.map((el: string) => el.charAt(0).toUpperCase() + el.slice(1));
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetCartsQuery, useGetUserCartDetailsQuery, useGetListOfCategoryQuery } = dummyJSONApi;
