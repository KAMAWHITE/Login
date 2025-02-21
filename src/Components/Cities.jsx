import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Cities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images';
  const token = localStorage.getItem('accessToken');

  const getCities = () => {
    setLoading(true);
    axios.get('https://realauto.limsa.uz/api/cities')
      .then(res => setCities(res.data.data))
      .catch(() => toast.error('Error loading cities'))
      .finally(() => setLoading(false));
  };

  const addOrUpdateCity = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('text', text);
    if (images) formdata.append('images', images);

    const url = selectedCity ? `https://realauto.limsa.uz/api/cities/${selectedCity.id}` : 'https://realauto.limsa.uz/api/cities';
    const method = selectedCity ? 'PUT' : 'POST';

    axios({ url, method, data: formdata, headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        toast.success(`City ${selectedCity ? 'Updated' : 'Added'}`);
        getCities();
        closeModal();
      })
      .catch(() => toast.error('City could not be added'));
  };

  const deleteCity = () => {
    axios.delete(`https://realauto.limsa.uz/api/cities/${selectedCity.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success('City deleted');
        getCities();
        setDeleteModal(false);
      })
      .catch(() => toast.error('Error deleting city'));
  };

  const openEditModal = (city) => {
    setSelectedCity(city);
    setName(city.name);
    setText(city.text);
    setOpenModal(true);
  };

  const openDeleteModal = (city) => {
    setSelectedCity(city);
    setDeleteModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setDeleteModal(false);
    setSelectedCity(null);
    setName('');
    setText('');
    setImages(null);
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div>
      <button className='text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2' onClick={() => setOpenModal(true)}>
        Add City
      </button>

      {openModal && (
        <form className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4" onSubmit={addOrUpdateCity}>
          <h2 className="text-xl font-bold mb-2">{selectedCity ? 'Edit' : 'Add'} City</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2">City Name</label>
          <input className="border rounded w-full py-2 px-3 mb-3" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label className="block text-gray-700 text-sm font-bold mb-2">City Description</label>
          <input className="border rounded w-full py-2 px-3 mb-3" type="text" value={text} onChange={(e) => setText(e.target.value)} required />
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input className="border rounded w-full py-2 px-3 mb-3" type="file" onChange={(e) => setImages(e.target.files[0])} />
          <div className="flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      )}

      {deleteModal && (
        <div className="bg-white shadow-md w-[300px] rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
          <div className="flex justify-between">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteCity}>Yes</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>No</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 pt-5 gap-5">
        {loading ? (
          <div className="m-auto text-[30px] font-bold">Loading...</div>
        ) : (
          cities.map(city => (
            <div className='grid gap-5 p-5 bg-gray-700 rounded-[20px] text-white' key={city.id}>
              <h1 className='text-[24px]'>{city.name}</h1>
              <p className='text-[18px]'>{city.text}</p>
              <img className='w-[300px] h-[200px] object-cover rounded' src={`${imageUrl}/${city.image_src}`} alt={city.name} />
              <div className='flex justify-between'>
                <button className='bg-blue-500 px-3 py-1 rounded' onClick={() => openEditModal(city)}>Edit</button>
                <button className='bg-red-500 px-3 py-1 rounded' onClick={() => openDeleteModal(city)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cities;
