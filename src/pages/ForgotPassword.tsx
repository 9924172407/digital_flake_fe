import React, { useState } from 'react'
import bgImage from "../assets/bg_image.png"
import CustomInput from '../components/form/CustomInput'
import CustomButton from '../components/form/CustomButton'
import { Api } from '../api/api'
import { Link } from 'react-router-dom'

interface formData {
    email: string,
}

const ForgotPassword: React.FC = () => {

    const [formData, setFormData] = useState<formData>({
        email: "",
    })

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
        await Api.forgotPassword(formData)
    }
    return (
        <div className='h-screen w-screen overflow-hidden bg-cover m-auto' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='w-auto sm:w-1/2 xl:w-2/5 justify-center align-middle pl-10 py-20 '>
                <div className='shadow-xl align-middle bg-white p-5 flex flex-wrap'>
                    <div className='flex justify-center align-middle text-center flex-col m-auto'>
                        <h2 className='text-2xl font-bold text-secondaryColor py-2'>Did you forget your password?</h2>
                        <p className='pt-5'>Enter your email address and we'll send you a link to restore password</p>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-wrap pt-10' >
                        <CustomInput type='email' label='Email Address' name='email' placeholder='Enter Email Id' value={formData.email} onChange={handleInputChange} required={true} />
                        <br />
                        <CustomButton label='Request Reset Link' type={'submit'} />
                        <div className='flex items-center text-center justify-center w-full '>
                            <Link to={'/login'}>
                                <h2 className='text-secondaryColor underline'>Back to Log In</h2>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword