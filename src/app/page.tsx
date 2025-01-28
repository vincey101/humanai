'use client'

import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from './store';


export default function Home() {
  const { user } = useSelector((state: RootState) => state.user);
  if(!user.user){
    redirect('/login')
  }
  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Hi {user.user.name.split(' ')[0]}, Welcome to Interactive Avatar Creator</h1>
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <p className="text-lg text-gray-600 mb-4">
          Create and manage your interactive avatars using our powerful tools.
        </p>
        <p className="text-lg text-gray-600">
          Get started by visiting the Projects section in the sidebar.
        </p>
      </div>
    </div>
  );
} 