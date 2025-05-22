import React from "react";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onDoubleClick: () => void;
}

export default function DesktopIcon({
  icon,
  label,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <div
      className="flex flex-col items-center w-20 cursor-pointer select-none hover:bg-[rgba(255,255,255,0.2)] rounded-xs"
      onDoubleClick={onDoubleClick}
      tabIndex={0}
    >
      <div className="w-12 h-12 mb-1 drop-shadow flex items-center justify-center ">
        {icon}
      </div>
      <span className="text-xs text-white text-center bg-blue-800/60 rounded px-1">
        {label}
      </span>
    </div>
  );
}
