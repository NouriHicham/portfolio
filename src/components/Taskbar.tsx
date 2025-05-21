import { Grid2X2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface TaskbarProps {
  openWindows: string[];
  minimized?: Record<string, boolean>;
  onRestore?: (id: string) => void;
  onMenuClick?: () => void;
  menuOpen?: boolean;
}

export default function Taskbar({
  openWindows,
  minimized = {},
  onRestore,
  onMenuClick,
  menuOpen,
}: TaskbarProps) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-gradient-to-t from-blue-900 to-blue-600 flex items-center px-4 shadow-lg z-50">
      <button
        className={` text-white font-bold px-4 py-1 rounded mr-4 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] ${
          menuOpen ? "ring-2 ring-blue-400" : ""
        }`}
        onClick={onMenuClick}
      >
        <span className="mr-2 flex items-center gap-2 ">
          <Grid2X2 size={20} color="#fff" />
          Inicio
        </span>
      </button>
      <div className="flex gap-2 flex-1">
        {openWindows.map((win) => (
          <button
            key={win}
            className={`bg-white/80 px-3 py-1 rounded shadow text-sm text-gray-800 ${
              minimized[win] ? "opacity-60" : ""
            }`}
            onClick={() => minimized[win] && onRestore?.(win)}
            title={minimized[win] ? "Restaurar" : "Ventana activa"}
          >
            {win}
          </button>
        ))}
      </div>
      <div className="ml-auto text-white font-mono px-3 py-1 rounded text-sm bg-black/30">
        {time}
      </div>
    </div>
  );
}
