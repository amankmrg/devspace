"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage, className = "" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      onImageUpload(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center px-4 py-2 border border-zinc-700 rounded-lg text-sm font-medium text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {uploading ? (
            <>
              <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Choose Image
            </>
          )}
        </button>
        
        {preview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="inline-flex items-center px-3 py-2 border border-red-700 rounded-lg text-sm font-medium text-red-300 bg-red-900/20 hover:bg-red-800/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload image file"
      />

      {error && (
        <div className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg p-2">
          {error}
        </div>
      )}

      {preview && (
        <div className="relative w-full max-w-md mx-auto">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-zinc-700">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-500">
        Supported formats: JPEG, PNG, WebP. Max size: 5MB
      </p>
    </div>
  );
};

export default ImageUpload;
