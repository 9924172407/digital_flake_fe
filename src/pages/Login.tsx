import React, { useState } from 'react'
import bgImage from "../assets/bg_image.png"
import CustomInput from '../components/form/CustomInput'
import CustomButton from '../components/form/CustomButton'
import logo from "../assets/logo.png"
import { Api } from '../api/api'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { setUser } from '../redux/slices/userSlice'
import { getJwtToken } from '../utils/helper'
import { showToast } from '../components/Toaster'

interface formData {
  email: string,
  password: string
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: ""
  })
  if (getJwtToken()) return <Navigate to={'/'} />
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await Api.loginApi(formData)
    dispatch(setUser(res.data));
    if (res.status === 200) {
      console.log(res.data);
      showToast(res?.data?.message, 'success');
      navigate('/');
    }
    
  }
  return (
    <div className='h-screen w-screen overflow-hidden bg-cover m-auto' style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-center align-middle h-full px-5 py-20'>
        <div className='shadow-xl align-middle bg-white p-5 flex flex-wrap'>
          <div className='flex justify-center align-middle text-center flex-col m-auto'>
            <img src={logo} className='w-30 h-30 m-auto' />
            <h2>Welcome to Digital Flake Admin</h2>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-wrap ' >
            <CustomInput type='email' label='Email Id' name='email' placeholder='Enter Email Id' value={formData.email} onChange={handleInputChange} required={true} />
            <br />
            <CustomInput label='Password' type='password' name='password' placeholder='Enter password' value={formData.password} onChange={handleInputChange} required={true} />
            <br />
            <div className='flex items-center justify-between w-full relative'>
              <Link to={'/forgot-password'}>
                <span className='text-secondaryColor absolute right-5'>Forgot Password?</span>
              </Link>
            </div>
            <CustomButton label='Log In' type={'submit'} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage