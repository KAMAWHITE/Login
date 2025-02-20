import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Cities() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [name, setTitle] = useState('')
  const [text, setText] = useState('')
  const [images, setImages] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  const token = localStorage.getItem('accessToken')

  const getCities = () => {
    setLoading(true)
    axios({
      url: 'https://realauto.limsa.uz/api/cities',
      method: 'GET'
    })
      .then(res => {
        setCities(res.data.data)
      })
      .catch(err => {
        toast.error('Error loading cities')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const addCity = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('name', name)
    formdata.append('text', text)
    if (images) {
      formdata.append('images', images)
    }

    axios({
      url: 'https://realauto.limsa.uz/api/cities',
      method: 'POST',
      data: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success('City Added')
        getCities()
        setOpenModal(false)
      })
      .catch((err) => {
        toast.error('City could not be added')
      })
  }

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    getCities()
  }, [])

  return (
    <div>
      <button className='text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2' onClick={handleOpenModal}>
        Add City
      </button>

      {!openModal ? (
        <form
          className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={addCity}
        >
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cityName">
              City Name
            </label>
            <input
              className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={name}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cityText">
              City Description
            </label>
            <input
              className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cityImage">
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              onChange={(e) => setImages(e.target.files[0])}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add City
            </button>
          </div>
        </form>
      ) : (
        ''
      )}

      <div className="grid grid-cols-3 pt-5 gap-5">
        {loading ? (
          <div className="m-auto text-[30px] font-bold">Loading...</div>
        ) : (
          cities.map(city => (
            <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={city.id}>
              <div className='flex justify-between'>
                <h1 className='text-white text-[24px]'>{city.name}</h1>
                <p className='text-white text-[24px]'>{city.text}</p>
              </div>
              <img
                className='w-[450px] h-[200px]'
                src={`${imageUrl}/${city.image_src}`}
                alt={city.name}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Cities
