import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Models() {
  const [models, setModels] = useState([])
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  const getModels = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/models',
      method: 'GET'
    }).then(res => {
      setModels(res.data.data)
    })
  }
  useEffect(() => {
    getModels()
  }, [])
  return (
    <div className='grid grid-cols-3 pt-5 gap-5'>
      {
        models.map(model => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px] text-white' key={model.id}>
            <h1>{model.brand_title}</h1>
            <h1>{model.name}</h1>
            <h1>{model.id}</h1>
          </div>
        ))
      }
    </div>
  )
}

export default Models