import { Button } from '@/components/ui/button';
import React from 'react';

const CourseCard = () => {
  return (
    <div className="border border-slate-300 hover:border-slate-500 w-full rounded-lg shadow-lg">
      <div className='h-36 p-2 w-full bg-amber-100 rounded-t-lg flex justify-end items-center'>
        <div className='h-20 w-20 bg-white border-2 border-black rounded-lg flex justify-center items-center'>
          <img src="/homepage/book.svg" alt="Course Image" className="h-20 w-20 object-cover rounded-lg" />
        </div>
      </div>
      <div className=" flex justify-between items-center p-4">
        <div className=''>
          <p className="text-xl font-semibold text-black">Course Name</p>
          <p className="text-md text-black">Course Category</p>
        </div>
        <Button className='bg-slate-100 w-20 text-black justify-center hover:bg-slate-200 transition-all duration-100'>Enroll</Button>
      </div>
    </div>
  );
};

export default CourseCard;
