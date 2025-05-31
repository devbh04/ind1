import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 text-black py-4">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start">
        
        <div className="flex flex-col items-center lg:pl-36 w-full lg:w-auto">
          <div className='flex items-center'>
            <p className='text-4xl text-green-900'>N</p>
            <img src="/unstop-logo.png" alt="" className='h-14'/>
          </div>
          <p className="mt-4 text-lg text-gray-400 text-center">&copy; 2025 DunStop. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start space-x-0 lg:space-x-12 mt-8 lg:mt-0 w-full lg:w-auto lg:pr-52">
          <div className="text-center p-4 lg:text-left mb-8 lg:mb-0">
            <h3 className="text-xl font-semibold mb-3 flex justify-center">Socials</h3>
            <div className='flex gap-4'>
              <ul className="space-y-2 text-gray-400 text-lg">
                <li><a className="hover:text-green-800">Twitter</a></li>
                <li><a className="hover:text-green-800">Discord</a></li>
              </ul>
              <ul className="space-y-2 text-gray-400 text-lg">
                <li><a className="hover:text-green-800">Instagram</a></li>
                <li><a className="hover:text-green-800">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;