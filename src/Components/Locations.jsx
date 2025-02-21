import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images';
  const token = localStorage.getItem('accessToken');

  const getLocations = () => {
    setLoading(true);
    axios.get('https://realauto.limsa.uz/api/locations')
      .then(res => setLocations(res.data.data))
      .catch(() => toast.error('Error loading locations'))
      .finally(() => setLoading(false));
  };

  const addOrUpdateLocation = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    if (images) formData.append('images', images);

    const url = selectedLocation ? `https://realauto.limsa.uz/api/locations/${selectedLocation.id}` : 'https://realauto.limsa.uz/api/locations';
    const method = selectedLocation ? 'PUT' : 'POST';

    axios({ url, method, data: formData, headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        toast.success(`Location ${selectedLocation ? 'Updated' : 'Added'}`);
        getLocations();
        closeModal();
      })
      .catch(() => toast.error('Location could not be added'));
  };

  const deleteLocation = () => {
    axios.delete(`https://realauto.limsa.uz/api/locations/${selectedLocation.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success('Location deleted');
        getLocations();
        setDeleteModal(false);
      })
      .catch(() => toast.error('Error deleting location'));
  };

  const openEditModal = (location) => {
    setSelectedLocation(location);
    setName(location.name);
    setText(location.text);
    setOpenModal(true);
  };

  const openDeleteModal = (location) => {
    setSelectedLocation(location);
    setDeleteModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setDeleteModal(false);
    setSelectedLocation(null);
    setName('');
    setText('');
    setImages(null);
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div>
      <button className='text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2' onClick={() => setOpenModal(true)}>
        Add Location
      </button>

      {openModal && (
        <form className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4" onSubmit={addOrUpdateLocation}>
          <h2 className="text-xl font-bold mb-2">{selectedLocation ? 'Edit' : 'Add'} Location</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2">Location Name</label>
          <input className="border rounded w-full py-2 px-3 mb-3" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label className="block text-gray-700 text-sm font-bold mb-2">Location Description</label>
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
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteLocation}>Yes</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>No</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 pt-5 gap-5">
        {loading ? (
          <div className="m-auto text-[30px] font-bold">Loading...</div>
        ) : (
          locations.map(location => (
            <div className='grid gap-5 p-5 bg-gray-700 rounded-[20px] text-white' key={location.id}>
              <h1 className='text-[24px]'>{location.name}</h1>
              <p className='text-[18px]'>{location.text}</p>
              <img className='w-[300px] h-[200px] object-cover rounded' src={`${imageUrl}/${location.image_src}`} alt={location.name} />
              <div className='flex justify-between'>
                <button className='bg-blue-500 px-3 py-1 rounded' onClick={() => openEditModal(location)}>Edit</button>
                <button className='bg-red-500 px-3 py-1 rounded' onClick={() => openDeleteModal(location)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Locations;