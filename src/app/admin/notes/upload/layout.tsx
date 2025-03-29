"use client";

import React from "react";

export default function ManageNotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white">
            <div className="container mx-auto py-6 ">
               
                {children}
                
            </div>
        </div>
    );
}
