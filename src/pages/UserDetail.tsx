import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import UserActivities from '../components/UserActivities';
import { fetchUser, fetchUserActivities, fetchUsers } from '../services/api';
import { UserData, UserActivity } from '../types/index';
import { ArrowLeft } from 'lucide-react';

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<UserData | null>(null);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState<boolean>(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  
  const [userError, setUserError] = useState<string | null>(null);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);
  const [usersError, setUsersError] = useState<string | null>(null);

  // Fetch all users for navigation
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const userData = await fetchUsers();
        setUsers(userData);
        setUsersError(null);
      } catch (error) {
        setUsersError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoadingUsers(false);
      }
    };

    getAllUsers();
  }, []);

  // Fetch current user and activities when userId changes
  useEffect(() => {
    const getUserData = async () => {
      if (!userId) return;
      
      const userIdNum = parseInt(userId);
      
      try {
        setIsLoadingUser(true);
        const userData = await fetchUser(userIdNum);
        setUser(userData);
        setUserError(null);
      } catch (error) {
        setUserError(error instanceof Error ? error.message : 'An unknown error occurred');
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    const getUserActivities = async () => {
      if (!userId) return;
      
      const userIdNum = parseInt(userId);
      
      try {
        setIsLoadingActivities(true);
        const activitiesData = await fetchUserActivities(userIdNum);
        setActivities(activitiesData);
        setActivitiesError(null);
      } catch (error) {
        setActivitiesError(error instanceof Error ? error.message : 'An unknown error occurred');
        setActivities([]);
      } finally {
        setIsLoadingActivities(false);
      }
    };

    getUserData();
    getUserActivities();
  }, [userId]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId = event.target.value;
    navigate(`/users/${newUserId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center mr-4 text-blue-500 hover:text-blue-700"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span>Back to Dashboard</span>
              </button>
              <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
            </div>
            
            <div className="w-64">
              <select
                value={userId}
                onChange={handleUserChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoadingUsers}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UserProfile 
              user={user} 
              isLoading={isLoadingUser} 
              error={userError} 
            />
          </div>
          <div className="lg:col-span-2">
            <UserActivities 
              activities={activities} 
              isLoading={isLoadingActivities} 
              error={activitiesError} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;