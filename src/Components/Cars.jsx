import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Cars() {
  const [cars, setCars] = useState([])
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  const getCars = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/cars',
      method: 'GET'
    }).then(res => {
      setCars(res.data.data)
    })
  }
  useEffect(() => {
    getCars()
  }, [])
  return (
    <div className='grid grid-cols-3 pt-5 gap-5'>
      {
        cars.map(car => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={car.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>{car.name}</h1>
              <p className='text-white text-[24px]'>{car.text}</p>
            </div>
            <img className='w-[450px] h-[200px]' src={`${imageUrl}/${car.image_src}`} alt={car.name_en} />
          </div>
        ))
      }
    </div>
  )
}

export default Cars