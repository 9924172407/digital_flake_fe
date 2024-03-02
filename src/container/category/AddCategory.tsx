import React, { useState } from 'react';
import CustomInput from '../../components/form/CustomInput';
import CustomSelect from '../../components/form/CustomSelect';
import { Api } from '../../api/api';
import { PrimaryButton, SecondaryButton } from '../../components/form/CustomButton';
import { statusData } from '../../constants';
import LeftArrow from "../../assets/arrowLeft.png";
import { showToast } from '../../components/Toaster';

export const AddCategory: React.FC = () => {
    const [formData, setFormData] = useState({
        categoryName: "",
        description: "",
        status: true
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await Api.createCategory(formData);
        if (res.status === 200) {
            showToast(res.data.message, 'success');
        }
        if (res.status === 422) showToast("Category Name must be Unique", 'success');

    };

    return (
        <div className='w-full rounded-lg shadow-xl m-2'>
            <div className='flex gap-2 m-5 align-middle'>
                <img src={LeftArrow} className='h-3 w-auto my-auto' />
                <h1 className='text-black text-xl font-bold'> Add Category</h1>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-wrap xl:flex-nowrap justify-between'>
                <CustomInput label='Category Name' name='categoryName' placeholder='Enter Category Name' value={formData.categoryName} onChange={handleInputChange} required={true} />
                <br />
                <CustomInput label='Description' name='description' placeholder='Enter Description' value={formData.description} onChange={handleInputChange} required={true} />
                <br />
                <CustomSelect label='Status' name='status' options={statusData} onChange={handleInputChange} value={formData.status} />
                <br />
                <div className='absolute bottom-5 right-3 gap-5'>
                    <SecondaryButton label='Cancel' />
                    <PrimaryButton type="submit" label='Save' />
                </div>
            </form>
        </div>
    );
};
