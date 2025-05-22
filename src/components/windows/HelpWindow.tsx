import React from "react";

export default function HelpWindow() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ayuda</h2>
      <p className="mb-3">Bienvenido a mi portfolio interactivo, inspirado en un escritorio de ordenador. Aquí tienes algunos consejos para sacarle el máximo partido:</p>
      <ul className="list-disc pl-6 mb-4 text-sm">
        <li>Haz doble clic en los iconos del escritorio para abrir las diferentes ventanas (Sobre mí, Proyectos, Habilidades, etc.).</li>
        <li>Puedes minimizar, restaurar o cerrar cualquier ventana desde su barra superior.</li>
        <li>Usa la barra de tareas inferior para alternar entre ventanas abiertas o restaurar las minimizadas.</li>
        <li>Desde la ventana de Configuración puedes cambiar entre tema claro y oscuro.</li>
        <li>El menú de inicio (botón "Inicio") te permite acceder rápidamente a todas las secciones.</li>
      </ul>
      <p className="mb-2 text-sm">¿Tienes alguna sugerencia, duda o has encontrado un error? No dudes en contactarme desde la ventana de Contacto.</p>
      <p className="text-xs text-gray-500">¡Gracias por visitar mi portfolio!</p>
    </div>
  );
}