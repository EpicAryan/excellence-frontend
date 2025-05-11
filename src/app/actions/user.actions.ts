'use server'

import { UserType } from "@/types/notes";
import { getAccessToken } from "./notes.actions";
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  export async function getUserAction(): Promise<UserType | null> {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('accessToken')?.value;
  
      if (!accessToken) {
        return null;
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `accessToken=${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
      });
  
      if (!response.ok) {
        return null;
      }
  
      const data = await response.json();
      return data.user as UserType;
    } catch (error) {
      console.error('Error in getUserAction:', error);
      return null;
    }
  }
  