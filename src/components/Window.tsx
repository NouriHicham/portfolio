import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { Minus, Square, X } from "lucide-react";

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  minimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
  isActive?: boolean;
}

export default function Window({
  title,
  onClose,
  children,
  minimized,
  onMinimize,
  onRestore,
  isActive,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: 600, height: 550 });
  const [position, setPosition] = useState({ x: 120, y: 100 });

  // Guardar tamaño y posición previos al maximizar
  const prevSize = useRef(size);
  const prevPosition = useRef(position);

  useEffect(() => {
    if (isMaximized) {
      prevSize.current = size;
      prevPosition.current = position;
      setSize({ width: window.innerWidth, height: window.innerHeight - 48 });
      setPosition({ x: 0, y: 0 });
    } else {
      setSize(prevSize.current);
      setPosition(prevPosition.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaximized]);

  if (minimized) {
    // No renderiza la ventana si está minimizada
    return null;
  }

  return (
    <Rnd
      size={size}
      position={position}
      minWidth={400}
      minHeight={350}
      bounds="window"
      dragHandleClassName="window-titlebar"
      className={`z-40 ${isActive ? "" : "opacity-80"}`}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, pos) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        setPosition(pos);
      }}
      enableResizing={!isMaximized}
      disableDragging={isMaximized}
    >
      <div className="flex flex-col h-full w-full bg-gray-100 border-1 border-blue-700 rounded shadow-lg">
        <div className="window-titlebar flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-2 cursor-move select-none">
          <span className="font-bold">{title}</span>
          <div className="flex gap-1">
            <button
              className="hover:bg-blue-400 rounded flex items-center justify-center cursor-pointer p-1.5"
              onClick={onMinimize}
              title="Minimizar"
              tabIndex={-1}
              type="button"
            >
              <Minus size={16} color="#fff" />
            </button>
            <button
              className="hover:bg-blue-400 rounded flex items-center justify-center cursor-pointer p-1.5"
              onClick={() => setIsMaximized((v) => !v)}
              title={isMaximized ? "Restaurar" : "Maximizar"}
              tabIndex={-1}
              type="button"
            >
              <Square size={16} color="#fff" />
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center cursor-pointer p-1.5"
              onClick={onClose}
              title="Cerrar"
              tabIndex={-1}
              type="button"
            >
              <X size={16} color="#fff" />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-b flex-1 overflow-auto scroll-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
