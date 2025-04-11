import React from 'react';
import { Activity } from 'lucide-react';
import { UserActivity } from '../types';

interface UserActivitiesProps {
  activities: UserActivity[];
  isLoading: boolean;
  error: string | null;
}

const UserActivities: React.FC<UserActivitiesProps> = ({ activities, isLoading, error }) => {
  if (isLoading) return <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">Loading activities...</div>;
  if (error) return <div className="p-6 bg-red-100 text-red-700 rounded-lg shadow-md">Error: {error}</div>;
  if (!activities.length) return <div className="p-6 bg-gray-100 rounded-lg shadow-md">No activities found</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Activity className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">User Activities</h2>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <h3 className="font-semibold text-gray-800">{activity.title}</h3>
            <p className="text-gray-600 mt-2">{activity.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivities;