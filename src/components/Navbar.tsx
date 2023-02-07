import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsInboxesFill } from 'react-icons/bs';
import { FaShoppingCart, FaRegChartBar } from 'react-icons/fa';

type Props = {};

function Navbar({}: Props) {
  const router = useRouter();

  const navbarList: { id: number; name: string; path: string; element: React.ReactNode }[] = [
    { id: 1, name: 'Products', path: '/', element: <BsInboxesFill /> },
    { id: 2, name: 'Analytics', path: '/analytics', element: <FaRegChartBar /> },
    { id: 3, name: 'Carts', path: '/carts', element: <FaShoppingCart /> },
  ];

  return (
    <div className="fixed w-full md:w-fit">
      <div className="flex flex-row bg-white shadow-2xl md:h-screen md:w-48 md:flex-col lg:w-64">
        <div className="hidden items-center border-r border-purple-600 p-4 font-bold md:flex md:border-b md:border-r-0">
          <p>Dashboard</p>
        </div>
        <div className="py-4">
          <ul className="flex flex-row md:flex-col">
            {navbarList.map((el) => (
              <li className="flex w-full cursor-pointer px-2 md:pb-2" key={el.id} onClick={() => router.push(el.path)}>
                <div className={`flex w-full items-center rounded-md px-2 py-1 hover:bg-purple-600 hover:text-white ${router.route === el.path ? 'bg-purple-600 text-white' : ''}`}>
                  {el.element} <p className="ml-2">{el.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
