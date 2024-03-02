import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Api } from '../../api/api';
import categoryIcon from '../../assets/productIcon.png';
import DataGrid, { Column } from 'react-data-grid';
import CustomSearchBar from '../../components/form/CustomSearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../components/Toaster';
import { getCategory, setCategories } from '../../redux/slices/categorySlice';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/dustbin.png';
import CustomDialog from '../../components/CustomDialog';

interface CategoryData {
  _id: string;
  categoryName: string;
  description: string;
  status: boolean;
}

const Category: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategory);
  const [data, setData] = useState<CategoryData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const getCategories = () => {
    Api.getCategories().then((res) => {
      if (res.status === 200) {
        dispatch(setCategories(res.data.data));
        showToast(res.data.message, 'success');
      }
    });
  };

  useEffect(() => {
    if (!categories.length) {
      getCategories();
      setData(categories);
    } else {
      setData(categories);
    }
  }, [categories]);

  const cols: Column<CategoryData>[] = [
    {
      key: '_id',
      name: 'ID',
      width: 80,
      renderCell: ({ row }) => <span className='m-auto text-center'> {data.indexOf(row) + 1}</span>,
      sortable: true,
    },
    { key: 'categoryName', name: 'Category Name', sortable: true },
    { key: 'description', name: 'Description', sortable: true },
    {
      key: 'status',
      name: 'Status',
      sortable: true,
      renderCell: ({ row }) => (row.status ? 'Active' : 'Inactive'),
    },
    {
      key: '_id',
      name: '',
      sortable: true,
      renderCell: ({ row }) => (
        <>
          <img src={editIcon} className='h-5 w-auto m-1 ' />
        </>
      ),
    },
    {
      key: '_id',
      name: '',
      sortable: true,
      renderCell: ({ row }) => (
        <img
          src={deleteIcon}
          className={`h-5 w-auto m-1 ${row.status ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
          onClick={() => row.status && handleShowDialog(row._id)}
        />
      ),
    },
  ];

  const rowKeyGetter = (row: { id: string }) => row.id;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    const temp = categories.filter((item) =>
      item.categoryName.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (inputValue) {
      setData(temp);
    } else {
      setData(categories);
    }
  };

  const handleShowDialog = (id: string) => {
    setSelectedCategoryId(id);
    setShowDialog(true);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await Api.deleteCategory(id);
      if (res.status === 200) {
        showToast(res.data.message, 'success');
        getCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteConfirmation = () => {
    if (selectedCategoryId) {
      handleDeleteCategory(selectedCategoryId);
      setShowDialog(false);
    }
  };

  return (<>
    <div className='m-5 shadow-lg w-full rounded-xl h-full p-5 z-10'>
      <CustomSearchBar
        icon={categoryIcon}
        title='Category'
        path='/category/add-edit'
        onSearch={handleSearch}
      />
      <DataGrid columns={cols} rows={data} rowKeyGetter={rowKeyGetter} />
    </div>
    <CustomDialog
      isOpen={showDialog}
      title='Delete'
      onClose={() => setShowDialog(false)}
      description='Are you sure you want to delete ?'
      onCancel={() => setShowDialog(false)}
      onConfirm={handleDeleteConfirmation}
    />
  </>
  );
};

export default Category;
