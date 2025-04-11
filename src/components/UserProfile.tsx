import React from 'react';
import { User } from 'lucide-react';
import { UserData } from '../types';

interface UserProfileProps {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isLoading, error }) => {
  if (isLoading) return <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">Loading user profile...</div>;
  if (error) return <div className="p-6 bg-red-100 text-red-700 rounded-lg shadow-md">Error: {error}</div>;
  if (!user) return <div className="p-6 bg-gray-100 rounded-lg shadow-md">No user selected</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 rounded-full p-3 mr-4">
          <User className="h-10 w-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.company.name}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
          <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
          <p className="text-gray-600"><span className="font-medium">Phone:</span> {user.phone}</p>
          <p className="text-gray-600"><span className="font-medium">Website:</span> {user.website}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
          <p className="text-gray-600">{user.address.street}, {user.address.suite}</p>
          <p className="text-gray-600">{user.address.city}, {user.address.zipcode}</p>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold text-gray-700 mb-2">Company Details</h3>
        <p className="text-gray-600 italic">"{user.company.catchPhrase}"</p>
        <p className="text-gray-600 mt-2">{user.company.bs}</p>
      </div>
    </div>
  );
};

export default UserProfile;