import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images';
  const token = localStorage.getItem('accessToken');

  const handleOpenModal = (brand = null) => {
    setOpenModal(true);
    if (brand) {
      setSelectedBrand(brand);
      setTitle(brand.title);
    } else {
      setSelectedBrand(null);
      setTitle('');
      setImages(null);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBrand(null);
    setTitle('');
    setImages(null);
  };

  const getBrands = () => {
    setLoading(true);
    axios.get('https://realauto.limsa.uz/api/brands')
      .then((res) => setBrands(res.data.data))
      .finally(() => setLoading(false));
  };

  const saveBrand = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (images) formData.append('images', images);

    axios({
      url: selectedBrand ? `https://realauto.limsa.uz/api/brands/${selectedBrand.id}` : 'https://realauto.limsa.uz/api/brands',
      method: selectedBrand ? 'PUT' : 'POST',
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      toast.success(selectedBrand ? 'Brand Updated' : 'Brand Added');
      getBrands();
      handleCloseModal();
    }).catch(() => {
      toast.error('Brand could not be saved');
    });
  };

  const handleDeleteBrand = () => {
    axios.delete(`https://realauto.limsa.uz/api/brands/${selectedBrand.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      toast.success('Brand Deleted');
      getBrands();
      setDeleteModal(false);
      setSelectedBrand(null);
    }).catch(() => {
      toast.error('Brand could not be deleted');
    });
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded" onClick={() => handleOpenModal()}>Add Brand</button>

      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <form className="bg-white p-6 rounded shadow-lg w-96" onSubmit={saveBrand}>
            <h2 className="text-xl font-bold mb-4">{selectedBrand ? 'Edit Brand' : 'Add Brand'}</h2>
            <input className="w-full mb-2 p-2 border rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brand Title" />
            <input className="w-full mb-2 p-2 border rounded" type="file" onChange={(e) => setImages(e.target.files[0])} />
            <div className="flex justify-between">
              <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Save</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCloseModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <div className="flex justify-between">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteBrand}>Yes</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setDeleteModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mt-4">
        {loading ? (
          <p className="col-span-3 text-center">Loading...</p>
        ) : (
          brands.map((brand) => (
            <div key={brand.id} className="p-4 bg-gray-200 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{brand.title}</h3>
              <img className="w-full h-40 object-cover my-2" src={`${imageUrl}/${brand.image_src}`} alt={brand.title} />
              <div className="flex justify-between">
                <button className="bg-yellow-500 text-white px-4 py-1 rounded" onClick={() => handleOpenModal(brand)}>Edit</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => { setSelectedBrand(brand); setDeleteModal(true); }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Brands;
