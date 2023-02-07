import React from 'react';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';

type PaginationProps = {
  limit: number;
  skip: number;
  total: number;
  isLoading: boolean;
  onClickPrev: React.MouseEventHandler<HTMLButtonElement>;
  onClickNext: React.MouseEventHandler<HTMLButtonElement>;
};

function PaginationTable({ limit, skip, total, isLoading, onClickNext, onClickPrev }: PaginationProps) {
  if (total) {
    return (
      <div className="my-2 flex flex-col items-center sm:flex-row sm:justify-between">
        <div className="mx-2 flex items-center">
          <p>
            Showing {skip + 1} to {skip + limit} of {total} Results
          </p>
        </div>
        <div className="mx-2 my-2 flex items-center sm:my-0">
          {isLoading && <div className="miniLoader mr-2"></div>}
          <button disabled={skip === 0} onClick={onClickPrev}>
            <MdOutlineArrowBackIos className="text-white" />
          </button>
          <div>
            <p>
              Page {skip / limit + 1} / {total / limit}
            </p>
          </div>
          <button disabled={skip + limit === total} onClick={onClickNext}>
            <MdOutlineArrowForwardIos className="text-white" />
          </button>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default PaginationTable;
