import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Locations() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [images, setImages] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  const token = localStorage.getItem('accessToken')

  const getLocations = () => {
    setLoading(true)
    axios({
      url: 'https://realauto.limsa.uz/api/locations',
      method: 'GET'
    })
      .then(res => {
        setLocations(res.data.data)
      })
      .catch(err => {
        toast.error('Error loading locations')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const addLocation = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('name', name)
    formdata.append('text', text)
    if (images) {
      formdata.append('images', images)
    }

    axios({
      url: 'https://realauto.limsa.uz/api/locations',
      method: 'POST',
      data: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success('Location Added')
        getLocations()
        setOpenModal(false)
      })
      .catch((err) => {
        toast.error('Location could not be added')
      })
  }

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    getLocations()
  }, [])

  return (
    <div>
      <button className='text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2' onClick={handleOpenModal}>
        Add Location
      </button>

      {!openModal ? (
        <form
          className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={addLocation}
        >
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="locationName">
              Location Name
            </label>
            <input
              className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="locationText">
              Location Description
            </label>
            <input
              className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="locationImage">
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
              Add Location
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
          locations.map(location => (
            <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={location.id}>
              <div className='flex justify-between'>
                <h1 className='text-white text-[24px]'>{location.name}</h1>
                <p className='text-white text-[24px]'>{location.text}</p>
              </div>
              <img
                className='w-[450px] h-[200px]'
                src={`${imageUrl}/${location.image_src}`}
                alt={location.name}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Locations
