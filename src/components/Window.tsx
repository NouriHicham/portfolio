import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { Minus, Square, X } from "lucide-react";

interface WindowProps {
  title: string | React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  minimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
  isActive?: boolean;
  onActivate?: () => void;
  size: { width: number; height: number };
  position: { x: number; y: number };
  onChangeSize: (size: { width: number; height: number }) => void;
  onChangePosition: (position: { x: number; y: number }) => void;
}

export default function Window({
  title,
  onClose,
  children,
  minimized,
  onMinimize,
  onRestore,
  isActive,
  onActivate,
  size,
  position,
  onChangeSize,
  onChangePosition,
}: WindowProps) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 800;
  const vh = typeof window !== "undefined" ? window.innerHeight : 600;
  const minWidth = vw < 600 ? vw * 0.95 : 320;
  const minHeight = 220;
  const [dragDisabled, setDragDisabled] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const prevSize = React.useRef(size);
  const prevPosition = React.useRef(position);

  useEffect(() => {
    if (isMaximized) {
      prevSize.current = size;
      prevPosition.current = position;
      onChangeSize({ width: window.innerWidth, height: window.innerHeight - 48 });
      onChangePosition({ x: 0, y: 0 });
    } else {
      // Restaurar tamaño y posición previos
      onChangeSize(prevSize.current);
      onChangePosition(prevPosition.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaximized]);

  if (minimized) return null;

  return (
    <Rnd
      size={size}
      position={position}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={vw}
      maxHeight={vh - 48}
      bounds="window"
      dragHandleClassName="drag-area"
      className={`z-40 ${isActive ? "" : "opacity-80"}`}
      onDragStop={(_, d) => onChangePosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, pos) => {
        onChangeSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        onChangePosition(pos);
      }}
      enableResizing={!isMaximized}
      disableDragging={isMaximized || dragDisabled}>
      <div
        className="flex flex-col h-full w-full bg-gray-100 border-1 border-blue-700 rounded shadow-lg"
        onMouseDown={onActivate}>
        <div className="window-titlebar flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-2 select-none z-10 relative">
          <div className="drag-area flex-1 cursor-move flex items-center overflow-auto">
            <span className="font-bold text-base truncate max-w-[70vw]">{title}</span>
          </div>
          <div className="flex gap-1 ml-2">
            <button
              className="hover:bg-blue-400 rounded flex items-center justify-center p-1.5 cursor-default"
              onClick={onMinimize}
              onMouseDown={e => e.stopPropagation()}
              title="Minimizar"
              tabIndex={-1}
              type="button"
            >
              <Minus size={16} color="#fff" />
            </button>
            <button
              className="hover:bg-blue-400 rounded flex items-center justify-center p-1.5 cursor-default"
              onClick={() => setIsMaximized((v) => !v)}
              onMouseDown={e => e.stopPropagation()}
              title={isMaximized ? "Restaurar" : "Maximizar"}
              tabIndex={-1}
              type="button"
            >
              <Square size={16} color="#fff" />
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center p-1.5 cursor-default"
              onClick={onClose}
              onMouseDown={e => e.stopPropagation()}
              title="Cerrar"
              tabIndex={-1}
              type="button"
            >
              <X size={16} color="#fff" />
            </button>
          </div>
        </div>
          <div className="bg-white rounded-b flex-1 min-h-0 overflow-auto scroll-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-200 z-0">
            {children}
          </div>
      </div>
    </Rnd>
  );
}
