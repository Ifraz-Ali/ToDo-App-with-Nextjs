'use client';

import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import AlertMessage from './AlertMessage';

const SignUpForm = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        // Clear previous messages
        setAlertMessage('');
        setErrorMessage('');
        setSuccessMessage('');

        // Input validation
        if (!userName || !email || !password) {
            setAlertMessage('Please fill in all required fields.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: userName,
                    email,
                    password,
                    gender,
                }),
            });

            // Read raw text to safely parse response
            const text = await res.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (err) {
                console.error('Failed to parse JSON response:', err);
                throw new Error('Invalid response from server.');
            }

            if (res.ok) {
                setSuccessMessage(data.message || 'Signup successful!');
                // Wait a moment before redirect to let the user see the message
                setTimeout(() => router.push('/login'), 1000);
            } else {
                // Handle known error messages from API
                const errorMessage = data?.message || 'Signup failed. Please try again.';
                setErrorMessage(errorMessage);
            }

        } catch (err: any) {
            console.error('Signup error:', err);
            setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.checked) {
            setGender(e.target.value);
        }
    };

    return (
        <div className='min-h-screen bg-zinc-800 text-white'>
            <div className='flex justify-center'>
                <h1 className='text-blue-500 text-4xl mt-4 pt-16 font-semibold'>Sign Up</h1>
            </div>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && <SuccessMessage message={successMessage} />}
            {alertMessage && <AlertMessage message={alertMessage} />}
            <div className='my-5 h-20 space-y-2 flex justify-center items-center flex-col'>
                <label htmlFor='fullname'>Full Name</label>
                <input
                    type='text'
                    id='fullname'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className='rounded-md w-80 h-8 text-gray-950 px-2'
                    placeholder='Full Name'
                    required
                />
            </div>
            <div className='my-5 h-20 space-y-2 flex justify-center items-center flex-col'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='rounded-md w-80 h-8 text-gray-950 px-2'
                    placeholder='Email'
                    required
                />
            </div>
            <div className='my-5 h-20 space-y-2 flex justify-center items-center flex-col'>
                <label htmlFor='password'>Create Password</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='rounded-md w-80 h-8 text-gray-950 px-2'
                    placeholder='Create Password'
                    required
                />
            </div>
            <div className='h-20 space-y-2'>
                <div className='flex flex-col justify-center items-center'>
                    <label className=''>Gender</label>
                    <div className='flex '>
                        <label className='mx-4'>
                            <input type='radio' name='gender' value='male' onChange={handleChange} />
                            Male
                        </label>
                        <label className='mx-4'>
                            <input type='radio' name='gender' value='female' onChange={handleChange} />
                            Female
                        </label>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center flex-col'>
                <button
                    className='bg-blue-500 rounded w-1/5 h-8 text-lg font-medium hover:bg-blue-600 disabled:opacity-50'
                    onClick={handleSignUp}
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
                <p>Already Registered? <Link href='/login' className='underline'>Log in</Link></p>
            </div>
        </div>
    );
};

export default SignUpForm;
