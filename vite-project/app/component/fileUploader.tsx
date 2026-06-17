import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/formatSize";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0] || null;
        setFile(selectedFile);
        if (onFileSelect) {
            onFileSelect(selectedFile);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "application/pdf": [".pdf"]
        },
        maxSize: 20 * 1024 * 1024, // 20MB
    });

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()} className="p-6 cursor-pointer">
                <input {...getInputProps()} />
                <div className="space-y-4 text-center">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-200">
                        <img src="/icons/info.svg" alt="Upload" className="size-20" />
                    </div>
                    {file ? (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-3 text-left">
                                <span className="file-icons icon-[fa6-solid_file-pdf] w-6 h-6 text-red-500"></span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFile(null);
                                    if (onFileSelect) onFileSelect(null);
                                }}
                                className="text-sm text-red-600 hover:text-red-800 transition-colors font-medium"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-lg text-gray-500">
                                {isDragActive ? (
                                    "Drop the file here..."
                                ) : (
                                    <>
                                        No file selected.{" "}
                                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                    </>
                                )}
                            </p>
                            <p className="text-lg text-gray-500">PDF (max 20MB)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;