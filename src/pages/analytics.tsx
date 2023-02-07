import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGetProductsQuery } from '@/redux/services/dummyJSONCore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  indexAxis: 'y' as const,
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Bar Chart (Items per Brand)',
    },
  },
  maintainAspectRatio: false,
  scale: {
    ticks: {
      precision: 0,
    },
  },
};

function Analytics() {
  const { data: dataProduct, error: errorProduct, isLoading: isLoadingProduct, isFetching } = useGetProductsQuery({ limit: 1000, skip: 0, search: '' });
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    if (dataProduct) {
      const groupedTech: any = Object.entries(
        dataProduct.products.reduce((acc: any, el: any) => {
          if (!acc[el.brand]) {
            acc[el.brand] = [];
          }
          acc[el.brand].push(el);

          return acc;
        }, {})
      ).map(([brand, items]) => ({ brand, items }));
      setDataChart(groupedTech);
    }
  }, [dataProduct]);

  const test = {
    labels: dataChart.map((el: any) => el.brand),
    datasets: [
      {
        data: dataChart.map((el: any) => el.items.length),
        backgroundColor: 'rgb(147 51 234)',
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>Analytics</title>
      </Head>

      <div className="my-8 mx-4 h-[2000px] md:mx-16">
        <Bar options={options} data={test} />
      </div>
    </div>
  );
}

export default Analytics;
