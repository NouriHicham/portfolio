import React, { useState } from "react";
import Taskbar from "./components/Taskbar";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import AboutWindow from "./components/windows/AboutWindow";
import ProjectsWindow from "./components/windows/ProjectsWindow";
import SkillsWindow from "./components/windows/SkillsWindow";
import ContactWindow from "./components/windows/ContactWindow";
import GalleryWindow from "./components/windows/GalleryWindow";
import SettingsWindow from "./components/windows/SettingsWindow";
import HelpWindow from "./components/windows/HelpWindow";
import MyPCWindow from "./components/windows/MyPCWindow";
import BrowserWindow from "./components/windows/BrowserWindow";
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
  Globe,
} from "lucide-react";

// Asegura tema por defecto al cargar la app
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme");
  if (!savedTheme || savedTheme === "light") {
    localStorage.setItem("theme", "light");
    document.body.classList.remove("theme-dark", "dark");
    document.body.classList.add("theme-light");
  } else if (savedTheme === "dark") {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark", "dark");
  }
}

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
  {
    id: "Browser",
    label: "Navegador",
    icon: <Globe size={48} color="#2563eb" strokeWidth={1.5} />,
  }
];

const pcInfo = {
  plataforma: navigator.platform,
  userAgent: navigator.userAgent,
  idioma: navigator.language,
  // @ts-ignore
  memoria: String(navigator.deviceMemory || "No disponible"),
  cpu: String(navigator.hardwareConcurrency || "No disponible"),
  resolucion: `${screen.width}x${screen.height}`,
  conexion: navigator.onLine ? "Online" : "Offline",
};

export default function App() {
  const [openWindows, setOpenWindows] = useState<string[]>(["About"]);
  const [minimized, setMinimized] = useState<Record<string, boolean>>({});
  const [showMenu, setShowMenu] = useState(false);
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);

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
        <div className="fixed left-0 bottom-[44px] z-50 bg-blue-800 border-blue-700 shadow-lg min-w-[280px] py-2">
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
                className="flex items-center w-full gap-3 px-3 py-2 hover:bg-[rgba(255,255,255,0.1)] text-left cursor-pointer"
                onClick={() => handleIconDoubleClick(icon!.id)}
              >
                <span className="w-7 h-7 flex items-center justify-center">
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
          title={desktopIcons.find((i) => i.id === id)?.label + (id == "Browser" ? " - " + browserUrl?.replace("https://", "") : "")}
          onClose={() => {
            if (id === "Browser") setBrowserUrl(null);
            handleCloseWindow(id);
          }}
          minimized={minimized[id]}
          onMinimize={() => handleMinimizeWindow(id)}
          onRestore={() => handleRestoreWindow(id)}
          isActive={!minimized[id]}
        >
          <div className="text-gray-800 h-full">
            {id === "MyPC" && <MyPCWindow pcInfo={pcInfo} />}
            {id === "About" && <AboutWindow 
              onOpenSkills={() => {
                if (!openWindows.includes("Skills")) {
                  setOpenWindows([...openWindows, "Skills"]);
                }
                setMinimized((prev) => ({ ...prev, ["Skills"]: false }));
              }}
              onOpenProjects={() => {
                if (!openWindows.includes("Projects")) {
                  setOpenWindows([...openWindows, "Projects"]);
                }
                setMinimized((prev) => ({ ...prev, ["Projects"]: false }));
              }}
            />}
            {id === "Projects" && <ProjectsWindow onOpenUrl={(url) => {
              setBrowserUrl(url);
              if (!openWindows.includes("Browser")) {
                setOpenWindows([...openWindows, "Browser"]);
              }
              setMinimized((prev) => ({ ...prev, ["Browser"]: false }));
            }} />}
            {id === "Skills" && <SkillsWindow />}
            {id === "Contact" && <ContactWindow />}
            {id === "Gallery" && <GalleryWindow />}
            {id === "Settings" && <SettingsWindow />}
            {id === "Help" && <HelpWindow />}
            {id === "Browser" && browserUrl && <BrowserWindow url={browserUrl} onClose={() => {
              setBrowserUrl(null);
              handleCloseWindow("Browser");
            }} />}
          </div>
        </Window>
      ))}
      {/* Barra de tareas */}
      <Taskbar
        openWindows={openWindows}
        minimized={minimized}
        onRestore={handleRestoreWindow}
        onMinimize={handleMinimizeWindow}
        onMenuClick={() => setShowMenu((v) => !v)}
        menuOpen={showMenu}
        desktopIcons={desktopIcons}
      />
    </div>
  );
}
