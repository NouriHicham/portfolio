import React, { useEffect, useState } from "react";

    const options = [
    { id: 0, label: "Muy pequeña" },
    { id: 1, label: "Pequeña" },
    { id: 2, label: "Grande" },
    { id: 3, label: "Muy grande" },
  ]
export default function SettingsWindow() {
  const [selected, setSelected] = useState(0);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark", "dark");
    if (theme === "dark") {
      document.body.classList.add("theme-dark", "dark");
    } else {
      document.body.classList.add("theme-light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Tamaño de fuente global
  useEffect(() => {
    const fontSizes = ["14px", "16px", "18px", "22px"];
    const size = fontSizes[selected] || "16px";
    document.body.style.setProperty("--font-size-root", size);
    localStorage.setItem("fontSize", String(selected));
  }, [selected]);

  useEffect(() => {
    // Al cargar, lee el tamaño guardado
    const saved = localStorage.getItem("fontSize");
    if (saved) setSelected(Number(saved));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Configuración</h2>
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Tema:</label>
        <button
          className={`w-11 h-5.5 flex items-center rounded-full px-0.5 transition-colors duration-300 focus:outline-none cursor-pointer ${theme === "dark" ? "bg-blue-500" : "bg-gray-300"}`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Cambiar tema"
        >
          <span
            className={`w-4.5 h-4.5 bg-white rounded-full shadow transform transition-transform duration-300 ${theme === "dark" ? "translate-x-5.5" : "translate-x-0"}`}
          />
          
        </button>
        <span className="ml-2 text-xs font-semibold select-none">
            {theme === "dark" ? "Oscuro" : "Claro"}
          </span>
      </div>
      <p className="text-sm text-gray-600">Elige entre tema claro u oscuro para la interfaz.</p>
      <div className="mt-4 items-center gap-3">
        <label className="font-medium">Tamaño de texto:</label>
      </div>
        <div className="w-full max-w-[300px] py-4">
        <div className="relative">
          {/* Línea horizontal */}
          <div className="absolute top-3 left-4 w-[90%] h-1 bg-gray-300 rounded-full " />
          {/* Contenedor de pelotas */}
          <div className="relative flex justify-between">
            {options.map((option) => (
              <div key={option.id} className="flex flex-col items-center justify-between">
                <button
                  onClick={() => setSelected(option.id)}
                  className={`w-6 h-6 rounded-full z-10 transition-all duration-300 ease-in-out ${
                    selected === option.id
                      ? "bg-blue-500 scale-110"
                      : "bg-white border-2 border-gray-300 hover:border-gray-400 cursor-pointer"
                  }`}
                  aria-label={option.label}
                />
                <span className="text-sm text-gray-600 font-semibold select-none" style={{ fontSize: option.id === 0 ? "14px" : option.id === 1 ? "18px" : option.id === 2 ? "24px" : "28px" }}>
                  A
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      <p className="text-sm text-gray-600">Elige el tamaño de fuente para la interfaz.</p>
    </div>
  );
}