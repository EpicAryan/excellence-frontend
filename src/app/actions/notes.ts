// app/actions/notes.ts
'use server'

import { revalidatePath } from 'next/cache';
import {
    BoardType,
    ClassType,
    SubjectType,
    ChapterType
  } from '@/types/notes'
import { cookies } from 'next/headers';

/**
 * Fetch all available boards
 */
export async function fetchBoards(): Promise<BoardType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_API_URL}/api/boards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch boards: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
}

/**
 * Fetch classes for a specific board
 */
export async function fetchClasses(boardId: number): Promise<ClassType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_API_URL}/api/classes?boardId=${boardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch classes: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
}

/**
 * Fetch subjects for a specific board and class
 */
export async function fetchSubjects(boardId: number, classId: number): Promise<SubjectType[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_BACKEND_API_URL}/api/subjects?boardId=${boardId}&classId=${classId}`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
}

/**
 * Fetch chapters for a specific board, class, and subject
 */
export async function fetchChapters(
  boardId: number, 
  classId: number, 
  subjectId: number
): Promise<ChapterType[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_BACKEND_API_URL}/api/chapters?boardId=${boardId}&classId=${classId}&subjectId=${subjectId}`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch chapters: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
}

/**
 * Upload notes
 */
export async function uploadNotes(formData: FormData): Promise<void> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) throw new Error('User not authenticated');
    
    const response = await fetch(`${process.env.NEXT_BACKEND_API_URL}/api/topics`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        // FormData content-type is automatically set by fetch
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorText = errorData 
        ? JSON.stringify(errorData) 
        : await response.text();
      throw new Error(`Failed to upload notes: ${errorText}`);
    }

    // Revalidate the topics path to refresh data
    revalidatePath('/notes');
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading notes:', error);
    throw error;
  }
}
