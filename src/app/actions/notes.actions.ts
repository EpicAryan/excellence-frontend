// app/actions/notes.ts
'use server'

import { revalidatePath } from 'next/cache';
import {
    BoardType,
    ClassType,
    SubjectType,
    ChapterType,
    HierarchyBoardType
  } from '@/types/notes'
import { cookies } from 'next/headers';

/**
 * Fetch all available boards
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
// export async function uploadNotes(formData: FormData): Promise<void> {
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get('accessToken')?.value;

//     if (!accessToken) throw new Error('User not authenticated');
    
//     const response = await fetch(`${API_URL}/api/topics`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         // FormData content-type is automatically set by fetch
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       const errorText = errorData 
//         ? JSON.stringify(errorData) 
//         : await response.text();
//       throw new Error(`Failed to upload notes: ${errorText}`);
//     }

//     // Revalidate the topics path to refresh data
//     revalidatePath('/notes');
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error uploading notes:', error);
//     throw error;
//   }
// }


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

export async function fetchBoardHierarchy(boardId?: number): Promise<HierarchyBoardType[]> {
  try {
    const accessToken = await getAccessToken();
    const queryParam = boardId ? `?boardId=${boardId}` : '';
    const response = await fetch(`${API_URL}/api/boards/hierarchy${queryParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch board hierarchy: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching board hierarchy:', error);
    throw error;
  }
}


export async function uploadNotes(data: {
  topicName: string;
  chapterId: number;
  chapterName: string;
  file: File;
  isActive: boolean;
}): Promise<void> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) throw new Error('User not authenticated');

    // Step 1: Get Cloudinary upload signature from your backend
    const signatureResponse = await fetch(`${API_URL}/api/cloudinary/upload-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        chapterId: data.chapterId,
        chapterName: data.chapterName,
        topicName: data.topicName,
      }),
    });

    if (!signatureResponse.ok) {
      throw new Error('Failed to get upload signature');
    }

    const { signature, timestamp, cloudName, apiKey, folder } = await signatureResponse.json();

    // Step 2: Upload directly to Cloudinary
    const formData = new FormData();
    const publicId = `${timestamp}-${data.file.name.replace(/\.[^/.]+$/, "")}.pdf`;
    
    formData.append('file', data.file);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', apiKey);
    formData.append('folder', folder);
    formData.append('public_id', publicId);
    formData.append('resource_type', 'raw');
    formData.append('overwrite', 'true');

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!cloudinaryResponse.ok) {
      throw new Error('Failed to upload file to Cloudinary');
    }

    const cloudinaryResult = await cloudinaryResponse.json();

    // Step 3: Save topic data to your backend
    const topicData = {
      topicName: data.topicName,
      chapterId: data.chapterId,
      pdfUrl: cloudinaryResult.secure_url,
      isActive: data.isActive,
    };

    const response = await fetch(`${API_URL}/api/topics/create-with-url`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicData),
    });

    if (!response.ok) {
      // If backend fails, try to delete the uploaded file from Cloudinary
      try {
        await fetch(`${API_URL}/api/cloudinary/delete-file`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ publicId: `${folder}/${publicId}` }),
        });
      } catch (deleteError) {
        console.error('Failed to cleanup Cloudinary file:', deleteError);
      }
      
      const errorData = await response.json().catch(() => null);
      throw new Error(`Failed to save topic: ${errorData?.message || response.statusText}`);
    }

    // Revalidate the topics path to refresh data
    revalidatePath('/notes');
    
  } catch (error) {
    console.error('Error uploading notes:', error);
    throw error;
  }
}
