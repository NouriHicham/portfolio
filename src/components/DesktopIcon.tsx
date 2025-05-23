import React, { useEffect, useState } from "react";

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
  const [colorIcon, setColorIcon] = useState("#2563eb");

  useEffect(() => {
    // Función para actualizar el color según la clase del body
    const updateColor = () => {
      if (document.body.classList.contains("theme-dark")) {
        setColorIcon("#6C98F8");
      } else {
        setColorIcon("#2563eb");
      }
    };
    updateColor();
    // Observa cambios en la clase del body
    const observer = new MutationObserver(updateColor);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex flex-col items-center w-20 cursor-pointer select-none hover:bg-[rgba(255,255,255,0.2)] rounded-xs"
      onDoubleClick={onDoubleClick}
      tabIndex={0}
    >
      <div className="w-12 h-12 mb-1 drop-shadow flex items-center justify-center ">
        {/* @ts-ignore */}
        {React.cloneElement(icon, { color: colorIcon })}
      </div>
      <span className="text-xs text-white text-center bg-blue-800/60 dark:bg-blue-500 rounded px-1">
        {label}
      </span>
    </div>
  );
}
