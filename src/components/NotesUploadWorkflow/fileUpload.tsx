'use client'

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

const FileUpload = ({ handleFileChange }: { handleFileChange: (file: File) => void }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        handleFileChange(file);
      }
  }, [handleFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] }, // Restrict to PDFs
    multiple: false, // Allow only one file
    maxSize: 25 * 1024 * 1024, // 25MB
  });

  return (
    <div
      {...getRootProps()}
      className={`
        w-full h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer
        ${isDragActive 
          ? 'border-[#9000FF] bg-[#6544A3]/20' 
          : 'border-[#6544A3] bg-[#3B444B]/30'
        }
        hover:border-[#9000FF] hover:bg-[#6544A3]/10 transition-colors
      `}
    >
      <input {...getInputProps()} />
      <Upload 
        size={20} 
        className={`${isDragActive ? 'text-[#9000FF]' : 'text-[#8D6CCB]'} mb-2`} 
      />
      <p className={`text-sm ${isDragActive ? 'text-[#B091EA]' : 'text-gray-400'} text-center px-4`}>
        {isDragActive ? (
          "Drop the PDF here..."
        ) : (
          "Drag & Drop a PDF here or click to browse"
        )}
      </p>
      <p className="text-xs text-gray-500 mt-1">Max size: 25MB</p>
    </div>
  );
};

export default FileUpload;
