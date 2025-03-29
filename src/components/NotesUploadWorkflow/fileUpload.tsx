'use client'

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

const FileUpload = ({ handleFileChange }: { handleFileChange: (file: File) => void }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]); // Pass the first selected file
    }
  }, [handleFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] }, // Restrict to PDFs
    multiple: false, // Allow only one file
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
      <p className={`text-sm ${isDragActive ? 'text-[#B091EA]' : 'text-gray-400'}`}>
        {isDragActive ? (
          "Drop the PDF here..."
        ) : (
          "Drag & Drop a PDF here or click to browse"
        )}
      </p>
    </div>
  );
};

export default FileUpload;
