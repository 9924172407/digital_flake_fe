import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { menuList } from '../constants'
import rightArrow from '../assets/rightArrow.png';
interface SidebarProps { }

interface menuList {
    item: string,
    i: number
}
const Sidebar: React.FC<SidebarProps> = () => {
    const location = useLocation().pathname;

    console.log(location);
    return (
        <div className='flex bg-grayColor min-w-60 h-screen px-4 py-3'>
            <ul>
                {
                    menuList?.map((item, i) => {
                        return <>
                            <Link to={item?.path}>
                                <div className='flex justify-between items-center p-2 '>
                                    <div className='flex items-center'>
                                        <img src={item?.icon} className='h-8 w-auto' />
                                        <li key={i} className='text-xl p-4 text-black'>{item.name}</li>
                                    </div>
                                    <div className='pl-5'>
                                        <img src={rightArrow} className='h-5 w-auto' />
                                    </div>
                                </div>
                            </Link>
                        </>
                    })
                }
            </ul>
        </div>
    )
}

export default Sidebar
