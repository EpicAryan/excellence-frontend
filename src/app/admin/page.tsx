import React from "react";
import Link from "next/link";
import { Briefcase, ClipboardList, Users } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen container mx-auto text-white p-6 mt-10">
      {/* Welcome Section */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Welcome to the Admin Dashboard
      </h1>
      <p className="mt-2 text-gray-300 text-lg">
        Manage your platform efficiently with quick actions below.
      </p>

      {/* Cards Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center text-center cursor-pointer">
              <div className="p-4 bg-purple-600 rounded-full">{item.icon}</div>
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-gray-400">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Dashboard Items
const dashboardItems = [
  {
    title: "Manage Notes",
    description: "View, edit, and delete uploaded notes.",
    href: "/admin/notes/manage",
    icon: <ClipboardList className="h-10 w-10 text-white" />,
  },
  {
    title: "Register Students",
    description: "Add new students to the system easily.",
    href: "/admin/students/register",
    icon: <Users className="h-10 w-10 text-white" />,
  },
  {
    title: "Upload Notes",
    description: "Upload and organize study materials.",
    href: "/admin/notes/upload",
    icon: <Briefcase className="h-10 w-10 text-white" />,
  },
];

export default AdminDashboard;
