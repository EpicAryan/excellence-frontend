interface BoardType {
    boardId: number;
    boardName: string;
}

interface ClassType {
    classId: number;
    className: string;
    boardId?: string;
    subjects?: SubjectType[];
}

interface SubjectType {
    subjectId: number;
    subjectName: string;
    classId?: string;
    chapters?: ChapterType[];
}

interface ChapterType {
    chapterId: number;
    chapterName: string;
}

interface Topic {
    topicId: string;
    topicName: string;
    boardId: string;
    board: string;
    classId: string;
    class: string;
    subjectId: string;
    subject: string;
    chapter: string;
    chapterId: string;
    pdfUrl: string;
    uploadedAt: string;
    isActive: boolean;
}

interface FilterOption {
    id: string;
    name: string;
    boardId?: string;
    classId?: string;
}
interface UserType {
    id: number;
    email: string;
    username: string;
    role?: string;
  }

  interface Batch {
    id: string;
    name: string;
    boardName?: string;
  }
  
  interface Student {
    id: string;
    name: string;
    email: string;
    enrolledDate: string;
    hasPermission: boolean;
    batches: Batch[];
  }

export type {
    BoardType,
    ClassType,
    SubjectType,
    ChapterType,
    Topic,
    FilterOption,
    UserType,
    Student
};



export interface HierarchySubjectType extends SubjectType {
  chapters: ChapterType[];
}

export interface HierarchyClassType extends ClassType {
  subjects: HierarchySubjectType[];
}

export interface HierarchyBoardType extends BoardType {
  classes: HierarchyClassType[];
}
