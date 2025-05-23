import { Grid2X2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface TaskbarProps {
  openWindows: string[];
  minimized?: Record<string, boolean>;
  onRestore?: (id: string) => void;
  onMinimize?: (id: string) => void;
  onMenuClick?: () => void;
  menuOpen?: boolean;
  desktopIcons: { id: string; icon: React.ReactNode }[];
}

export default function Taskbar({
  openWindows,
  minimized = {},
  onRestore,
  onMinimize,
  onMenuClick,
  menuOpen,
  desktopIcons,
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
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-blue-900 to-blue-600 flex items-center shadow-lg z-50 h-[44px]">
      <button
        className={` text-white font-bold px-4 py-1 mr-4 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] h-full rounded ${
          menuOpen ? "ring-2 ring-blue-400" : ""
        }`}
        onClick={onMenuClick}
      >
        <span className="mr-2 flex items-center gap-2">
          <Grid2X2 size={20} color="#fff" />
          Inicio
        </span>
      </button>
      <div className="flex gap-2 flex-1 h-full">
        {openWindows.map((win) => {
          const iconObj = desktopIcons.find((i) => i.id === win);
          return (
            <button
              key={win}
              className={`px-2 py-1 text-sm rounded text-white hover:bg-[rgba(255,255,255,0.2)] flex items-center justify-center cursor-pointer ${
                minimized[win] ? "opacity-60 " : ""
              }`}
              onClick={() => minimized[win] ? onRestore?.(win) : onMinimize?.(win)}
              title={win}
            >
              {iconObj && React.isValidElement(iconObj.icon)
                // @ts-ignore
                ? React.cloneElement(iconObj.icon, { color: "#fff", size: 25 })
                : win}
            </button>
          );
        })}
      </div>
      <div className="ml-auto text-white font-mono px-3 py-1 rounded text-sm ">
        {time}
      </div>
    </div>
  );
}
