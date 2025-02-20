import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState(null);
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images';
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem('accessToken');

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const getBrands = () => {
    setLoading(true);
    axios({
      url: 'https://realauto.limsa.uz/api/brands',
      method: 'GET',
    }).then((res) => {
      setBrands(res.data.data);
    }).finally(() => {
      setLoading(false);
    });
  };

  const addBrand = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('title', title);
    if (images) {
      formdata.append('images', images);
    }

    axios({
      url: 'https://realauto.limsa.uz/api/brands',
      method: 'POST',
      data: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      toast.success('Brand Added');
      getBrands();
      setOpenModal(false);
    }).catch((err) => {
      toast.error('Brand could not be added');
    });
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <button className="text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2" onClick={handleOpenModal}>
        Add brand
      </button>

      {openModal && (
        <form
          className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={addBrand}
        >
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
              Add
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-3 pt-5 gap-5">
        {loading ? (
          <div className="m-auto text-[30px] font-bold">Loading...</div>
        ) : (
          brands.map((brand) => (
            <div className="grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]" key={brand.id}>
              <div className="flex justify-between">
                <h1 className="text-white text-[24px]">Name:</h1>
                <p className="text-white text-[24px]">{brand.title}</p>
              </div>
              <img
                className="w-[450px] h-[200px]"
                src={`${imageUrl}/${brand.image_src}`}
                alt={brand.title}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Brands;
