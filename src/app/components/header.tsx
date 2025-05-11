'use client';

import { FC } from 'react';
// import { TbLogout } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { AuthContextData } from '../context/authentication';

interface HeaderProps {
    userName: string;
    logoutUser: () => void;
}

const Header: FC<HeaderProps> = ({ userName, logoutUser }) => {
    const router = useRouter();
    const username = "Ifraz Ali";
    const letter = username.split('');

    const handleClick = () => {
        router.push('/todo-list');
    };

    return (
        <div className='h-20 flex border-zinc-700 border-b-2 max-[640px]:justify-around'>
            <div className='w-11/12 flex justify-end max-[640px]:w-1/2'>
                <div className='w-2/5 flex items-center max-[640px]:w-full max-[640px]:p-0.5 sm:w-11/12 lg:w-2/5'>
                    <h2
                        className='text-white text-4xl max-[640px]:text-2xl hover:cursor-pointer'
                        onClick={handleClick}
                    >
                        My <span className='text-blue-500 font-medium'>Todo</span> App
                    </h2>
                </div>
            </div>

            <div className='w-2/5 flex justify-around items-center sm:w-1/2 lg:w-2/5'>
                <div
                    className='group px-6 py-1.5 gap-2 flex items-center justify-between bg-blue-500 rounded max-[640px]:p-1 cursor-pointer hover:bg-blue-600'
                    onClick={logoutUser}
                >
                    <button className='bg-blue-500 rounded text-lg font-medium max-[640px]:text-base group-hover:bg-blue-600'>
                        Log out
                    </button>
                    {/* <TbLogout className='size-6 max-[640px]:hidden' /> */}
                </div>

                <div className='flex flex-col items-center'>
                    <div className='bg-blue-500 size-10 rounded-full flex justify-center items-center'>
                        {letter[0].toUpperCase()}
                    </div>
                    <h4 className='text-blue-500 text-xl max-[640px]:text-base'>{username}</h4>
                </div>
            </div>
        </div>
    );
};

export default Header;
