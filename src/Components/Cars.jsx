import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images';
  const token = localStorage.getItem('accessToken');

  const getCars = () => {
    setLoading(true);
    axios.get('https://realauto.limsa.uz/api/cars')
      .then((res) => {
        setCars(res.data.data);
      })
      .catch(() => {
        toast.error('Failed to fetch cars');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addCar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    if (images) {
      formData.append('images', images);
    }

    axios.post('https://realauto.limsa.uz/api/cars', formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        toast.success('Car Added');
        getCars();
        setOpenModal(false);
      })
      .catch(() => {
        toast.error('Car could not be added');
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div>
      <button className='text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2' onClick={() => setOpenModal(true)}>
        Add Car
      </button>

      {openModal && (
        <form className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4 absolute top-20 left-1/2 transform -translate-x-1/2" onSubmit={addCar}>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Car Name</label>
            <input className="shadow border rounded w-[300px] py-2 px-3 text-gray-700" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Car Description</label>
            <input className="shadow border rounded w-[300px] py-2 px-3 text-gray-700" type="text" value={text} onChange={(e) => setText(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input className="shadow border rounded w-[300px] py-2 px-3 text-gray-700" type="file" onChange={(e) => setImages(e.target.files[0])} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Add Car</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setOpenModal(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-3 pt-5 gap-5">
        {loading ? (
          <div className="m-auto text-[30px] font-bold">Loading...</div>
        ) : (
          cars.map((car) => (
            <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={car.id}>
              <div className='flex justify-between'>
                <h1 className='text-white text-[24px]'>{car.name}</h1>
                <p className='text-white text-[24px]'>{car.text}</p>
              </div>
              {car.image_src && <img className='w-[450px] h-[200px] object-cover rounded-lg' src={`${imageUrl}/${car.image_src}`} alt={car.name} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cars;
