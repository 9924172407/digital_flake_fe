import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Api } from '../../api/api';
import categoryIcon from '../../assets/productIcon.png';
import DataGrid, { Column } from 'react-data-grid';
import CustomSearchBar from '../../components/form/CustomSearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../components/Toaster';
import { getProduct, setProducts } from '../../redux/slices/productSlice';
import { BASE_URL } from '../../constants';
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/dustbin.png";
import CustomDialog from '../../components/CustomDialog';

interface productData {
    _id: string;
    categoryId: string;
    categoryName: string;
    productName: string;
    packSize: number;
    productImage: string;
    price: number;
    status: boolean;
}

const Product: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProduct);
    const [data, setData] = useState<productData[]>(products);
    const [search, setSearch] = useState<string>('');
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const getProductList = async () => {
        await Api.getProduct().then((res) => {
            if (res.status === 200) {
                dispatch(setProducts(res.data));
                showToast(res.data.message, 'success');
            }
        });
    };

    useEffect(() => {
        if (!products.length) {
            getProductList();
            setData(products);
        } else {
            setData(products);
        }
    }, [products]);

    const cols: Column<productData>[] = [
        {
            key: '_id',
            name: 'ID',
            width: 80,
            renderCell: ({ row }) => <span className='m-auto text-center'> {data.indexOf(row) + 1}</span>,
            sortable: true,
        },
        { key: 'categoryName', name: 'Category', sortable: true },
        { key: 'productName', name: 'Product Name', sortable: true },
        { key: 'packSize', name: 'Pack Size', sortable: true },
        { key: 'price', name: 'Price', sortable: true },
        {
            key: 'productImage', name: 'Image', sortable: true,
            renderCell: ({ row }) => (
                <>
                    <img src={BASE_URL + row.productImage} className='h-12 w-auto ' />
                </>
            ),
        },
        {
            key: 'status',
            name: 'Status',
            sortable: true,
            renderCell: ({ row }) => (row.status ? <span className='text-green-500'>Active</span> : <span className='text-red-500'>Inactive</span>),
        },
        {
            key: '_id', name: '', sortable: true,
            renderCell: ({ row }) => (
                <>
                    <img src={editIcon} className='h-5 w-auto m-1 ' />
                </>
            ),
        },
        {
            key: '_id', name: '', sortable: true,
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
        const temp = products.filter((item) =>
            item.productName.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (inputValue) {
            setData(temp);
        } else {
            setData(products);
        }
    };
    const handleShowDialog = (id: string) => {
        setSelectedProductId(id);
        setShowDialog(true);
    };
    const handleDeleteProduct = async (id: string) => {
        try {
            const res = await Api.deleteProduct(id);
            if (res.status === 200) {
                showToast(res.data.message, 'success');
                getProductList();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const handleDeleteConfirmation = () => {
        if (selectedProductId) {
            handleDeleteProduct(selectedProductId);
            setShowDialog(false);
        }
    };
    return (
        <>
            <div className='m-5 shadow-lg w-full rounded-xl h-full p-5'>
                <CustomSearchBar
                    icon={categoryIcon}
                    title='Product'
                    path='/product/add-edit'
                    onSearch={handleSearch}
                />
                <DataGrid className='w-full' columns={cols} rows={data} rowKeyGetter={rowKeyGetter} />
            </div>
            <CustomDialog
                isOpen={showDialog}
                title='Delete ' onClose={() => setShowDialog(false)}
                description='Are you sure you want to delete ?'
                onCancel={() => setShowDialog(false)}
                onConfirm={handleDeleteConfirmation}>
            </CustomDialog></>
    );
};

export default Product;
