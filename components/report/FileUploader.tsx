"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FileUploaderProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export function FileUploader({ files, setFiles }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white">
        Attach Evidence (Optional)
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-6 transition-colors ${
          isDragging ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
        }`}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer text-center block">
          <span className="text-zinc-400">
            Drop files here or click to upload
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-sm text-zinc-300 bg-zinc-800 rounded p-2"
            >
              <div className="flex items-center gap-2">
                {file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <span>{file.name}</span>
              </div>
              <button
                onClick={() => handleRemoveFile(index)}
                className="text-red-400 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
