"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";
import {
    fetchBoards,
    createBoard,
    updateBoard,
    deleteBoard,
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
    fetchSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
    fetchChapters,
    createChapter,
    updateChapter,
    deleteChapter,
} from "@/app/actions/notes";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ItemType = "board" | "class" | "subject" | "chapter";

export default function HierarchyManagement() {
    const queryClient = useQueryClient();

    const [selectedBoard, setSelectedBoard] = useState<string>("");
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [selectedSubject, setSelectedSubject] = useState<string>("");

    // Edit states
    const [editId, setEditId] = useState<string | null>(null);
    const [editType, setEditType] = useState<"board" | "class" | "subject" | "chapter" | null>(null);
    const [editName, setEditName] = useState("");

    // Add new states
    const [newItemName, setNewItemName] = useState("");
    const [isAddingItem, setIsAddingItem] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [deleteItemInfo, setDeleteItemInfo] = useState<{type: ItemType | null; id: string | null;}>({ type: null, id: null });
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [editItemInfo, setEditItemInfo] = useState<{
        type: ItemType | null;
        id: string | null;
        name: string | null;
    }>({
        type: null,
        id: null,
        name: null,
    });

    const {
        data: boards = [],
        isLoading: isLoadingBoards,
        error: boardsError,
    } = useQuery({
        queryKey: ["boards"],
        queryFn: fetchBoards,
    });

    const {
        data: classes = [],
        isLoading: isLoadingClasses,
        error: classesError,
    } = useQuery({
        queryKey: ["classes", selectedBoard],
        queryFn: () => fetchClasses(Number(selectedBoard)),
        enabled: !!selectedBoard,
    });

    const {
        data: subjects = [],
        isLoading: isLoadingSubjects,
        error: subjectsError,
    } = useQuery({
        queryKey: ["subjects", selectedClass],
        queryFn: () =>
            fetchSubjects(Number(selectedBoard), Number(selectedClass)),
        enabled: !!selectedClass,
    });

    const {
        data: chapters = [],
        isLoading: isLoadingChapters,
        error: chaptersError,
    } = useQuery({
        queryKey: ["chapters", selectedSubject],
        queryFn: () =>
            fetchChapters(
                Number(selectedBoard),
                Number(selectedClass),
                Number(selectedSubject)
            ),
        enabled: !!selectedSubject,
    });

    // React Query - Mutations
    const createBoardMutation = useMutation({
        mutationFn: (boardName: string) => createBoard(boardName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["boards"] });
            toast.success("Board created successfully");
            setNewItemName("");
            setIsAddingItem(false);
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const updateBoardMutation = useMutation({
        mutationFn: ({ id, name }: { id: number; name: string }) =>
            updateBoard(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["boards"] });
            toast.success("Board updated successfully");
            cancelEdit();
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const deleteBoardMutation = useMutation({
        mutationFn: (id: number) => deleteBoard(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["boards"] });
            if (selectedBoard) {
                setSelectedBoard("");
                setSelectedClass("");
                setSelectedSubject("");
            }
            toast.success("Board deleted successfully");
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const createClassMutation = useMutation({
        mutationFn: ({
            className,
            boardId,
        }: {
            className: string;
            boardId: number;
        }) => createClass(className, boardId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["classes", selectedBoard],
            });
            toast.success("Class created successfully");
            setNewItemName("");
            setIsAddingItem(false);
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const updateClassMutation = useMutation({
        mutationFn: ({ id, name }: { id: number; name: string }) =>
            updateClass(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["classes", selectedBoard],
            });
            toast.success("Class updated successfully");
            cancelEdit();
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const deleteClassMutation = useMutation({
        mutationFn: (id: number) => deleteClass(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["classes", selectedBoard],
            });
            if (selectedClass) {
                setSelectedClass("");
                setSelectedSubject("");
            }
            toast.success("Class deleted successfully");
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const createSubjectMutation = useMutation({
        mutationFn: ({
            subjectName,
            classId,
        }: {
            subjectName: string;
            classId: number;
        }) => createSubject(subjectName, classId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["subjects", selectedClass],
            });
            toast.success("Subject created successfully");
            setNewItemName("");
            setIsAddingItem(false);
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const updateSubjectMutation = useMutation({
        mutationFn: ({ id, name }: { id: number; name: string }) =>
            updateSubject(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["subjects", selectedClass],
            });
            toast.success("Subject updated successfully");
            cancelEdit();
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const deleteSubjectMutation = useMutation({
        mutationFn: (id: number) => deleteSubject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["subjects", selectedClass],
            });
            if (selectedSubject) setSelectedSubject("");
            toast.success("Subject deleted successfully");
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const createChapterMutation = useMutation({
        mutationFn: ({
            chapterName,
            subjectId,
        }: {
            chapterName: string;
            subjectId: number;
        }) => createChapter(chapterName, subjectId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["chapters", selectedSubject],
            });
            toast.success("Chapter created successfully");
            setNewItemName("");
            setIsAddingItem(false);
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const updateChapterMutation = useMutation({
        mutationFn: ({ id, name }: { id: number; name: string }) =>
            updateChapter(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["chapters", selectedSubject],
            });
            toast.success("Chapter updated successfully");
            cancelEdit();
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    const deleteChapterMutation = useMutation({
        mutationFn: (id: number) => deleteChapter(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["chapters", selectedSubject],
            });
            toast.success("Chapter deleted successfully");
        },
        onError: (error) => {
            toast.error(`${error.message}`);
        },
    });

    // const startEdit = (type: 'board' | 'class' | 'subject' | 'chapter', id: string, name: string) => {
    //   setEditId(id);
    //   setEditType(type);
    //   setEditName(name);
    // };
    const startEdit = (type: ItemType, id: string, name: string) => {
        setEditId(id);
        setEditType(type);
        setEditName(name);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditType(null);
        setEditName("");
    };

    const saveEdit = () => {
        if (!editId || !editType || !editName.trim()) return;

        // Show confirmation dialog
        setEditItemInfo({
            type: editType,
            id: editId,
            name: editName,
        });
        setShowEditDialog(true);
    };

    const processSaveEdit = () => {
        const { type, id, name } = editItemInfo;
        if (!type || !id || !name) return;

        const numId = Number(id);

        if (type === "board") {
            updateBoardMutation.mutate({ id: numId, name });
        } else if (type === "class") {
            updateClassMutation.mutate({ id: numId, name });
        } else if (type === "subject") {
            updateSubjectMutation.mutate({ id: numId, name });
        } else if (type === "chapter") {
            updateChapterMutation.mutate({ id: numId, name });
        }

        setShowEditDialog(false);
        cancelEdit(); // Clear edit state after saving
    };

    const handleDelete = (type: ItemType, id: string) => {
        setDeleteItemInfo({ type, id });
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        const { type, id } = deleteItemInfo;
        if (!type || !id) return;

        const numId = Number(id);

        if (type === "board") {
            deleteBoardMutation.mutate(numId);
        } else if (type === "class") {
            deleteClassMutation.mutate(numId);
        } else if (type === "subject") {
            deleteSubjectMutation.mutate(numId);
        } else if (type === "chapter") {
            deleteChapterMutation.mutate(numId);
        }

        setShowDeleteDialog(false);
    };

    const addNewItem = (type: "board" | "class" | "subject" | "chapter") => {
        if (!newItemName.trim()) return;

        if (type === "board") {
            createBoardMutation.mutate(newItemName);
        } else if (type === "class") {
            if (!selectedBoard) return;
            createClassMutation.mutate({
                className: newItemName,
                boardId: Number(selectedBoard),
            });
        } else if (type === "subject") {
            if (!selectedClass) return;
            createSubjectMutation.mutate({
                subjectName: newItemName,
                classId: Number(selectedClass),
            });
        } else if (type === "chapter") {
            if (!selectedSubject) return;
            createChapterMutation.mutate({
                chapterName: newItemName,
                subjectId: Number(selectedSubject),
            });
        }
    };

    return (
        <>
            <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">
                        Admin Panel: Curriculum Management
                    </CardTitle>
                    <p className="text-neutral-400 text-sm">
                        Add, update, or remove Boards, Classes, Subjects, and
                        Chapters
                    </p>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="boards">
                        <TabsList className="grid w-full grid-cols-4 bg-[#3B444B]/50">
                            <TabsTrigger
                                value="boards"
                                className="text-white data-[state=active]:bg-[#6544A3] data-[state=active]:text-white"
                            >
                                Boards
                            </TabsTrigger>
                            <TabsTrigger
                                value="classes"
                                className="text-white data-[state=active]:bg-[#6544A3] data-[state=active]:text-white"
                            >
                                Classes
                            </TabsTrigger>
                            <TabsTrigger
                                value="subjects"
                                className="text-white data-[state=active]:bg-[#6544A3] data-[state=active]:text-white"
                            >
                                Subjects
                            </TabsTrigger>
                            <TabsTrigger
                                value="chapters"
                                className="text-white data-[state=active]:bg-[#6544A3] data-[state=active]:text-white"
                            >
                                Chapters
                            </TabsTrigger>
                        </TabsList>

                        {/* Boards Tab */}
                        <TabsContent value="boards">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-white">
                                        All Boards
                                    </h3>
                                    <Button
                                        onClick={() => setIsAddingItem(true)}
                                        className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
                                        size="sm"
                                        disabled={isAddingItem}
                                    >
                                        <Plus size={16} className="mr-1" /> Add
                                        Board
                                    </Button>
                                </div>

                                {isAddingItem && (
                                    <div className="flex items-center gap-2 p-2 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
                                        <Input
                                            value={newItemName}
                                            onChange={(e) =>
                                                setNewItemName(e.target.value)
                                            }
                                            placeholder="Enter board name"
                                            className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 flex-1"
                                        />
                                        <Button
                                            onClick={() => addNewItem("board")}
                                            className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF]"
                                            size="icon"
                                            disabled={
                                                createBoardMutation.isPending
                                            }
                                        >
                                            {createBoardMutation.isPending ? (
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            ) : (
                                                <Check size={16} />
                                            )}
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setIsAddingItem(false)
                                            }
                                            variant="destructive"
                                            size="icon"
                                        >
                                            <X size={16} />
                                        </Button>
                                    </div>
                                )}

                                {isLoadingBoards ? (
                                    <div className="text-center py-6 text-gray-400">
                                        Loading boards...
                                    </div>
                                ) : boardsError ? (
                                    <div className="text-center py-6 text-red-400">
                                        Error loading boards. Please try again.
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                                        {boards.map((board) => (
                                            <div
                                                key={board.boardId}
                                                className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30"
                                            >
                                                {editId ===
                                                    String(board.boardId) &&
                                                editType === "board" ? (
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <Input
                                                            value={editName}
                                                            onChange={(e) =>
                                                                setEditName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="bg-[#3B444B]/50 border-[#6544A3] text-white"
                                                        />
                                                        <Button
                                                            onClick={saveEdit}
                                                            className="bg-green-600 hover:bg-green-700"
                                                            size="icon"
                                                            disabled={
                                                                updateBoardMutation.isPending
                                                            }
                                                        >
                                                            {updateBoardMutation.isPending ? (
                                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                            ) : (
                                                                <Check
                                                                    size={16}
                                                                />
                                                            )}
                                                        </Button>
                                                        <Button
                                                            onClick={cancelEdit}
                                                            variant="destructive"
                                                            size="icon"
                                                        >
                                                            <X size={16} />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="text-white">
                                                            {board.boardName}
                                                        </span>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={() =>
                                                                    startEdit(
                                                                        "board",
                                                                        String(
                                                                            board.boardId
                                                                        ),
                                                                        board.boardName
                                                                    )
                                                                }
                                                                className="bg-[#6544A3] hover:bg-[#8D6CCB]"
                                                                size="icon"
                                                                variant="outline"
                                                            >
                                                                <Edit
                                                                    size={16}
                                                                />
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        "board",
                                                                        String(
                                                                            board.boardId
                                                                        )
                                                                    )
                                                                }
                                                                variant="destructive"
                                                                size="icon"
                                                                disabled={
                                                                    deleteBoardMutation.isPending
                                                                }
                                                            >
                                                                {deleteBoardMutation.isPending &&
                                                                deleteBoardMutation.variables ===
                                                                    board.boardId ? (
                                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                                ) : (
                                                                    <Trash2
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        {boards.length === 0 && (
                                            <div className="text-center py-6 text-gray-400">
                                                No boards available. Add a new
                                                board to get started.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Classes Tab */}
                        <TabsContent value="classes">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="board-select"
                                        className="text-white"
                                    >
                                        Select Board
                                    </Label>
                                    <Select
                                        value={selectedBoard}
                                        onValueChange={setSelectedBoard}
                                    >
                                        <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                                            <SelectValue placeholder="Select a board" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                            {boards.map((board) => (
                                                <SelectItem
                                                    key={board.boardId}
                                                    value={String(
                                                        board.boardId
                                                    )}
                                                    className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                                >
                                                    {board.boardName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedBoard && (
                                    <>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-white">
                                                Classes for{" "}
                                                {
                                                    boards.find(
                                                        (b) =>
                                                            String(
                                                                b.boardId
                                                            ) === selectedBoard
                                                    )?.boardName
                                                }
                                            </h3>
                                            <Button
                                                onClick={() =>
                                                    setIsAddingItem(true)
                                                }
                                                className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
                                                size="sm"
                                            >
                                                <Plus
                                                    size={16}
                                                    className="mr-1"
                                                />{" "}
                                                Add Class
                                            </Button>
                                        </div>

                                        {isAddingItem && (
                                            <div className="flex items-center gap-2 p-2 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
                                                <Input
                                                    value={newItemName}
                                                    onChange={(e) =>
                                                        setNewItemName(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter class name (e.g. 10, 11, 12)"
                                                    className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 flex-1"
                                                />
                                                <Button
                                                    onClick={() =>
                                                        addNewItem("class")
                                                    }
                                                    className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF]"
                                                    size="icon"
                                                    disabled={
                                                        createClassMutation.isPending
                                                    }
                                                >
                                                    {createClassMutation.isPending ? (
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                    ) : (
                                                        <Check size={16} />
                                                    )}
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        setIsAddingItem(false)
                                                    }
                                                    variant="destructive"
                                                    size="icon"
                                                >
                                                    <X size={16} />
                                                </Button>
                                            </div>
                                        )}

                                        {isLoadingClasses ? (
                                            <div className="text-center py-6 text-gray-400">
                                                Loading classes...
                                            </div>
                                        ) : classesError ? (
                                            <div className="text-center py-6 text-red-400">
                                                Error loading classes. Please
                                                try again.
                                            </div>
                                        ) : (
                                            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                                                {classes.map((cls) => (
                                                    <div
                                                        key={cls.classId}
                                                        className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30"
                                                    >
                                                        {editId ===
                                                            String(
                                                                cls.classId
                                                            ) &&
                                                        editType === "class" ? (
                                                            <div className="flex items-center gap-2 flex-1">
                                                                <Input
                                                                    value={
                                                                        editName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setEditName(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="bg-[#3B444B]/50 border-[#6544A3] text-white"
                                                                />
                                                                <Button
                                                                    onClick={
                                                                        saveEdit
                                                                    }
                                                                    className="bg-green-600 hover:bg-green-700"
                                                                    size="icon"
                                                                    disabled={
                                                                        updateClassMutation.isPending
                                                                    }
                                                                >
                                                                    {updateClassMutation.isPending ? (
                                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                                    ) : (
                                                                        <Check
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    )}
                                                                </Button>
                                                                <Button
                                                                    onClick={
                                                                        cancelEdit
                                                                    }
                                                                    variant="destructive"
                                                                    size="icon"
                                                                >
                                                                    <X
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span className="text-white">
                                                                    {
                                                                        cls.className
                                                                    }
                                                                </span>
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        onClick={() =>
                                                                            startEdit(
                                                                                "class",
                                                                                String(
                                                                                    cls.classId
                                                                                ),
                                                                                cls.className
                                                                            )
                                                                        }
                                                                        className="bg-[#6544A3] hover:bg-[#8D6CCB]"
                                                                        size="icon"
                                                                        variant="outline"
                                                                    >
                                                                        <Edit
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                "class",
                                                                                String(
                                                                                    cls.classId
                                                                                )
                                                                            )
                                                                        }
                                                                        variant="destructive"
                                                                        size="icon"
                                                                        disabled={
                                                                            deleteClassMutation.isPending
                                                                        }
                                                                    >
                                                                        {deleteClassMutation.isPending &&
                                                                        deleteClassMutation.variables ===
                                                                            cls.classId ? (
                                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                                        ) : (
                                                                            <Trash2
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                                {classes.length === 0 && (
                                                    <div className="text-center py-6 text-gray-400">
                                                        No classes available for
                                                        this board. Add a new
                                                        class to get started.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {!selectedBoard && (
                                    <div className="text-center py-6 text-gray-400">
                                        Please select a board to view or add
                                        classes.
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Subjects Tab */}
                        <TabsContent value="subjects">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="board-select-subjects"
                                            className="text-white"
                                        >
                                            Select Board
                                        </Label>
                                        <Select
                                            value={selectedBoard}
                                            onValueChange={(value) => {
                                                setSelectedBoard(value);
                                                setSelectedClass("");
                                            }}
                                        >
                                            <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                                                <SelectValue placeholder="Select a board" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                                {boards.map((board) => (
                                                    <SelectItem
                                                        key={board.boardId}
                                                        value={String(
                                                            board.boardId
                                                        )}
                                                        className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                                    >
                                                        {board.boardName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedBoard && (
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="class-select"
                                                className="text-white"
                                            >
                                                Select Class
                                            </Label>
                                            <Select
                                                value={selectedClass}
                                                onValueChange={setSelectedClass}
                                            >
                                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                                                    <SelectValue placeholder="Select a class" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                                    {classes.map((cls) => (
                                                        <SelectItem
                                                            key={cls.classId}
                                                            value={String(
                                                                cls.classId
                                                            )}
                                                            className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                                        >
                                                            {cls.className}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>

                                {selectedClass && (
                                    <>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-white">
                                                Subjects for{" "}
                                                {
                                                    boards.find(
                                                        (b) =>
                                                            String(
                                                                b.boardId
                                                            ) === selectedBoard
                                                    )?.boardName
                                                }{" "}
                                                - Class{" "}
                                                {
                                                    classes.find(
                                                        (c) =>
                                                            String(
                                                                c.classId
                                                            ) === selectedClass
                                                    )?.className
                                                }
                                            </h3>
                                            <Button
                                                onClick={() =>
                                                    setIsAddingItem(true)
                                                }
                                                className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
                                                size="sm"
                                                disabled={isAddingItem}
                                            >
                                                <Plus
                                                    size={16}
                                                    className="mr-1"
                                                />{" "}
                                                Add Subject
                                            </Button>
                                        </div>

                                        {isAddingItem && (
                                            <div className="flex items-center gap-2 p-2 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
                                                <Input
                                                    value={newItemName}
                                                    onChange={(e) =>
                                                        setNewItemName(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter subject name"
                                                    className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 flex-1"
                                                />
                                                <Button
                                                    onClick={() =>
                                                        addNewItem("subject")
                                                    }
                                                    className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF]"
                                                    size="icon"
                                                    disabled={
                                                        createSubjectMutation.isPending
                                                    }
                                                >
                                                    {createSubjectMutation.isPending ? (
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                    ) : (
                                                        <Check size={16} />
                                                    )}
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        setIsAddingItem(false)
                                                    }
                                                    variant="destructive"
                                                    size="icon"
                                                >
                                                    <X size={16} />
                                                </Button>
                                            </div>
                                        )}

                                        {isLoadingSubjects ? (
                                            <div className="text-center py-6 text-gray-400">
                                                Loading subjects...
                                            </div>
                                        ) : subjectsError ? (
                                            <div className="text-center py-6 text-red-400">
                                                Error loading subjects. Please
                                                try again.
                                            </div>
                                        ) : (
                                            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                                                {subjects.map((subject) => (
                                                    <div
                                                        key={subject.subjectId}
                                                        className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30"
                                                    >
                                                        {editId ===
                                                            String(
                                                                subject.subjectId
                                                            ) &&
                                                        editType ===
                                                            "subject" ? (
                                                            <div className="flex items-center gap-2 flex-1">
                                                                <Input
                                                                    value={
                                                                        editName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setEditName(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="bg-[#3B444B]/50 border-[#6544A3] text-white"
                                                                />
                                                                <Button
                                                                    onClick={
                                                                        saveEdit
                                                                    }
                                                                    className="bg-green-600 hover:bg-green-700"
                                                                    size="icon"
                                                                    disabled={
                                                                        updateSubjectMutation.isPending
                                                                    }
                                                                >
                                                                    {updateSubjectMutation.isPending ? (
                                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                                    ) : (
                                                                        <Check
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    )}
                                                                </Button>
                                                                <Button
                                                                    onClick={
                                                                        cancelEdit
                                                                    }
                                                                    variant="destructive"
                                                                    size="icon"
                                                                >
                                                                    <X
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span className="text-white">
                                                                    {
                                                                        subject.subjectName
                                                                    }
                                                                </span>
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        onClick={() =>
                                                                            startEdit(
                                                                                "subject",
                                                                                String(
                                                                                    subject.subjectId
                                                                                ),
                                                                                subject.subjectName
                                                                            )
                                                                        }
                                                                        className="bg-[#6544A3] hover:bg-[#8D6CCB]"
                                                                        size="icon"
                                                                        variant="outline"
                                                                    >
                                                                        <Edit
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                "subject",
                                                                                String(
                                                                                    subject.subjectId
                                                                                )
                                                                            )
                                                                        }
                                                                        variant="destructive"
                                                                        size="icon"
                                                                        disabled={
                                                                            deleteSubjectMutation.isPending
                                                                        }
                                                                    >
                                                                        {deleteSubjectMutation.isPending &&
                                                                        deleteSubjectMutation.variables ===
                                                                            subject.subjectId ? (
                                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                                        ) : (
                                                                            <Trash2
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                                {subjects.length === 0 && (
                                                    <div className="text-center py-6 text-gray-400">
                                                        No subjects available
                                                        for this class. Add a
                                                        new subject to get
                                                        started.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {!selectedClass && (
                                    <div className="text-center py-6 text-gray-400">
                                        Please select a board and class to view
                                        or add subjects.
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Chapters Tab */}
                        <TabsContent value="chapters">
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="board-select-chapters"
                                            className="text-white"
                                        >
                                            Select Board
                                        </Label>
                                        <Select
                                            value={selectedBoard}
                                            onValueChange={(value) => {
                                                setSelectedBoard(value);
                                                setSelectedClass("");
                                                setSelectedSubject("");
                                            }}
                                        >
                                            <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                                                <SelectValue placeholder="Select a board" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                                {boards.map((board) => (
                                                    <SelectItem
                                                        key={board.boardId}
                                                        value={String(
                                                            board.boardId
                                                        )}
                                                        className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                                    >
                                                        {board.boardName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedBoard && (
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="class-select-chapters"
                                                className="text-white"
                                            >
                                                Select Class
                                            </Label>
                                            <Select
                                                value={selectedClass}
                                                onValueChange={(value) => {
                                                    setSelectedClass(value);
                                                    setSelectedSubject("");
                                                }}
                                            >
                                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                                                    <SelectValue placeholder="Select a class" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                                    {classes.map((cls) => (
                                                        <SelectItem
                                                            key={cls.classId}
                                                            value={String(
                                                                cls.classId
                                                            )}
                                                            className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                                        >
                                                            {cls.className}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    {selectedClass && (
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="subject-select-chapters"
                                                className="text-white"
                                            >
                                                Select Subject
                                            </Label>
                                            <Select
                                                value={selectedSubject}
                                                onValueChange={
                                                    setSelectedSubject
                                                }
                                            >
                                                <SelectTrigger className="bg-[#3B444B]/50 text-white border-[#6544A3]">
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#1E1E1E] text-white border-[#6544A3]">
                                                    {subjects.map((subject) => (
                                                        <SelectItem
                                                            key={
                                                                subject.subjectId
                                                            }
                                                            value={String(
                                                                subject.subjectId
                                                            )}
                                                            className="hover:bg-[#6544A3] focus:bg-[#6544A3]"
                                                        >
                                                            {
                                                                subject.subjectName
                                                            }
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>

                                {selectedSubject && (
                                    <>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-white">
                                                Chapters for{" "}
                                                {
                                                    boards.find(
                                                        (b) =>
                                                            String(
                                                                b.boardId
                                                            ) === selectedBoard
                                                    )?.boardName
                                                }{" "}
                                                - Class{" "}
                                                {
                                                    classes.find(
                                                        (c) =>
                                                            String(
                                                                c.classId
                                                            ) === selectedClass
                                                    )?.className
                                                }{" "}
                                                -
                                                {
                                                    subjects.find(
                                                        (s) =>
                                                            String(
                                                                s.subjectId
                                                            ) ===
                                                            selectedSubject
                                                    )?.subjectName
                                                }
                                            </h3>
                                            <Button
                                                onClick={() =>
                                                    setIsAddingItem(true)
                                                }
                                                className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white"
                                                size="sm"
                                                disabled={isAddingItem}
                                            >
                                                <Plus
                                                    size={16}
                                                    className="mr-1"
                                                />{" "}
                                                Add Chapter
                                            </Button>
                                        </div>

                                        {isAddingItem && (
                                            <div className="flex items-center gap-2 p-2 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30">
                                                <Input
                                                    value={newItemName}
                                                    onChange={(e) =>
                                                        setNewItemName(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter chapter name"
                                                    className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 flex-1"
                                                />
                                                <Button
                                                    onClick={() =>
                                                        addNewItem("chapter")
                                                    }
                                                    className="bg-gradient-to-r from-[#8D6CCB] to-[#9000FF]"
                                                    size="icon"
                                                    disabled={
                                                        createChapterMutation.isPending
                                                    }
                                                >
                                                    {createChapterMutation.isPending ? (
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                    ) : (
                                                        <Check size={16} />
                                                    )}
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        setIsAddingItem(false)
                                                    }
                                                    variant="destructive"
                                                    size="icon"
                                                >
                                                    <X size={16} />
                                                </Button>
                                            </div>
                                        )}

                                        {isLoadingChapters ? (
                                            <div className="text-center py-6 text-gray-400">
                                                Loading chapters...
                                            </div>
                                        ) : chaptersError ? (
                                            <div className="text-center py-6 text-red-400">
                                                Error loading chapters. Please
                                                try again.
                                            </div>
                                        ) : (
                                            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                                                {chapters.map((chapter) => (
                                                    <div
                                                        key={chapter.chapterId}
                                                        className="flex justify-between items-center p-3 rounded-md bg-[#3B444B]/30 border border-[#6544A3]/30"
                                                    >
                                                        {editId ===
                                                            String(
                                                                chapter.chapterId
                                                            ) &&
                                                        editType ===
                                                            "chapter" ? (
                                                            <div className="flex items-center gap-2 flex-1">
                                                                <Input
                                                                    value={
                                                                        editName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setEditName(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="bg-[#3B444B]/50 border-[#6544A3] text-white"
                                                                />
                                                                <Button
                                                                    onClick={
                                                                        saveEdit
                                                                    }
                                                                    className="bg-green-600 hover:bg-green-700"
                                                                    size="icon"
                                                                    disabled={
                                                                        updateChapterMutation.isPending
                                                                    }
                                                                >
                                                                    {updateChapterMutation.isPending ? (
                                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                                    ) : (
                                                                        <Check
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    )}
                                                                </Button>
                                                                <Button
                                                                    onClick={
                                                                        cancelEdit
                                                                    }
                                                                    variant="destructive"
                                                                    size="icon"
                                                                >
                                                                    <X
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span className="text-white">
                                                                    {
                                                                        chapter.chapterName
                                                                    }
                                                                </span>
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        onClick={() =>
                                                                            startEdit(
                                                                                "chapter",
                                                                                String(
                                                                                    chapter.chapterId
                                                                                ),
                                                                                chapter.chapterName
                                                                            )
                                                                        }
                                                                        className="bg-[#6544A3] hover:bg-[#8D6CCB]"
                                                                        size="icon"
                                                                        variant="outline"
                                                                    >
                                                                        <Edit
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                "chapter",
                                                                                String(
                                                                                    chapter.chapterId
                                                                                )
                                                                            )
                                                                        }
                                                                        variant="destructive"
                                                                        size="icon"
                                                                        disabled={
                                                                            deleteChapterMutation.isPending
                                                                        }
                                                                    >
                                                                        {deleteChapterMutation.isPending &&
                                                                        deleteChapterMutation.variables ===
                                                                            chapter.chapterId ? (
                                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                                        ) : (
                                                                            <Trash2
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                                {chapters.length === 0 && (
                                                    <div className="text-center py-6 text-gray-400">
                                                        No chapters available
                                                        for this subject. Add a
                                                        new chapter to get
                                                        started.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {!selectedSubject && (
                                    <div className="text-center py-6 text-gray-400">
                                        Please select a board, class, and
                                        subject to view or add chapters.
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent className="bg-[#1E1E1E] border-[#6544A3] text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            Are you sure you want to delete this item? This
                            action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-[#3B444B] text-white hover:bg-[#4B545B]">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 text-white hover:bg-red-700"
                            disabled={
                                (deleteItemInfo.type === "board" &&
                                    deleteBoardMutation.isPending) ||
                                (deleteItemInfo.type === "class" &&
                                    deleteClassMutation.isPending) ||
                                (deleteItemInfo.type === "subject" &&
                                    deleteSubjectMutation.isPending) ||
                                (deleteItemInfo.type === "chapter" &&
                                    deleteChapterMutation.isPending)
                            }
                        >
                            {(deleteItemInfo.type === "board" &&
                                deleteBoardMutation.isPending) ||
                            (deleteItemInfo.type === "class" &&
                                deleteClassMutation.isPending) ||
                            (deleteItemInfo.type === "subject" &&
                                deleteSubjectMutation.isPending) ||
                            (deleteItemInfo.type === "chapter" &&
                                deleteChapterMutation.isPending) ? (
                                <span className="flex items-center">
                                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Deleting...
                                </span>
                            ) : (
                                "Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Confirmation Dialog */}
            <AlertDialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <AlertDialogContent className="bg-[#1E1E1E] border-[#6544A3] text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            Are you sure you want to save these changes?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-[#3B444B] text-white hover:bg-[#4B545B]">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={processSaveEdit}
                            className="bg-[#6544A3] text-white hover:bg-[#8D6CCB]"
                            disabled={
                                (editItemInfo.type === "board" &&
                                    updateBoardMutation.isPending) ||
                                (editItemInfo.type === "class" &&
                                    updateClassMutation.isPending) ||
                                (editItemInfo.type === "subject" &&
                                    updateSubjectMutation.isPending) ||
                                (editItemInfo.type === "chapter" &&
                                    updateChapterMutation.isPending)
                            }
                        >
                            {(editItemInfo.type === "board" &&
                                updateBoardMutation.isPending) ||
                            (editItemInfo.type === "class" &&
                                updateClassMutation.isPending) ||
                            (editItemInfo.type === "subject" &&
                                updateSubjectMutation.isPending) ||
                            (editItemInfo.type === "chapter" &&
                                updateChapterMutation.isPending) ? (
                                <span className="flex items-center">
                                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Saving...
                                </span>
                            ) : (
                                "Save Changes"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
