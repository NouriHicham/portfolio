import React, { useState, useEffect, useRef } from "react";
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
  // Responsivo: tamaño inicial y mínimo según pantalla
  const vw = typeof window !== "undefined" ? window.innerWidth : 800;
  const vh = typeof window !== "undefined" ? window.innerHeight : 600;
  const initialWidth = vw < 600 ? vw * 0.98 : 600;
  const initialHeight = vh < 600 ? vh * 0.85 : 550;
  const minWidth = vw < 600 ? vw * 0.95 : 320;
  const minHeight = 220;
  const [dragDisabled, setDragDisabled] = useState(false);

  const [isMaximized, setIsMaximized] = useState(false);
  // Offset aleatorio para la posición inicial
  function getRandomOffset(max = 40) {
    return Math.floor(Math.random() * max);
  }
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [position, setPosition] = useState({
    x: Math.max(10, vw * 0.05) + getRandomOffset(),
    y: Math.max(10, vh * 0.08) + getRandomOffset(),
  });

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
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={vw}
      maxHeight={vh - 48}
      bounds="window"
      dragHandleClassName="window-titlebar"
      className={`z-40 ${isActive ? "" : "opacity-80"}`}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, pos) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        setPosition(pos);
      }}
      enableResizing={!isMaximized}
      disableDragging={isMaximized || dragDisabled}
    >
      <div className="flex flex-col h-full w-full bg-gray-100 border-1 border-blue-700 rounded shadow-lg">
        <div className="window-titlebar flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-2 cursor-move select-none z-10 relative">
          <span className="font-bold text-base truncate max-w-[70vw]">{title}</span>
          <div className="flex gap-1">
            <button
              className="hover:bg-blue-400 rounded flex items-center justify-center p-1.5 cursor-default"
              onClick={onMinimize}
              onMouseDown={e => { setDragDisabled(true); e.stopPropagation()}}
              onMouseUp={() => setDragDisabled(false)}
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
        <div className="bg-white rounded-b flex-1 min-h-0 overflow-auto scroll-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 z-0">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
