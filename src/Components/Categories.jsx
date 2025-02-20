import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Categories() {
  const [categories, setCategories] = useState([]);
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images';
  const [loading, setLoading] = useState(false);
  const [nameUz, setNameUz] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [images, setImages] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  const token = localStorage.getItem('accessToken');

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const getCategory = () => {
    setLoading(true);
    axios({
      url: 'https://realauto.limsa.uz/api/categories',
      method: 'GET',
    }).then((res) => {
      setCategories(res.data.data);
    }).finally(() => {
      setLoading(false);
    });
  };

  const addCategory = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name_en', nameUz);
    formdata.append('name_ru', nameRu);
    if (images) {
      formdata.append('images', images);
    }

    axios({
      url: 'https://realauto.limsa.uz/api/categories',
      method: 'POST',
      data: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      toast.success('Category Added');
      getCategory();
      setOpenModal(false)
    }).catch((err) => {
      toast.error('Category could not be added');
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <button className='text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2' onClick={handleOpenModal}>Add category</button>
      {!openModal ? (
        <form
          className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={addCategory}
        >
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Uzbek Name
            </label>
            <input
              className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={nameUz}
              onChange={(e) => setNameUz(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Russian Name
            </label>
            <input
              className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
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
      ) : (
        ''
      )}
      <div className="grid grid-cols-3 pt-5 gap-5">
        {loading ? (
          <div className="m-auto text-[30px] font-bold">Loading...</div>
        ) : (
          categories.map((category) => (
            <div className="grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]" key={category.id}>
              <div className="flex justify-between">
                <h1 className="text-white text-[24px]">Name:</h1>
                <p className="text-white text-[24px]">{category.name_en}</p>
              </div>
              <img
                className="w-[300px] h-[200px]"
                src={`${imageUrl}/${category.image_src}`}
                alt={category.name_en}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Categories;
