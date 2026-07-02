import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { ImageCropper } from './ImageCropper';

interface ImageUploadBoxProps {
  id: string;
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  imageClassName?: string;
  aspect?: number;
}

export function ImageUploadBox({ id, label, file, onChange, imageClassName = "object-contain", aspect }: ImageUploadBoxProps) {
  const [cropFile, setCropFile] = useState<File | null>(null);

  const handleSelect = (raw: File | null) => {
    if (!raw) { onChange(null); return; }
    if (aspect) {
      setCropFile(raw);
    } else {
      onChange(raw);
    }
  };

  const handleCropConfirm = (cropped: File) => {
    onChange(cropped);
    setCropFile(null);
  };

  return (
    <div>
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <label htmlFor={id} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
        <div className="space-y-1 text-center w-full">
          {file ? (
            <div className="relative h-24 w-full flex justify-center mb-2">
              <img src={URL.createObjectURL(file)} alt={`${label} Preview`} className={`h-full w-full rounded-md ${imageClassName}`} />
            </div>
          ) : (
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
          )}
          <div className="flex text-sm text-gray-600 justify-center mt-2">
            <span className="relative bg-white rounded-md font-medium text-[#195b3d] hover:text-[#13472f]">
              {file ? "Trocar imagem" : "Fazer upload"}
            </span>
          </div>
          {!file && <p className="text-xs text-gray-500 mt-1">PNG, JPG até 5MB</p>}
          {file && <p className="text-xs text-[#195b3d] font-semibold mt-2 break-all">{file.name}</p>}
        </div>
        <input id={id} type="file" className="hidden" accept="image/*" onChange={(e) => handleSelect(e.target.files?.[0] || null)} />
      </label>

      {cropFile && aspect && (
        <ImageCropper file={cropFile} aspect={aspect} onConfirm={handleCropConfirm} onCancel={() => setCropFile(null)} />
      )}
    </div>
  );
}
