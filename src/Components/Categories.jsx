import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Load from '../assets/loading.svg'

function Categories() {
  const [categories, setCategories] = useState([]);
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images';
  const [loading, setLoading] = useState(false);
  const [nameUz, setNameUz] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [images, setImages] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const token = localStorage.getItem('accessToken');
  const [selectedItem, setselectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
    if (openModal) {
      setNameUz('');
      setNameRu('');
      setImages(null);
      setselectedItem(null);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setselectedItem(null);
  };

  const getCategory = () => {
    setLoading(true);
    axios.get('https://realauto.limsa.uz/api/categories')
      .then((res) => setCategories(res.data.data))
      .finally(() => setLoading(false));
  };

  const addCategory = (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData();
    formdata.append('name_en', nameUz);
    formdata.append('name_ru', nameRu);
    if (images) formdata.append('images', images);

    axios({
      url: `https://realauto.limsa.uz/api/categories/${selectedItem?.id || ''}`,
      method: selectedItem ? 'PUT' : 'POST',
      data: formdata,
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      toast.success(selectedItem ? 'Category Updated' : 'Category Added');
      getCategory();
      setOpenModal(false);
    }).catch(() => toast.error('Category could not be added'))
      .finally(() => setLoading(false));
  };

  const showEdit = (category) => {
    setselectedItem(category);
    setOpenModal(false);
    setNameUz(category.name_en);
    setNameRu(category.name_ru);
  };

  const deleteCategory = () => {
    if (!itemToDelete) return;
    axios.delete(`https://realauto.limsa.uz/api/categories/${itemToDelete.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      toast.success('Deleted successfully');
      getCategory();
      setConfirmDelete(false);
      setItemToDelete(null);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <button className='text-[20px] font-bold bg-[#01002b] text-white px-5 py-3 rounded-[15px] mt-2' onClick={handleOpenModal}>Add category</button>
      {!openModal && (
        <form className="bg-white shadow-md w-[364px] rounded px-8 pt-6 pb-8 mb-4" onSubmit={addCategory}>
          <p className="text-xl font-bold">{selectedItem ? "Edit" : "Add"}</p>
          <button onClick={closeModal} className="absolute top-2 right-2 text-red-500">X</button>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Uzbek Name</label>
            <input className="shadow border rounded w-[300px] py-2 px-3 text-gray-700" type="text" value={nameUz} onChange={(e) => setNameUz(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Russian Name</label>
            <input className="shadow border rounded w-[300px] py-2 px-3 text-gray-700" type="text" value={nameRu} onChange={(e) => setNameRu(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input className="shadow border rounded w-[300px] py-2 px-3 text-gray-700" type="file" onChange={(e) => setImages(e.target.files[0] || images)} />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={loading}>
            {loading ? <img src={Load} alt="Loading..." className="w-6 h-6" /> : "Save"}
          </button>
        </form>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-bold">Are you sure you want to delete this category?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={deleteCategory} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Yes</button>
              <button onClick={() => setConfirmDelete(false)} className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded">No</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 pt-5 gap-5">
        {loading ? (
          <div className="m-auto text-[30px] font-bold">Loading...</div>
        ) : (
          categories.map((category) => (
            <div className="grid grid-cols-1 gap-5 p-5 bg-gray-200 rounded-2xl" key={category.id}>
              <div className="flex justify-between">
                <h1 className="text-black text-[24px]">Name:</h1>
                <p className="text-black text-[24px]">{category.name_en}</p>
              </div>
              <img className="w-[300px] h-[200px]" src={`${imageUrl}/${category.image_src}`} alt={category.name_en} />
              <button onClick={() => showEdit(category)} className="bg-green-500 text-white px-4 py-2 rounded">Edit</button>
              <button onClick={() => { setItemToDelete(category); setConfirmDelete(true); }} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Categories;
