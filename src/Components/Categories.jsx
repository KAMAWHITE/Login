import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Categories() {
  const [categories, setCategories] = useState([])
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  const getCategory = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/categories',
      method: 'GET'
    }).then(res => {
      setCategories(res.data.data)
    })
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <div className='grid grid-cols-2 pt-5 gap-5'>
      {
        categories.map(category => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={category.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{category.name_en}</p>
            </div>
            <img className='w-[450px] h-[300px]' src={`${imageUrl}/${category.image_src}`} alt={category.name_en} />
          </div>
        ))
      }
    </div>
  )
}

export default Categories