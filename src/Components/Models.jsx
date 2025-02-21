import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Models() {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brand_id, setBrandId] = useState('');
  const [name, setName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem('accessToken');

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const getModels = () => {
    setLoading(true);
    axios.get('https://realauto.limsa.uz/api/models')
      .then(res => setModels(res.data.data))
      .catch(() => toast.error('Failed to fetch models'))
      .finally(() => setLoading(false));
  };

  const getBrands = () => {
    axios.get('https://realauto.limsa.uz/api/brands')
      .then(res => setBrands(res.data.data))
      .catch(() => toast.error('Failed to fetch brands'));
  };

  const addModel = (e) => {
    e.preventDefault();

    if (!brand_id) {
      toast.error('Please select a valid brand');
      return;
    }

    const formData = new FormData();
    formData.append('brand_id', brand_id);
    formData.append('name', name);

    axios.post('https://realauto.limsa.uz/api/models', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success('Model Added');
        getModels();
        setOpenModal(false);
      })
      .catch(() => toast.error('Model could not be added'));
  };

  const deleteModel = (id) => {
    axios.delete(`https://realauto.limsa.uz/api/models/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success('Model Deleted');
        getModels();
      })
      .catch(() => toast.error('Failed to delete model'));
  };

  const updateModel = (id) => {
    if (!name) {
      toast.error('Please enter a model name');
      return;
    }

    axios.put(`https://realauto.limsa.uz/api/models/${id}`, { name, brand_id }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success('Model Updated');
        getModels();
      })
      .catch(() => toast.error('Failed to update model'));
  };

  useEffect(() => {
    getModels();
    getBrands();
  }, []);

  return (
    <>
      <button className="text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2" onClick={handleOpenModal}>
        Add Model
      </button>
      {openModal && (
        <form className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4" onSubmit={addModel}>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
            <select className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={brand_id} onChange={(e) => setBrandId(e.target.value)}>
              <option value="">Select a brand</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Model Name</label>
            <input className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Add</button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-3 pt-5 gap-5">
        {loading ? (
          <div className="m-auto text-[30px] font-bold">Loading...</div>
        ) : (
          models.map(model => (
            <div className="grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px] text-white" key={model.id}>
              <h1>{model.name}</h1>
              <h1>{model.brand_id}</h1>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteModel(model.id)}>Delete</button>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => updateModel(model.id)}>Edit</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Models;