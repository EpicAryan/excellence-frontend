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

const API_URL = process.env.NEXT_BACKEND_API_URL;

export async function getAccessToken() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    if (!accessToken) {
      throw new Error('User not authenticated');
    }
    return accessToken;
}

export async function fetchBoards(): Promise<BoardType[]> {
  try {
    const response = await fetch(`${API_URL}/api/boards`, {
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
    const response = await fetch(`${API_URL}/api/classes?boardId=${boardId}`, {
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
      `${API_URL}/api/subjects?boardId=${boardId}&classId=${classId}`, 
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
      `${API_URL}/api/chapters?boardId=${boardId}&classId=${classId}&subjectId=${subjectId}`, 
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
    
    const response = await fetch(`${API_URL}/api/topics`, {
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


export async function createBoard(boardName:string): Promise<BoardType> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/boards`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ boardName }),
    });

    if(!response.ok){
      throw new Error(`Failed to create board: ${response.status}`);
    }

    const data = await response.json();
    return data.data;

  } catch (error) {
    console.log('Error creating board:', error);
    throw error;
  }
}

export async function updateBoard(id: number, boardName: string): Promise<BoardType> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/boards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ boardName }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update board: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating board:', error);
    throw error;
  }
}

export async function deleteBoard(id: number): Promise<void> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/boards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete board: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting board:', error);
    throw error;
  }
}

export async function createClass(className: string, boardId: number): Promise<ClassType> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ className, boardId }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create class: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
}

export async function updateClass(id: number, className: string): Promise<ClassType> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/classes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ className }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update class: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
}

export async function deleteClass(id: number): Promise<void> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/classes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete class: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
}

export async function createSubject(subjectName: string, classId: number): Promise<SubjectType> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ subjectName, classId }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create subject: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating subject:', error);
    throw error;
  }
}

export async function updateSubject(id: number, subjectName: string): Promise<SubjectType> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/subjects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ subjectName }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update subject: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating subject:', error);
    throw error;
  }
}

export async function deleteSubject(id: number): Promise<void> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/subjects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete subject: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
}


export async function createChapter(chapterName: string, subjectId: number): Promise<ChapterType> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/api/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ chapterName, subjectId }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create chapter: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating chapter:', error);
    throw error;
  }
}

export async function updateChapter(id: number, chapterName: string): Promise<ChapterType> {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(`${API_URL}/api/chapters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ chapterName }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update chapter: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating chapter:', error);
    throw error;
  }
}

export async function deleteChapter(id: number): Promise<void> {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_URL}/api/chapters/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete chapter: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting chapter:', error);
    throw error;
  }
}
