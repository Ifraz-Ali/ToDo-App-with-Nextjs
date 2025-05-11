"use client"

import Link from "next/link";
import Signup from "./signup/page";

export default function Home() {
    return (
        <div className="bg-zinc-800">
            <div className={`h-dvh w-screen flex flex-col justify-center items-center gap-8  `}>
            <h2 className='text-gray-200 text-3xl font-bold mb-8'>Welcome to Todo App</h2>
            <div className='w-full flex justify-center text-gray-200'>
                <Link href={"/signup"}>
                    <button className='rounded-lg bg-blue-700 p-3 px-8 cursor-pointer transition duration-300 hover:bg-blue-500 '>
                        Create an account
                    </button>
                </Link>
            </div>
            <div className='w-full flex justify-center text-cyan-600'>
                <Link href={"/login"}>
                    <button className='rounded-lg border-2 border-blue-700 p-3 px-8 transition duration-300 hover:bg-blue-600 hover:text-white cursor-pointer'>
                        Login to your account
                    </button>
                </Link>
            </div>
        </div>
        </div>

    );
}
