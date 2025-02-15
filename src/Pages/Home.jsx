import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className='max-w-[1200px] mx-auto'>
      <div className='grid grid-cols-[2fr_7fr] gap-5'>
        <div className='bg-[#01002b] h-[100vh] sticky top-0'>
          <div className='grid grid-cols-1 p-5 text-white gap-3 text-[18px]'>
            <h1 className='text-[25px] font-bold'>Apies</h1>
            <NavLink
              to='/home/categories'
              className={({ isActive }) =>
                `pt-10 ${isActive ? 'text-[#7f7f7f]' : ''}`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to='/home/brands'
              className={({ isActive }) =>
                `${isActive ? 'text-[#7f7f7f]' : ''}`
              }
            >
              Brands
            </NavLink>
            <NavLink
              to='/home/cities'
              className={({ isActive }) =>
                `${isActive ? 'text-[#7f7f7f]' : ''}`
              }
            >
              Cities
            </NavLink>
            <NavLink
              to='/home/locations'
              className={({ isActive }) =>
                `${isActive ? 'text-[#7f7f7f]' : ''}`
              }
            >
              Locations
            </NavLink>
            <NavLink
              to='/home/cars'
              className={({ isActive }) =>
                `${isActive ? 'text-[#7f7f7f]' : ''}`
              }
            >
              Cars
            </NavLink>
            <NavLink
              to='/home/models'
              className={({ isActive }) =>
                `${isActive ? 'text-[#7f7f7f]' : ''}`
              }
            >
              Models
            </NavLink>
          </div>
        </div>
        <div className='bg-white'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;