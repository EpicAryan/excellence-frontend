"use client";

import React from "react";

export default function ManageNotesLayout({
    children,
    hierarchy,
    content,
}: {
    children: React.ReactNode;
    hierarchy: React.ReactNode;
    content: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white">
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold text-white mb-6">
                    Notes Management
                </h1>
                {children}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
                    <div className="w-full">{hierarchy}</div>
                    <div className="w-full">{content}</div>
                </div>
            </div>
        </div>
    );
}
