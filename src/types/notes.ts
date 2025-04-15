interface BoardType {
    boardId: number;
    boardName: string;
}

interface ClassType {
    classId: number;
    className: string;
}

interface SubjectType {
    subjectId: number;
    subjectName: string;
}

interface ChapterType {
    chapterId: number;
    chapterName: string;
}

interface Topic {
    id: string;
    name: string;
    boardId: string;
    board: string;
    classId: string;
    class: string;
    subjectId: string;
    subject: string;
    chapter: string;
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

export type {
    BoardType,
    ClassType,
    SubjectType,
    ChapterType,
    Topic,
    FilterOption,
};
