import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Cities() {
  const [cities, setCities] = useState([])
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  const getCities = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/cities',
      method: 'GET'
    }).then(res => {
      setCities(res.data.data)
    })
  }
  useEffect(() => {
    getCities()
  }, [])
  return (
    <div className='grid grid-cols-3 pt-5 gap-5'>
      {
        cities.map(city => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={city.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>{city.name}</h1>
              <p className='text-white text-[24px]'>{city.text}</p>
            </div>
            <img className='w-[450px] h-[200px]' src={`${imageUrl}/${city.image_src}`} alt={city.name_en} />
          </div>
        ))
      }
    </div>
  )
}

export default Cities