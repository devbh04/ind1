'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Domain = () => {
    const router = useRouter()

    const handleClick = (e) => {
        const selectedDomain = e.target.innerText;
        localStorage.setItem('selectedDomain', selectedDomain);
        router.push(`/quiz`);
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-4 font-extrabold'>Select your Prefered Domain:</h1>
            <p className='text-xl mt-4 border-2 p-2 rounded-xl hover:bg-slate-200 cursor-pointer' onClick={handleClick}>Database</p>
            <div className='flex gap-4 text-center'>
                <p className='text-xl mt-4 border-2 p-2 rounded-xl hover:bg-slate-200 cursor-pointer' onClick={handleClick}>AI</p>
                <p className='text-xl mt-4 border-2 p-2 rounded-xl hover:bg-slate-200 cursor-pointer' onClick={handleClick}>Web Development</p>
            </div>
            <div className='flex gap-4 text-center'>
                <p className='text-xl mt-4 border-2 p-2 rounded-xl hover:bg-slate-200 cursor-pointer' onClick={handleClick}>Data Structures</p>
                <p className='text-xl mt-4 border-2 p-2 rounded-xl hover:bg-slate-200 cursor-pointer' onClick={handleClick}>Algorithms</p>
                <p className='text-xl mt-4 border-2 p-2 rounded-xl hover:bg-slate-200 cursor-pointer' onClick={handleClick}>Machine Learning</p>
            </div>
            <p className='text-xl mt-4 border-2 p-2 rounded-xl hover:bg-slate-200 cursor-pointer' onClick={handleClick}>System Design</p>
        </div>
    );
};

export default Domain;