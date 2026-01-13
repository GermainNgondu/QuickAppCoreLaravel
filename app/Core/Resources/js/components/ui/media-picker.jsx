import React, { useRef } from 'react';
import { Button } from "@ui/button";
import { cn } from "@lib";
import { X, Upload, FileImage } from "lucide-react";

export function MediaPicker({ value, onChange, multiple = false, accepts = [], className }) {
    const inputRef = useRef(null);
    const files = Array.isArray(value) ? value : (value ? [value] : []);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // In a real app, you would upload these files and get URLs/IDs back.
        // For now, we'll just mock it by using the file object or creating a URL.
        const newFiles = selectedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            url: URL.createObjectURL(file), // Temporary preview
            name: file.name,
            type: file.type
        }));

        if (multiple) {
            onChange([...files, ...newFiles]);
        } else {
            onChange(newFiles[0] || null);
        }
    };

    const removeFile = (fileToRemove) => {
        if (multiple) {
            onChange(files.filter(f => f.id !== fileToRemove.id));
        } else {
            onChange(null);
        }
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={cn("space-y-3", className)}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
               {files.map((file, idx) => (
                   <div key={file.id || idx} className="relative group border rounded-lg overflow-hidden aspect-square flex items-center justify-center bg-muted">
                       {file.url && file.type?.startsWith('image/') ? (
                           <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                       ) : (
                           <div className="flex flex-col items-center">
                               <FileImage className="w-8 h-8 text-muted-foreground" />
                               <span className="text-xs mt-1 truncate max-w-[80px]">{file.name}</span>
                           </div>
                       )}
                       
                       <button
                           type="button"
                           onClick={() => removeFile(file)}
                           className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                           <X className="w-3 h-3" />
                       </button>
                   </div>
               ))}
                
               {(multiple || files.length === 0) && (
                   <div 
                       onClick={onButtonClick}
                       className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer rounded-lg flex flex-col items-center justify-center aspect-square transition-colors"
                   >
                       <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                       <span className="text-xs text-muted-foreground">Upload</span>
                   </div>
               )}
            </div>

            <input 
                type="file" 
                ref={inputRef} 
                className="hidden" 
                multiple={multiple} 
                accept={accepts.join(',')} 
                onChange={handleFileChange} 
            />
        </div>
    );
}
