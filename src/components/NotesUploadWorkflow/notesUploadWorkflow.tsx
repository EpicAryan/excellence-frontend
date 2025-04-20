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
import { BoardType, ClassType, SubjectType, ChapterType } from "@/types/notes";
// Import server actions
import {
    fetchBoards,
    fetchClasses,
    fetchSubjects,
    fetchChapters,
    uploadNotes,
} from "@/app/actions/notes.actions";
import { toast } from "sonner";

const NotesUploadDashboard = () => {
    // States for form data
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
        null
    );
    const [selectedChapterId, setSelectedChapterId] = useState<number | null>(
        null
    );
    const [selectedBoardName, setSelectedBoardName] = useState<string>("");
    const [selectedClassName, setSelectedClassName] = useState<string>("");
    const [selectedSubjectName, setSelectedSubjectName] = useState<string>("");
    const [selectedChapterName, setSelectedChapterName] = useState<string>("");
    const [topicName, setTopicName] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        data: boards = [],
        isLoading: isLoadingBoards,
        isError: isBoardsError,
    } = useQuery<BoardType[]>({
        queryKey: ["boards"],
        queryFn: fetchBoards,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });

    const {
        data: classes = [],
        isLoading: isLoadingClasses,
        isError: isClassesError,
    } = useQuery<ClassType[]>({
        queryKey: ["classes", selectedBoardId],
        queryFn: () =>
            selectedBoardId
                ? fetchClasses(selectedBoardId)
                : Promise.resolve([]),
        enabled: !!selectedBoardId,
        staleTime: 1000 * 60 * 10,
    });

    const {
        data: subjects = [],
        isLoading: isLoadingSubjects,
        isError: isSubjectsError,
    } = useQuery<SubjectType[]>({
        queryKey: ["subjects", selectedBoardId, selectedClassId],
        queryFn: () =>
            selectedBoardId && selectedClassId
                ? fetchSubjects(selectedBoardId, selectedClassId)
                : Promise.resolve([]),
        enabled: !!selectedBoardId && !!selectedClassId,
        staleTime: 1000 * 60 * 10,
    });

    const {
        data: chapters = [],
        isLoading: isLoadingChapters,
        isError: isChaptersError,
    } = useQuery<ChapterType[]>({
        queryKey: [
            "chapters",
            selectedBoardId,
            selectedClassId,
            selectedSubjectId,
        ],
        queryFn: () =>
            selectedBoardId && selectedClassId && selectedSubjectId
                ? fetchChapters(
                      selectedBoardId,
                      selectedClassId,
                      selectedSubjectId
                  )
                : Promise.resolve([]),
        enabled: !!selectedBoardId && !!selectedClassId && !!selectedSubjectId,
        staleTime: 1000 * 60 * 10,
    });

    // Handle board selection
    const handleBoardChange = (boardName: string) => {
        const board = boards.find((b) => b.boardName === boardName);
        if (board) {
            setSelectedBoardId(board.boardId);
            setSelectedBoardName(boardName);
        }
    };

    // Handle class selection
    const handleClassChange = (className: string) => {
        const classItem = classes.find((c) => c.className === className);
        if (classItem) {
            setSelectedClassId(classItem.classId);
            setSelectedClassName(className);
        }
    };

    // Handle subject selection
    const handleSubjectChange = (subjectName: string) => {
        const subject = subjects.find((s) => s.subjectName === subjectName);
        if (subject) {
            setSelectedSubjectId(subject.subjectId);
            setSelectedSubjectName(subjectName);
        }
    };

    // Handle chapter selection
    const handleChapterChange = (chapterName: string) => {
        const chapter = chapters.find((c) => c.chapterName === chapterName);
        if (chapter) {
            setSelectedChapterId(chapter.chapterId);
            setSelectedChapterName(chapterName);
        }
    };

    // Upload mutation
    const uploadMutation = useMutation({
        mutationFn: (formData: FormData) => uploadNotes(formData),
        onSuccess: () => {
            // Reset form
            setTopicName("");
            setFile(null);
            setError(null);

            toast.success("Notes uploaded successfully!");
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
            // Validate file size (25MB limit)
            if (file.size > 50 * 1024 * 1024) {
                setError("File size exceeds 10MB limit");
                return;
            }

            const formData = new FormData();
            formData.append("topicName", topicName);
            formData.append("chapterId", selectedChapterId.toString());

            formData.append("file", file);

            formData.append("isActive", "true");

            uploadMutation.mutate(formData);
        } catch (error) {
            setError(
                `Error preparing upload: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    // Reset dependent fields when parent selection changes
    useEffect(() => {
        if (!selectedBoardId) {
            setSelectedClassId(null);
            setSelectedClassName("");
            setSelectedSubjectId(null);
            setSelectedSubjectName("");
            setSelectedChapterId(null);
            setSelectedChapterName("");
        }
    }, [selectedBoardId]);

    useEffect(() => {
        if (!selectedClassId) {
            setSelectedSubjectId(null);
            setSelectedSubjectName("");
            setSelectedChapterId(null);
            setSelectedChapterName("");
        }
    }, [selectedClassId]);

    useEffect(() => {
        if (!selectedSubjectId) {
            setSelectedChapterId(null);
            setSelectedChapterName("");
        }
    }, [selectedSubjectId]);

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
                                disabled={!selectedBoardId || isLoadingClasses}
                            >
                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3] h-12">
                                    {isLoadingClasses ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="Select Class" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                    {isClassesError ? (
                                        <SelectItem value="error" disabled>
                                            Error loading classes
                                        </SelectItem>
                                    ) : (
                                        classes.map((classItem) => (
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
                                disabled={!selectedClassId || isLoadingSubjects}
                            >
                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3] h-12">
                                    {isLoadingSubjects ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="Select Subject" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                    {isSubjectsError ? (
                                        <SelectItem value="error" disabled>
                                            Error loading subjects
                                        </SelectItem>
                                    ) : (
                                        subjects.map((subject) => (
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
                                disabled={
                                    !selectedSubjectId || isLoadingChapters
                                }
                            >
                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3] h-12">
                                    {isLoadingChapters ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <SelectValue placeholder="Select Chapter" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                    {isChaptersError ? (
                                        <SelectItem value="error" disabled>
                                            Error loading chapters
                                        </SelectItem>
                                    ) : (
                                        chapters.map((chapter) => (
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
