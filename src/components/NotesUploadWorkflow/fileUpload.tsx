import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
      className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition 
      ${isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-500 bg-[#4A4A4A] text-lime-400"}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop the PDF here...</p>
      ) : (
        <p>Drag & Drop a PDF here or click to browse</p>
      )}
    </div>
  );
};

export default FileUpload;
