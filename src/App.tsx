import React, { useState } from "react";
import Taskbar from "./components/Taskbar";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import {
  User,
  Folder,
  Mail,
  Sparkles,
  Monitor,
  Image,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

// Iconos del escritorio: azul
const desktopIcons = [
  {
    id: "MyPC",
    label: "Mi PC",
    icon: <Monitor size={48} color="#2563eb" strokeWidth={1.5} />,
  },
  {
    id: "About",
    label: "Sobre mí",
    icon: <User size={48} color="#2563eb" strokeWidth={1.5} />,
  },
  {
    id: "Projects",
    label: "Proyectos",
    icon: <Folder size={48} color="#2563eb" strokeWidth={1.5} />,
  },
  {
    id: "Skills",
    label: "Habilidades",
    icon: <Sparkles size={48} color="#2563eb" strokeWidth={1.5} />,
  },
  {
    id: "Contact",
    label: "Contacto",
    icon: <Mail size={48} color="#2563eb" strokeWidth={1.5} />,
  },
  {
    id: "Gallery",
    label: "Galería",
    icon: <Image size={48} color="#2563eb" strokeWidth={1.5} />,
  },
  {
    id: "Settings",
    label: "Configuración",
    icon: <Settings size={48} color="#2563eb" strokeWidth={1.5} />,
  },
  {
    id: "Help",
    label: "Ayuda",
    icon: <HelpCircle size={48} color="#2563eb" strokeWidth={1.5} />,
  },
  {
    id: "Logout",
    label: "Cerrar sesión",
    icon: <LogOut size={48} color="#2563eb" strokeWidth={1.5} />,
  },
];

const pcInfo = {
  plataforma: navigator.platform,
  userAgent: navigator.userAgent,
  idioma: navigator.language,
  // @ts-ignore
  memoria: navigator.deviceMemory || "No disponible",
  cpu: navigator.hardwareConcurrency || "No disponible",
  resolucion: `${screen.width}x${screen.height}`,
  conexion: navigator.onLine ? "Online" : "Offline",
};

export default function App() {
  const [openWindows, setOpenWindows] = useState<string[]>(["About"]);
  const [minimized, setMinimized] = useState<Record<string, boolean>>({});
  const [showMenu, setShowMenu] = useState(false);

  const handleIconDoubleClick = (id: string) => {
    if (id === "Logout") {
      alert("Sesión cerrada.");
      setShowMenu(false);
      return;
    }
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
    }
    setMinimized((prev) => ({ ...prev, [id]: false }));
    setShowMenu(false);
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(openWindows.filter((win) => win !== id));
    setMinimized((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleMinimizeWindow = (id: string) => {
    setMinimized((prev) => ({ ...prev, [id]: true }));
  };

  const handleRestoreWindow = (id: string) => {
    setMinimized((prev) => ({ ...prev, [id]: false }));
  };

  // Solo los iconos principales en el escritorio
  const desktopMainIcons = desktopIcons.filter((icon) =>
    ["MyPC", "About", "Projects", "Skills", "Contact"].includes(icon.id)
  );

  // Iconos del menú de inicio (todos menos Logout al final)
  const menuIcons = [
    ...desktopIcons.filter((icon) =>
      [
        "MyPC",
        "About",
        "Projects",
        "Skills",
        "Contact",
        "Gallery",
        "Settings",
        "Help",
      ].includes(icon.id)
    ),
    desktopIcons.find((icon) => icon.id === "Logout"),
  ].filter(Boolean);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans">
      {/* Escritorio */}
      <div className="absolute inset-0">
        <div className="p-6 flex flex-col gap-6">
          {desktopMainIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon.icon}
              label={icon.label}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
            />
          ))}
        </div>
      </div>
      {/* Menú de inicio */}
      {showMenu && (
        <div className="fixed left-0 bottom-[48px] z-50 bg-blue-800 border-blue-700 shadow-lg min-w-[220px] py-2">
          {/* Usuario en la parte superior */}
          <div className="flex items-center gap-2 pb-2 border-b border-white/70 mb-2">
            <img
              src="/user.jpg"
              alt="Usuario"
              className="w-12 h-12 rounded-full border-1 border-white shadow"
            />
            <div>
              <div><span className="text-white font-semibold text-sm">Hicham Nouri Chahid</span></div>
              <div><span className="text-white text-sm">Programador de Software</span></div>
            </div>
          </div>
          {menuIcons.map((icon, idx) => (
            <React.Fragment key={icon?.id}>
              <button
                className="flex items-center w-full gap-3 px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] text-left"
                onClick={() => handleIconDoubleClick(icon!.id)}
              >
                <span className="w-7 h-7 flex items-center justify-center">
                  {/* Clona el icono con color blanco */}
                  {/* @ts-ignore */}
                  {React.cloneElement(icon.icon, { color: "#fff" })}
                </span>
                <span className="text-sm font-medium text-white">
                  {icon?.label}
                </span>
              </button>
              {/* Línea blanca entre Configuración y Ayuda */}
              {icon?.id === "Gallery" && (
                <div className="border-t border-white/70" />
              )}
              {/* Línea blanca entre Ayuda y Logout */}
              {icon?.id === "Help" && (
                <div className="border-t border-white/70" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      {/* Ventanas */}
      {openWindows.map((id) => (
        <Window
          key={id}
          title={desktopIcons.find((i) => i.id === id)?.label || ""}
          onClose={() => handleCloseWindow(id)}
          minimized={minimized[id]}
          onMinimize={() => handleMinimizeWindow(id)}
          onRestore={() => handleRestoreWindow(id)}
          isActive={!minimized[id]}
        >
          <div className="p-4 text-gray-800">
            {id === "MyPC" && (
              <div>
                <h2 className="font-bold mb-2">Información del sistema</h2>
                <ul className="text-sm">
                  <li>
                    <b>Plataforma:</b> {pcInfo.plataforma}
                  </li>
                  <li>
                    <b>User Agent:</b> {pcInfo.userAgent}
                  </li>
                  <li>
                    <b>Idioma:</b> {pcInfo.idioma}
                  </li>
                  <li>
                    <b>Memoria:</b> {pcInfo.memoria} GB
                  </li>
                  <li>
                    <b>CPU:</b> {pcInfo.cpu} núcleos
                  </li>
                  <li>
                    <b>Resolución:</b> {pcInfo.resolucion}
                  </li>
                  <li>
                    <b>Conexión:</b> {pcInfo.conexion}
                  </li>
                </ul>
              </div>
            )}
            {id === "About" && (
              <div>¡Hola! Soy tu nombre. Agrega tu info aquí</div>
            )}
            {id === "Projects" && <div>Aquí van tus proyectos.</div>}
            {id === "Skills" && <div>Aquí van tus habilidades.</div>}
            {id === "Contact" && <div>Formulario o info de contacto.</div>}
            {id === "Gallery" && <div>Aquí va tu galería.</div>}
            {id === "Settings" && <div>Aquí va la configuración.</div>}
            {id === "Help" && <div>Aquí va la ayuda.</div>}
          </div>
        </Window>
      ))}
      {/* Barra de tareas */}
      <Taskbar
        openWindows={openWindows}
        minimized={minimized}
        onRestore={handleRestoreWindow}
        onMenuClick={() => setShowMenu((v) => !v)}
        menuOpen={showMenu}
      />
    </div>
  );
}
