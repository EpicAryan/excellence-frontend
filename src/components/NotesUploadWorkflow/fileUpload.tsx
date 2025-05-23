// 'use client'

// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { Upload } from "lucide-react";

// const FileUpload = ({ handleFileChange }: { handleFileChange: (file: File) => void }) => {
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//       if (file.type === 'application/pdf') {
//         handleFileChange(file);
//       }
//   }, [handleFileChange]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"] }, // Restrict to PDFs
//     multiple: false, // Allow only one file
//     maxSize: 25 * 1024 * 1024, // 25MB
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className={`
//         w-full h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer
//         ${isDragActive 
//           ? 'border-[#9000FF] bg-[#6544A3]/20' 
//           : 'border-[#6544A3] bg-[#3B444B]/30'
//         }
//         hover:border-[#9000FF] hover:bg-[#6544A3]/10 transition-colors
//       `}
//     >
//       <input {...getInputProps()} />
//       <Upload 
//         size={20} 
//         className={`${isDragActive ? 'text-[#9000FF]' : 'text-[#8D6CCB]'} mb-2`} 
//       />
//       <p className={`text-sm ${isDragActive ? 'text-[#B091EA]' : 'text-gray-400'} text-center px-4`}>
//         {isDragActive ? (
//           "Drop the PDF here..."
//         ) : (
//           "Drag & Drop a PDF here or click to browse"
//         )}
//       </p>
//       <p className="text-xs text-gray-500 mt-1">Max size: 25MB</p>
//     </div>
//   );
// };

// export default FileUpload;
'use client'

import { useCallback, useState } from "react";
import { useDropzone,FileRejection  } from "react-dropzone";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";

interface FileUploadProps {
  handleFileChange: (file: File) => void;
  selectedFile?: File | null;
  onRemoveFile?: () => void;
}

const FileUpload = ({ handleFileChange, selectedFile, onRemoveFile }: FileUploadProps) => {
  const [error, setError] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError(""); // Clear previous errors

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some((e) => e.code === 'file-too-large')) {
        setError("File is too large. Maximum size is 25MB.");
      } else if (rejection.errors.some((e) => e.code === 'file-invalid-type')) {
        setError("Only PDF files are allowed.");
      } else {
        setError("File upload failed. Please try again.");
      }
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      if (file.type === 'application/pdf') {
        handleFileChange(file);
      } else {
        setError("Only PDF files are allowed.");
      }
    }
  }, [handleFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    maxSize: 25 * 1024 * 1024, // 25MB
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-3">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`
            w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-[#9000FF] bg-[#6544A3]/20 scale-102' 
              : 'border-[#6544A3] bg-[#3B444B]/30'
            }
            hover:border-[#9000FF] hover:bg-[#6544A3]/10 hover:scale-102
            ${error ? 'border-red-400 bg-red-50/5' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload 
            size={24} 
            className={`${isDragActive ? 'text-[#9000FF]' : 'text-[#8D6CCB]'} mb-2`} 
          />
          <p className={`text-sm font-medium ${isDragActive ? 'text-[#B091EA]' : 'text-gray-300'} text-center px-4`}>
            {isDragActive ? (
              "Drop the PDF here..."
            ) : (
              "Drag & Drop a PDF here or click to browse"
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">Max size: 25MB • PDF files only</p>
        </div>
      ) : (
        <div className="w-full p-4 border border-[#6544A3] rounded-lg bg-[#3B444B]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100/10 rounded-lg">
                <File className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200 truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            {onRemoveFile && (
              <button
                onClick={onRemoveFile}
                className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
                type="button"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-400/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
