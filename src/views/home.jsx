import React from 'react';
import { useState } from 'react';
import Card from '../components/card';
import Carousel from '../components/carousel';
import Quote from '../components/quote';

export default function Home() {
  const [count, setCount] = useState(0);

  function onClick() {
    setCount(count + 1);
  }
  return (
    <>
      <div className='bg-slate-600 flex flex-col justify-center sm:items-center mx-auto size-full'>
        <div className='text-center py-8 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col justify-between'>
            <h2 className='mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl'>
              <span className='bg-clip-text bg-gradient-to-tr from-orange-600 to-orange-400 text-transparent'>
                The valley's best pizza
              </span>
            </h2>
            <button
              type='button'
              className='w-32 my-4 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-800 text-white hover:bg-orange-600'
              onClick={onClick}
            >
              Buy now ({count})
            </button>
          </div>

          <Carousel
            slides={[
              <Quote quote='Most amazing pizza experience of my life.' author='Megan Fox, Springville' />,
              <Quote quote='Milan reborn!' author='Trina Smith, Provo' />,
              <Quote quote='All I can say is WOW!' author='Don Julio, Orem' />,
              <Quote quote='Best pizza ever. I can eat this every day!' author='Terrence Jones, Mapleton' />,
            ]}
          />

          <div className='m-4 grid gap-x-8 gap-y-4 sm:gird-cols-1 md:grid-cols-2 lg:grid-cols-4 xlg:grid-cols-5'>
            <Card title='Springville' description='The Springville store' image='pizza1.png' />
            <Card title='Orem' description='The Orem store' image='pizza2.png' />
            <Card title='Provo' description='The provo store' image='pizza3.png' />
            <Card title='Lindon' description='The Lindon store' image='pizza4.png' />
            <Card title='Nephi' description='The Nephi store' image='pizza5.png' />
            <Card title='American Fork' description='The American Fork store' image='pizza6.png' />
          </div>
        </div>
      </div>
    </>
  );
}