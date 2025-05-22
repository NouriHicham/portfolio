import { ArrowUpRight } from "lucide-react";
import React from "react";

interface AboutWindowProps {
  onOpenSkills?: () => void;
  onOpenProjects?: () => void;
}

export default function AboutWindow({ onOpenSkills, onOpenProjects }: AboutWindowProps) {
  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-4">Sobre Mí</h2>
      <p className="mb-3">¡Hola! Soy Hicham, desarrollador web con formación en el Grado Superior de Desarrollo de Aplicaciones Web (DAW). Me apasiona construir experiencias digitales funcionales, creativas y bien estructuradas, tanto en frontend como en backend.</p>
      <p className="mb-3">Recientemente he trabajado desarrollando una aplicación para W3Barcelona, donde puse en práctica mis conocimientos en entornos reales, colaborando en equipo y enfrentándome a retos técnicos con soluciones prácticas.</p>
      <ul className="pl-5 mb-4 list-none">
        <li>💻 Experiencia en desarrollo web y backend</li>
        <li>🎨 Diseño y creación de interfaces de usuario</li>
        <li>📚 Aprendizaje continuo y autoaprendizaje</li>
        <li>🚀 En búsqueda de nuevos proyectos y oportunidades para seguir creciendo</li>
      </ul>
      <p>Este portfolio simula un escritorio porque representa cómo trabajo: organizado, técnico, con un toque personal y creativo.</p>
      <div className="flex items-center">
        <span
        className="flex items-center mt-2 px-2 py-1 bg-gray-200 rounded text-sm tracking-widest cursor-pointer hover:bg-gray-300 select-none dark:text-gray-800"
        onClick={onOpenSkills}
        tabIndex={0}
        role="button">
          Skills <ArrowUpRight size={15} color="#000" className="ml-1" />
        </span>
        <span
          className="flex items-center ml-2 mt-2 px-2 py-1 bg-gray-200 rounded text-sm tracking-widest cursor-pointer hover:bg-gray-300 select-none dark:text-gray-800 "
          onClick={onOpenProjects}
          tabIndex={0}
          role="button">
            Projects <ArrowUpRight size={15} color="#000" className="ml-1" />
        </span>
      </div>

    </div>
  );
}