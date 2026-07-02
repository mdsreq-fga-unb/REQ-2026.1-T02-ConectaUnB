"use client";

import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { ImageCropper } from "./ImageCropper";

type EditablePhotoProps = {
  src?: string | null;
  alt?: string;
  onFileSelected?: (file: File) => void;
  editable?: boolean;
  variant?: "badge" | "overlay";
  className?: string;
  fallback?: React.ReactNode;
  aspect?: number;
};

export function EditablePhoto({
  src,
  alt = "foto",
  onFileSelected,
  editable = false,
  variant = "badge",
  className = "",
  fallback,
  aspect,
}: EditablePhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropFile, setCropFile] = useState<File | null>(null);

  const currentSrc = previewUrl ?? src ?? undefined;

  const openPicker = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (aspect) {
      setCropFile(file);
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelected?.(file);
    }
    e.target.value = "";
  };

  const handleCropConfirm = (cropped: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(cropped));
    onFileSelected?.(cropped);
    setCropFile(null);
  };

  const shape = variant === "badge" ? "rounded-full" : "rounded-xl";

  return (
    <div className={`relative ${className}`}>
      <div className={`relative h-full w-full overflow-hidden ${shape}`}>
        {currentSrc ? (
          <img
            src={currentSrc}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          fallback ?? <div className="h-full w-full bg-gray-200" />
        )}
      </div>

      {editable && (
        <>
          {variant === "badge" ? (
            <button
              type="button"
              onClick={openPicker}
              aria-label="Alterar foto"
              className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#006633] text-white shadow-md ring-2 ring-white transition-colors hover:bg-[#004d26]"
            >
              <Camera size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={openPicker}
              aria-label="Alterar capa"
              className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <Camera size={18} /> Alterar capa
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}

      {cropFile && aspect && (
        <ImageCropper file={cropFile} aspect={aspect} onConfirm={handleCropConfirm} onCancel={() => setCropFile(null)} />
      )}
    </div>
  );
}
