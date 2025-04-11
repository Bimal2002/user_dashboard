import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import UserActivities from '../components/UserActivities';
import UserSelector from '../components/UserSelector';
import { fetchUsers, fetchUser, fetchUserActivities } from '../services/api';
import { UserData, UserActivity } from '../types/index';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState<boolean>(true);
  
  const [usersError, setUsersError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Fetch all users
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

  // Fetch current user and activities when selectedUserId changes
  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoadingUser(true);
        const userData = await fetchUser(selectedUserId);
        setCurrentUser(userData);
        setUserError(null);
      } catch (error) {
        setUserError(error instanceof Error ? error.message : 'An unknown error occurred');
        setCurrentUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    const getUserActivities = async () => {
      try {
        setIsLoadingActivities(true);
        const activitiesData = await fetchUserActivities(selectedUserId);
        setActivities(activitiesData);
        setActivitiesError(null);
      } catch (error) {
        setActivitiesError(error instanceof Error ? error.message : 'An unknown error occurred');
        setActivities([]);
      } finally {
        setIsLoadingActivities(false);
      }
    };

    if (selectedUserId) {
      getUserData();
      getUserActivities();
      // Update URL for routing without triggering navigation
      window.history.replaceState(null, '', `/users/${selectedUserId}`);
    }
  }, [selectedUserId]);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    navigate(`/users/${userId}`);
  };

  // Handle loading state for the entire application
  if (isLoadingUsers && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center p-12">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
          <p className="text-gray-600">View user profiles and activities</p>
        </header>
        
        {usersError ? (
          <div className="bg-red-100 p-4 rounded-lg mb-6 text-red-700">
            Failed to load users: {usersError}
          </div>
        ) : (
          <UserSelector 
            users={users} 
            selectedUserId={selectedUserId} 
            onSelectUser={handleUserSelect} 
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UserProfile 
              user={currentUser} 
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

export default Dashboard;