import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Brands() {
  const [brands, setBrands] = useState([])
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  const getBrands = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/brands',
      method: 'GET'
    }).then(res => {
      setBrands(res.data.data)
    })
  }
  useEffect(() => {
    getBrands()
  }, [])
  return (
    <div className='grid grid-cols-3 pt-5 gap-5'>
      {
        brands.map(brand => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={brand.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{brand.title}</p>
            </div>
            <img className='w-[450px] h-[200px]' src={`${imageUrl}/${brand.image_src}`} alt={brand.title} />
          </div>
        ))
      }
    </div>
  )
}

export default Brands