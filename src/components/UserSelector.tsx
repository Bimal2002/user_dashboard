import React from 'react';
import { UserData } from '../types';

interface UserSelectorProps {
  users: UserData[];
  selectedUserId: number;
  onSelectUser: (userId: number) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ users, selectedUserId, onSelectUser }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select User:
      </label>
      <select
        id="user-select"
        value={selectedUserId}
        onChange={(e) => onSelectUser(Number(e.target.value))}
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;