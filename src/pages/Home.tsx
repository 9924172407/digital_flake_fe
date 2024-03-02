import React from 'react'
import Logo from "../assets/logo.png"

const Home: React.FC = () => {
    return (
        <div className='flex justify-center align-middle flex-col m-auto'>
            <img src={Logo} className='w-80 h-auto m-auto' />
            <h1 className='text-xl xl:text-4xl'>Welcome to DigitalFlake Admin</h1>
        </div>
    )
}
export default Home