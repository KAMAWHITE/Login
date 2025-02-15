import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Locations() {
  const [locations, setLocations] = useState([])
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  const getLocations = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/locations',
      method: 'GET'
    }).then(res => {
      setLocations(res.data.data)
    })
  }
  useEffect(() => {
    getLocations()
  }, [])
  return (
    <div className='grid grid-cols-3 pt-5 gap-5'>
      {
        locations.map(location => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={location.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>{location.name}</h1>
              <p className='text-white text-[24px]'>{location.text}</p>
            </div>
            <img className='w-[450px] h-[200px]' src={`${imageUrl}/${location.image_src}`} alt={location.name_en} />
          </div>
        ))
      }
    </div>
  )
}

export default Locations