"use client";

import React, { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import FileUpload from "./fileUpload";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { 
    BoardType, 
    ClassType, 
    SubjectType, 
    ChapterType,
    HierarchyBoardType 
} from "@/types/notes";
import {
    fetchBoards,
    fetchBoardHierarchy,
    // uploadNotes,
} from "@/app/actions/notes.actions";
import { uploadNotes } from "@/app/actions/upload.actions";
import { toast } from "sonner";

const NotesUploadDashboard = () => {
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
    const [selectedBoardName, setSelectedBoardName] = useState<string>("");
    const [selectedClassName, setSelectedClassName] = useState<string>("");
    const [selectedSubjectName, setSelectedSubjectName] = useState<string>("");
    const [selectedChapterName, setSelectedChapterName] = useState<string>("");
    const [topicName, setTopicName] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [availableClasses, setAvailableClasses] = useState<ClassType[]>([]);
    const [availableSubjects, setAvailableSubjects] = useState<SubjectType[]>([]);
    const [availableChapters, setAvailableChapters] = useState<ChapterType[]>([]);

    const {
        data: boards = [],
        isLoading: isLoadingBoards,
        isError: isBoardsError,
    } = useQuery<BoardType[]>({
        queryKey: ["boards"],
        queryFn: fetchBoards,
        staleTime: 1000 * 60 * 10, 
    });

    const {
        data: hierarchy = [],
        isLoading: isLoadingHierarchy,
        isError: isHierarchyError,
    } = useQuery<HierarchyBoardType[]>({
        queryKey: ["boardHierarchy", selectedBoardId],
        queryFn: () => fetchBoardHierarchy(selectedBoardId || undefined),
        enabled: !!selectedBoardId,
        staleTime: 1000 * 30 ,
    });

    useEffect(() => {
        if (hierarchy.length > 0 && selectedBoardId) {
            const currentBoard = hierarchy.find(b => b.boardId === selectedBoardId);
            if (currentBoard) {
                setAvailableClasses(currentBoard.classes);
            } else {
                setAvailableClasses([]);
            }
        }
    }, [hierarchy, selectedBoardId]);

    useEffect(() => {
        if (selectedClassId && availableClasses.length > 0) {
            const currentClass = availableClasses.find(c => c.classId === selectedClassId);
            if (currentClass && currentClass.subjects) {
                setAvailableSubjects(currentClass.subjects);
            } else {
                setAvailableSubjects([]);
            }
        } else {
            setAvailableSubjects([]);
        }
    }, [availableClasses, selectedClassId]);

    useEffect(() => {
        if (selectedSubjectId && availableSubjects.length > 0) {
            const currentSubject = availableSubjects.find(s => s.subjectId === selectedSubjectId);
            if (currentSubject && currentSubject.chapters) {
                setAvailableChapters(currentSubject.chapters);
            } else {
                setAvailableChapters([]);
            }
        } else {
            setAvailableChapters([]);
        }
    }, [availableSubjects, selectedSubjectId]);

    const handleBoardChange = (boardName: string) => {
        const board = boards.find((b) => b.boardName === boardName);
        if (board) {
            setSelectedBoardId(board.boardId);
            setSelectedBoardName(boardName);
            setSelectedClassId(null);
            setSelectedClassName("");
            setSelectedSubjectId(null);
            setSelectedSubjectName("");
            setSelectedChapterId(null);
            setSelectedChapterName("");
        }
    };

    const handleClassChange = (className: string) => {
        const classItem = availableClasses.find((c) => c.className === className);
        if (classItem) {
            setSelectedClassId(classItem.classId);
            setSelectedClassName(className);
            setSelectedSubjectId(null);
            setSelectedSubjectName("");
            setSelectedChapterId(null);
            setSelectedChapterName("");
        }
    };

    const handleSubjectChange = (subjectName: string) => {
        const subject = availableSubjects.find((s) => s.subjectName === subjectName);
        if (subject) {
            setSelectedSubjectId(subject.subjectId);
            setSelectedSubjectName(subjectName);
            setSelectedChapterId(null);
            setSelectedChapterName("");
        }
    };

    const handleChapterChange = (chapterName: string) => {
        const chapter = availableChapters.find((c) => c.chapterName === chapterName);
        if (chapter) {
            setSelectedChapterId(chapter.chapterId);
            setSelectedChapterName(chapterName);
        }
    };

    // const uploadMutation = useMutation({
    //     mutationFn: (formData: FormData) => uploadNotes(formData),
    //     onSuccess: () => {
    //         // Reset form
    //         setTopicName("");
    //         setFile(null);
    //         setError(null);

    //         toast.success("Notes uploaded successfully!");
    //     },
    //     onError: (error: Error) => {
    //         setError(`Failed to upload notes: ${error.message}`);
    //     },
    // });

    const uploadMutation = useMutation({
    mutationFn: async (uploadData: {
        topicName: string;
        chapterId: number;
        chapterName: string;
        file: File;
        isActive: boolean;
    }) => {
        // This now calls the client-side function directly
        return uploadNotes(uploadData);
    },
    onSuccess: () => {
        // Reset form
        setTopicName("");
        setFile(null);
        setError(null);
        toast.success("Notes uploaded successfully!");
        
        // Optionally refresh your data here instead of page reload
        // queryClient.invalidateQueries(['topics']); // if you have this query
    },
    onError: (error: Error) => {
        setError(`Failed to upload notes: ${error.message}`);
    },
});

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (
            !selectedBoardId ||
            !selectedClassId ||
            !selectedSubjectId ||
            !selectedChapterId ||
            !topicName ||
            !file
        ) {
            setError("All fields are required");
            return;
        }

        try {
            // Validate file size (50MB limit)
            if (file.size > 25 * 1024 * 1024) {
                setError("File size exceeds 25MB limit");
                return;
            }

            // const formData = new FormData();
            // formData.append("topicName", topicName);
            // formData.append("chapterId", selectedChapterId.toString());
            // formData.append("file", file);
            // formData.append("isActive", "true");

            // uploadMutation.mutate(formData);
            const uploadData = {
        topicName: topicName,
        chapterId: selectedChapterId,
        chapterName: selectedChapterName,
        file: file,
        isActive: true
    };
    
    uploadMutation.mutate(uploadData);
        } catch (error) {
            setError(
                `Error preparing upload: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto bg-neutral-900/80 border-none shadow-lg mt-10">
            <CardHeader className="space-y-1 pb-6 pt-8 px-6 md:px-8">
                <CardTitle className="text-3xl font-bold text-white text-center">
                    Upload Study Notes
                </CardTitle>
                <CardDescription className="text-gray-400 text-center">
                    Add educational materials for students to access
                </CardDescription>
            </CardHeader>

            <CardContent className="px-6 md:px-8 pb-8">
                <div className="p-6 rounded-lg border border-[#6544A3]/30 bg-[#242424] shadow-inner">
                    {error && (
                        <div className="mb-6 p-3 bg-red-500/20 border border-red-500/40 rounded text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Board
                            </label>
                            <Select
                                value={selectedBoardName}
                                onValueChange={handleBoardChange}
                                disabled={isLoadingBoards}
                            >
                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3] h-12">
                                    {isLoadingBoards ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="Select Board" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                    {isBoardsError ? (
                                        <SelectItem value="error" disabled>
                                            Error loading boards
                                        </SelectItem>
                                    ) : (
                                        boards.map((board) => (
                                            <SelectItem
                                                key={board.boardId}
                                                value={board.boardName}
                                                className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                            >
                                                {board.boardName}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Class
                            </label>
                            <Select
                                value={selectedClassName}
                                onValueChange={handleClassChange}
                                disabled={!selectedBoardId || isLoadingHierarchy}
                            >
                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3] h-12">
                                    {isLoadingHierarchy ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="Select Class" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                    {isHierarchyError ? (
                                        <SelectItem value="error" disabled>
                                            Error loading classes
                                        </SelectItem>
                                    ) : (
                                        availableClasses.map((classItem) => (
                                            <SelectItem
                                                key={classItem.classId}
                                                value={classItem.className}
                                                className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                            >
                                                {classItem.className}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Subject
                            </label>
                            <Select
                                value={selectedSubjectName}
                                onValueChange={handleSubjectChange}
                                disabled={!selectedClassId || isLoadingHierarchy}
                            >
                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3] h-12">
                                    {isLoadingHierarchy && !availableSubjects.length ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="Select Subject" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                    {isHierarchyError ? (
                                        <SelectItem value="error" disabled>
                                            Error loading subjects
                                        </SelectItem>
                                    ) : (
                                        availableSubjects.map((subject) => (
                                            <SelectItem
                                                key={subject.subjectId}
                                                value={subject.subjectName}
                                                className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                            >
                                                {subject.subjectName}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Chapter
                            </label>
                            <Select
                                value={selectedChapterName}
                                onValueChange={handleChapterChange}
                                disabled={!selectedSubjectId || isLoadingHierarchy}
                            >
                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3] h-12">
                                    {isLoadingHierarchy && !availableChapters.length ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="Select Chapter" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                    {isHierarchyError ? (
                                        <SelectItem value="error" disabled>
                                            Error loading chapters
                                        </SelectItem>
                                    ) : (
                                        availableChapters.map((chapter) => (
                                            <SelectItem
                                                key={chapter.chapterId}
                                                value={chapter.chapterName}
                                                className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                            >
                                                {chapter.chapterName}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Topic Name
                            </label>
                            <Input
                                placeholder="Enter topic name"
                                value={topicName}
                                onChange={(e) => setTopicName(e.target.value)}
                                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 h-12"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Upload PDF
                            </label>
                            <FileUpload handleFileChange={handleFileChange} />
                            {file && (
                                <p className="mt-2 text-sm text-green-400">
                                    File selected: {file.name} (
                                    {(file.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <Button
                                onClick={handleUpload}
                                disabled={
                                    uploadMutation.isPending ||
                                    !selectedBoardId ||
                                    !selectedClassId ||
                                    !selectedSubjectId ||
                                    !selectedChapterId ||
                                    !topicName ||
                                    !file
                                }
                                className="w-full bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white h-12 text-lg font-semibold"
                            >
                                {uploadMutation.isPending ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        <span>Uploading...</span>
                                    </div>
                                ) : (
                                    "Upload Notes"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NotesUploadDashboard;
