interface Topic {
    topicId: number;
    topicName: string;
    pdfUrl: string | null;
    isActive: boolean;
}

interface Chapter {
    chapterId: number;
    chapterName: string;
    topics: Topic[];
}

interface Subject {
    subjectId: number;
    subjectName: string;
    chapters: Chapter[];
}

interface Class {
    classId: number;
    className: string;
    board: {
        boardId: number;
        boardName: string;
    };
    subjects: Subject[];
}

export type { Class, Subject, Chapter, Topic };
