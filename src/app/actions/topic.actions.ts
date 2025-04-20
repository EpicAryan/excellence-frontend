'use server'

// app/lib/serverActions.ts
import { Topic } from "@/types/notes";
import { getAccessToken } from "./notes.actions";
// Define types
export interface TopicsResponse {
  data: Topic[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TopicsQueryParams {
  search?: string;
  boardId?: string;
  classId?: string;
  subjectId?: string;
  page?: number;
  limit?: number;
}

type TopicData = {
  topicId: number;
  topicName: string;
  chapterId: number;
  pdfUrl: string;
  isActive: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  chapterName: string;
  subjectId: number;
  subjectName: string;
  classId: number;
  className: string;
  boardId: number;
  boardName: string;
};

const API_URL = process.env.NEXT_BACKEND_API_URL;

// API function to fetch topics with filters and pagination
export const fetchTopics = async (params: TopicsQueryParams = {}): Promise<TopicsResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.search) queryParams.append('search', params.search);
  if (params.boardId) queryParams.append('boardId', params.boardId);
  if (params.classId) queryParams.append('classId', params.classId);
  if (params.subjectId) queryParams.append('subjectId', params.subjectId);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  
  const url = `${API_URL}/api/topics?${queryParams.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch topics: ${response.status}`);
    }
    const result = await response.json();

    const mappedData: Topic[] = result.data.map((item: TopicData) => ({
      topicId: item.topicId.toString(),
      topicName: item.topicName,
      chapter: item.chapterName,
      chapterId: item.chapterId.toString(),
      board: item.boardName,
      boardId: item.boardId.toString(),
      class: item.className,
      classId: item.classId.toString(),
      subject: item.subjectName,
      subjectId: item.subjectId.toString(),
      pdfUrl: item.pdfUrl || '',
      isActive: item.isActive,
      uploadedAt: item.updatedAt || item.createdAt,
    }));

     return {
      data: mappedData,
      pagination: result.pagination,
    };
  } catch (error) {
    console.error('Error fetching topics:', error);
    return {
      data: [],
      pagination: {
        total: 0,
        page: params.page || 1,
        limit: params.limit || 10,
        totalPages: 0,
      },
    };
  }
};

export const toggleTopicStatusAction = async (topicId:string, isActive: boolean) => {
  try {
     const accessToken = await getAccessToken();

     const response = await fetch(`${API_URL}/api/topics/${topicId}/status`,{
       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
       },
       body: JSON.stringify({ isActive: Boolean(isActive) }),
     });

     if(!response.ok){
      const errorRes = await response.json();
  console.error("Server responded with:", errorRes);
      throw new Error(`Failed to toggle status: ${response.status}`);
     }

     const data = await response.json();
     return data.data;
  } catch (error) {
    console.error('Error toggling status: ', error);
    throw new Error('Failed to toggle topic status');
  }
}


export const updateTopicAction = async (topicId: string, topicData: Partial<Topic>) => {
  try {
    const accessToken = await getAccessToken();
    
    const API_URL = process.env.NEXT_BACKEND_API_URL;
    const response = await fetch(`${API_URL}/api/topics/${topicId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        topicName: topicData.topicName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server responded with:", errorData);
      throw new Error(`Failed to update topic: ${errorData.message || response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating topic:', error);
    throw new Error('Failed to update topic');
  }
}

export const deleteTopicAction = async (topicId: string) => {
  try {
    const accessToken = await getAccessToken();
    
    const API_URL = process.env.NEXT_BACKEND_API_URL;
    const response = await fetch(`${API_URL}/api/topics/${topicId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server responded with:", errorData);
      throw new Error(`Failed to delete topic: ${errorData.message || response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw new Error('Failed to delete topic');
  }
}
