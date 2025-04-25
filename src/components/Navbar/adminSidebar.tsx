"use client";

import { Home, LogOut, User, Upload, FileText, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser"; 
import { logoutAction } from "@/app/actions/auth.actions"; 
import { toast } from 'sonner';
import { deleteCookie } from 'cookies-next'; 

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";



const sidebarItems = [
    {
      path: "notes/upload",
      icon: <Upload className="h-4 w-4" />,
      label: "Upload Notes",
    },
    {
      path: "students/register",
      icon: <UserPlus className="h-4 w-4" />,
      label: "Register Student",
    },
    {
      path: "notes/manage",
      icon: <FileText className="h-4 w-4" />,
      label: "Manage Notes",
    },
  ];



const AdminSidebar = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useUser();

    const logoutMutation = useMutation({
        mutationFn: logoutAction,
        onSuccess: (data) => {
            console.log("Logout response:", data);
            if (data.success) {
                deleteCookie('accessToken');
                deleteCookie('sessionId');
                queryClient.removeQueries({ queryKey: ['user'] });
                toast.success("User logged out successfully!")
                setTimeout(() => {
                    router.push('/auth/login');
                }, 100);
            }else {
                toast.error(data.message || "Logout failed");
            }
        },
        onError: (err) => {
            console.error("Logout failed", err);
            toast.error(`Error: ${err}`);
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };
    
    
    return (
        <Sidebar className="border-r border-r-[#7A51C8] h-screen flex flex-col">
            <SidebarHeader className="p-4 border-b border-b-[#7A51C8]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#7A51C8] rounded-md flex items-center justify-center text-sm text-white font-bold">
                            E
                        </div>
                        <span className="font-bold text-sm">
                            Excellence Pathshala
                        </span>
                    </div>
                    <Link
                        href="/"
                        className=" p-2 rounded-full hover:bg-[#8D6CCB]"
                    >
                        <Home className="h-5 w-5 text-[#7A51C8] hover:text-white" />
                    </Link>
                </div>
            </SidebarHeader>

            <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7A51C8] flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        {isLoading ? (
                            <p className="font-medium text-sm text-neutral-900">Loading...</p>
                        ) : user ? (
                            <>
                                <p className="font-semibold text-sm text-neutral-900">
                                    {user.username.toUpperCase()}
                                </p>
                                <p className="text-xs font-medium text-gray-700">{user.role?.toUpperCase()}</p>
                            </>
                        ) : (
                            <>
                                <p className="font-medium text-sm text-neutral-900">Guest</p>
                                <p className="text-xs text-gray-700">Not logged in</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <SidebarContent className="flex-grow overflow-y-auto">
                <SidebarGroup>
                    <SidebarMenu>
                        {sidebarItems.map((item, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild className="hover:bg-[#8D6CCB] active:scale-105 active:bg-[#8D6CCB] active:text-white">
                                    <Link
                                        href={`/admin/${item.path}`}
                                        className="flex items-center gap-2 text-neutral-900 font-medium hover:text-white rounded-md p-2"
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center border border-[#8D6CCB] bg-gray-300 gap-2 py-2 px-3 text-red-600 font-semibold hover:bg-red-500 hover:text-gray-200 rounded-md"
                    disabled={logoutMutation.isPending}
                >
                    <LogOut className="h-4 w-4" />
                    <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
                </button>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AdminSidebar;
