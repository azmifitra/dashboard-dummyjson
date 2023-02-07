import React from 'react';

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

function HeaderCartDetails({ data }: CartDetailsProps) {
  const { id, discountedTotal, total, totalProducts, userId, isLoadingDetailCart } = data;
  return (
    <div className="mb-6">
      <h3 className="pb-2 text-left text-lg font-semibold">Details</h3>
      <div className="rounded-lg border-2 border-purple-500 bg-purple-200 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-1">
            <p>User: {userId}</p>
          </div>
          <div className="col-span-1">
            <p># of Items: {totalProducts}</p>
          </div>
          <div className="col-span-1">
            <p>Total Before Discount: $ {total}</p>
          </div>
          <div className="col-span-1">
            <p>Total Discount: $ {total - discountedTotal}</p>
          </div>
          <div className="col-span-1 font-medium">
            <p>Total After Discount: $ {discountedTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderCartDetails;
