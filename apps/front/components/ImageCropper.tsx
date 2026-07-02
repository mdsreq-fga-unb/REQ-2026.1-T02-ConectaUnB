'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, X } from 'lucide-react';

interface ImageCropperProps {
  file: File;
  aspect: number;
  onConfirm: (file: File) => void;
  onCancel: () => void;
}

export function ImageCropper({ file, aspect, onConfirm, onCancel }: ImageCropperProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null);
  const [imgLoaded, setImgLoaded] = useState<HTMLImageElement | null>(null);

  const CONTAINER_W = 400;
  const CONTAINER_H = CONTAINER_W / aspect;

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImgDim({ w: img.naturalWidth, h: img.naturalHeight });
      setImgSrc(url);
      setImgLoaded(img);
      const base = Math.max(CONTAINER_W / img.naturalWidth, CONTAINER_H / img.naturalHeight);
      const dispW = img.naturalWidth * base;
      const dispH = img.naturalHeight * base;
      setPos({
        x: (CONTAINER_W - dispW) / 2,
        y: (CONTAINER_H - dispH) / 2,
      });
      setScale(1);
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const baseScale = imgDim.w ? Math.max(CONTAINER_W / imgDim.w, CONTAINER_H / imgDim.h) : 1;
  const effScale = baseScale * scale;
  const dispW = imgDim.w * effScale;
  const dispH = imgDim.h * effScale;

  const clamp = useCallback((x: number, y: number) => {
    return {
      x: Math.min(0, Math.max(CONTAINER_W - dispW, x)),
      y: Math.min(0, Math.max(CONTAINER_H - dispH, y)),
    };
  }, [dispW, dispH]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.sx;
    const dy = e.clientY - dragRef.current.sy;
    setPos(clamp(dragRef.current.px + dx, dragRef.current.py + dy));
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const handleZoom = (dir: number) => {
    setScale((s) => {
      const newS = Math.max(1, Math.min(4, s + dir * 0.2));
      const newEff = baseScale * newS;
      const newDW = imgDim.w * newEff;
      const newDH = imgDim.h * newEff;
      setPos((prev) => clamp(prev.x, prev.y));
      return newS;
    });
  };

  useEffect(() => {
    if (imgDim.w) {
      setPos((prev) => clamp(prev.x, prev.y));
    }
  }, [scale, baseScale]);

  const handleConfirm = async () => {
    if (!imgLoaded) return;
    const sx = Math.max(0, -pos.x / effScale);
    const sy = Math.max(0, -pos.y / effScale);
    const sw = Math.min(CONTAINER_W / effScale, imgDim.w - sx);
    const sh = Math.min(CONTAINER_H / effScale, imgDim.h - sy);
    if (sw <= 0 || sh <= 0) return;
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(Math.round(sw), 1280);
    canvas.height = Math.round(canvas.width / aspect);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(imgLoaded, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const cropped = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' });
      onConfirm(cropped);
    }, 'image/webp', 0.9);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold text-gray-800">Ajustar imagem</h3>
          <button onClick={onCancel} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div
            ref={containerRef}
            className="relative mx-auto overflow-hidden bg-[#e0e0e0]"
            style={{ width: CONTAINER_W, height: CONTAINER_H }}
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Crop preview"
                draggable={false}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{
                  width: dispW,
                  height: dispH,
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  userSelect: 'none',
                  touchAction: 'none',
                }}
              />
            )}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleZoom(-1)}
              className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100"
            >
              <ZoomOut size={20} />
            </button>
            <input
              type="range"
              min={1}
              max={4}
              step={0.05}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-40 accent-[#195b3d]"
            />
            <button
              type="button"
              onClick={() => handleZoom(1)}
              className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100"
            >
              <ZoomIn size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t bg-gray-50 px-4 py-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-md bg-[#195b3d] px-4 py-2 text-sm font-medium text-white hover:bg-[#12452c]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
