import React from "react";
export default function GalleryWindow() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Galería</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Imagen 1</span>
        </div>
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Imagen 2</span>
        </div>
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Imagen 3</span>
        </div>
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Imagen 4</span>
        </div>
      </div>
    </div>
  );
}