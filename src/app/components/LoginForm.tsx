'use client';

import { useState, ChangeEvent, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ErrorMessage from './ErrorMessage';

// interface SignInProps {
//   authStatus: (status: boolean) => void;
// }

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Email and password can't be empty");
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      
      localStorage.setItem('loginKey', data.userId); // optional, until JWT/session is used
      setAuthStatus(true);
      router.push('/todo-list');
      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='h-screen bg-zinc-800 text-white'>
      <div className='flex justify-center'>
        <h1 className='text-blue-500 text-4xl mt-20 pt-16 font-semibold'>Log in</h1>
      </div>

      <div className='my-5 h-20 space-y-2 flex justify-center items-center flex-col'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className='rounded-md w-80 h-8 px-2 text-sm text-gray-950'
          placeholder='Email Address'
          required
        />
      </div>

      <div className='my-3 h-20 space-y-2 flex justify-center items-center flex-col'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className='rounded-md w-80 h-8 px-2 text-sm text-gray-950'
          placeholder='Password'
        />
      </div>

      <div className='flex justify-center items-center flex-col'>
        {error && <ErrorMessage message={error} />}
        <button
          onClick={handleSignIn}
          className='bg-blue-500 rounded w-1/5 h-8 text-lg font-medium max-[640px]:w-1/2'
        >
          Log In
        </button>
        <p className='mt-2'>
          You don&#39;t have an account? <Link href='/' className='underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
