import React from 'react';

import styles from '@/styles/scrollbar.module.css';

interface CartDetailsProps {
  data: {
    id: number;
    discountedTotal: number;
    total: number;
    totalProducts: number;
    totalQuantity: number;
    userId: number;
    isLoadingDetailCart: boolean;
    products: any;
  };
}

function TableProductsCartDetails({ data }: CartDetailsProps) {
  return (
    <div>
      <h3 className="pb-2 text-left text-lg font-semibold">Products</h3>
      <div className="rounded-lg border border-gray-300 bg-white">
        <div className={`table_wrapper ${styles.customScrollbar}`}>
          <table className="w-full min-w-[700px] table-fixed">
            <thead>
              <tr>
                <th className="w-[35%]">Product Name</th>
                <th className="w-[15%]">Quantity</th>
                <th className="w-[15%]">Price per Item</th>
                <th className="w-[15%]">Discount</th>
                <th className="w-[20%]">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((item: any) => (
                <tr key={item.id}>
                  <td className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">{item.title}</td>
                  <td className="text-gray-500">{item.quantity} pcs</td>
                  <td className="text-gray-500">$ {item.price}</td>
                  <td className="text-gray-500">{item.discountPercentage} %</td>
                  <td className="font-medium">$ {item.discountedPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableProductsCartDetails;
