import { UserData, UserActivity } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetches all users from the API
 * @returns Promise with array of UserData
 */
export const fetchUsers = async (): Promise<UserData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Fetches a single user by ID
 * @param userId The ID of the user to fetch
 * @returns Promise with UserData
 */
export const fetchUser = async (userId: number): Promise<UserData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user ${userId}: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

/**
 * Fetches activities for a specific user
 * @param userId The ID of the user whose activities to fetch
 * @returns Promise with array of UserActivity
 */
export const fetchUserActivities = async (userId: number): Promise<UserActivity[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch activities for user ${userId}: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching activities for user ${userId}:`, error);
    throw error;
  }
};