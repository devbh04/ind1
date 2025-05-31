import React from 'react'

const OptionCard = ({ bg, title, description1, description2, asset }) => {
  return (
    <div className={`${bg} h-36 rounded-2xl p-3 hover:border hover:border-blue-500 transition-all duration-100 flex justify-between overflow-hidden`}>
      <div className='flex flex-col justify-between'>
        <div>
          <h1 className='text-lg md:text-xl font-semibold'>{title}</h1>
          <p className='text-sm md:text-base'>{description1}</p>
          <p className='text-sm md:text-base'>{description2}</p>
        </div>
      </div>
      <div className='flex-shrink-0 flex items-center justify-center w-20 md:w-24'>
        <img 
          src={asset} 
          alt={title} 
          className='h-16 w-16 md:h-20 md:w-20 object-contain' 
        />
      </div>
    </div>
  )
}

export default OptionCard