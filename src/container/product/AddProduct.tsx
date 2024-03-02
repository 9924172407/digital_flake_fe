import React, { useState } from 'react';
import CustomInput from '../../components/form/CustomInput';
import CustomSelect from '../../components/form/CustomSelect';
import { Api } from '../../api/api';
import { PrimaryButton, SecondaryButton } from '../../components/form/CustomButton';
import { statusData } from '../../constants';
import leftArrow from "../../assets/arrowLeft.png"
import { useSelector } from 'react-redux';
import { getCategory } from '../../redux/slices/categorySlice';
import { showToast } from '../../components/Toaster';
import CustomUpload from '../../components/form/CustomUpload';

export const AddProduct: React.FC = () => {
    const categories = useSelector(getCategory)
    const [formData, setFormData] = useState({
        productName: "",
        categoryId: "",
        packSize: "",
        price: "",
        productImage: null,
        status: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === 'categoryId') {
            setFormData((prev) => ({
                ...prev,
                categoryId: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files && e.target.files[0];

        if (file) {
            setFormData((prev: any) => ({
                ...prev,
                productImage: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        const res = await Api.createProduct(formDataToSend);
        if (res.status === 200) showToast(res.data.message, 'success')
    };

    return (
        <div className='w-full m-3 relative'>
            <div className='flex gap-2 m-5 align-middle'>
                <img src={leftArrow} className='h-3 w-auto my-auto' />
                <h1 className='text-black text-xl font-bold'> Add Product</h1>
            </div>

            <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-between'>
                <CustomSelect
                    label='CategoryName'
                    name='categoryId'
                    options={categories?.map((category: any) => ({
                        value: category._id,
                        label: category.categoryName,
                    }))}
                    onChange={handleInputChange}
                    value={formData.categoryId}
                />

                <CustomInput label='ProductName' name='productName' placeholder='Enter Product Name' value={formData.productName} onChange={handleInputChange} required={true} />
                <CustomInput label='Pack Size' name='packSize' placeholder='Enter Pack Size' value={formData.packSize} onChange={handleInputChange} required={true} />
                <CustomInput label='MRP' name='price' placeholder='Enter MRP of Product' value={formData.price} onChange={handleInputChange} required={true} />
                <CustomUpload label='Product Image' type='file' name='productImage' onChange={handleUploadImage} required={true} placeholder='' />

                <CustomSelect label='Status' name='status' options={statusData} onChange={handleInputChange} value={formData.status} />

                <div className='absolute bottom-5 right-3 gap-5'>
                    <SecondaryButton label='Cancel' />
                    <PrimaryButton type="submit" label='Save' />
                </div>
            </form>
        </div>
    );
};
