'use server'

import { UserType } from "@/types/notes";
import { getAccessToken } from "./notes.actions";

const API_URL = process.env.NEXT_BACKEND_API_URL;

export async function searchUsers(query: string): Promise<UserType[]> {
    try {
        const accessToken = await getAccessToken();

      const response = await fetch(`${API_URL}/api/users/search?email=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        cache: 'no-store',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to search users: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }


  export async function assignClasses({ userId, classIds }: { userId: number, classIds: number[] }) {
    try {
        const accessToken = await getAccessToken();

      const response = await fetch(`${API_URL}/api/users/${userId}/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ classIds }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to assign classes: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error assigning classes:', error);
      throw error;
    }
  }
