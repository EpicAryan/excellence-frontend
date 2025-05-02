"use server"

import { getAccessToken } from "./notes.actions";
import { Student } from "@/types/notes";
import { Class } from "@/types/studentNotes"

const API_URL = process.env.NEXT_BACKEND_API_URL;

export async function getStudents(): Promise<Student[]> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.status}`);
    }
   // 👇 This gets the actual data from the server
   const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

export async function toggleStudentPermission(studentId: string, hasPermission: boolean): Promise<void> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/students/${studentId}/permission`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ hasPermission }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update student permission: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error('Error updating student permission:', error);
    throw error;
  }
}

export async function removeBatchFromStudent(studentId: string, batchId: string): Promise<void> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/students/${studentId}/batches/${batchId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to remove batch: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error('Error removing batch from student:', error);
    throw error;
  }
}

export async function removeStudent(studentId: string): Promise<void> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/students/${studentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to remove student: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error('Error removing student:', error);
    throw error;
  }
}

export async function getStudentCourse(studentId: number|undefined): Promise<Class[]> {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Not authenticated');
    }
    
    // Call your backend API to get complete course hierarchy
    const response = await fetch(`${API_URL}/api/students/course/${studentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 403) {
        console.error('Permission Denied: You do not have access to view this course data.');
        return [];
      } else {
        console.error('Failed to fetch course hierarchy');
        return [];
      }
    }
    
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
