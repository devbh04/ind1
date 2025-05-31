import React from 'react'

const NumbersCard = ({number, abb, text}) => {
  return (
    <div className='bg-slate-100 rounded-lg p-3 sm:p-4 w-full xs:w-32 sm:w-36 md:w-40 items-center flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow duration-200'>
        <div className='flex'>
            <h1 className='text-black text-2xl sm:text-3xl'>{number}</h1>
            <h1 className='text-green-700 text-2xl sm:text-3xl'>{abb}</h1>
        </div>
        <p className='text-slate-500 text-sm sm:text-base text-center'>{text}</p>
    </div>
  )
}

export default NumbersCard