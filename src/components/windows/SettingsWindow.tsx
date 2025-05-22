import React, { useEffect, useState } from "react";

export default function SettingsWindow() {
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Configuración</h2>
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Tema:</label>
        <button
          className={`w-11 h-5.5 flex items-center rounded-full px-0.5 transition-colors duration-300 focus:outline-none ${theme === "dark" ? "bg-blue-500" : "bg-gray-300"}`}
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
    </div>
  );
}