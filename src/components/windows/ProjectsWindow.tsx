import { ArrowUpRight, Link2 } from "lucide-react";
import React from "react";

interface ProjectsWindowProps {
  onOpenUrl?: (url: string) => void;
}

export default function ProjectsWindow({ onOpenUrl }: ProjectsWindowProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mis Proyectos</h2>
      <div className="grid gap-4">
        <div className="border p-3 rounded bg-[var(--bg-window)] dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-bold"><a href="https://github.com/nouriHicham174/proyectoTetris" target="_blank" rel="noreferrer" className="flex items-center hover:underline">Tetris <ArrowUpRight size={15} className="ml-1 text-blue-700 dark:text-blue-300" /></a></h3>
            <button
              className="flex items-center hover:underline text-sm font-normal cursor-alias"
              onClick={() => onOpenUrl && onOpenUrl("https://proyecto-tetris-blond.vercel.app/")}
            >
              Previsualizar <Link2 size={15} className="ml-1 text-blue-700 dark:text-blue-300" />
            </button>
          </div>
          <p className="text-sm">Recreacion del juego Tetris</p>
          <p className="text-xs text-[var(--text-link)] mt-2">React, Bootstrap, SCSS</p>
        </div>
        <div className="border p-3 rounded bg-[var(--bg-window)] dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-bold"><a href="https://github.com/nouriHicham174/proyectoUno/tree/importaci%C3%B3n" target="_blank" rel="noreferrer" className="flex items-center hover:underline">Uno <ArrowUpRight size={15} className="ml-1 text-blue-700 dark:text-blue-300" /></a></h3>
            <button
              className="flex items-center hover:underline text-sm font-normal cursor-alias"
              onClick={() => onOpenUrl && onOpenUrl("https://hichamnourichahid.alwaysdata.net/projecte2")}
            >
              Previsualizar <Link2 size={15} className="ml-1 text-blue-700 dark:text-blue-300" />
            </button>
          </div>
          <p className="text-sm">Pequeño proyecto de prueba recreando el juego UNO</p>
          <p className="text-xs text-[var(--text-link)] mt-2">PHP, HTML, JSX, Bootstrap, CSS</p>
        </div>
        <div className="border p-3 rounded bg-[var(--bg-window)] dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-bold"><a href="https://github.com/NouriHicham/proyectoPadel" target="_blank" rel="noreferrer" className="flex items-center hover:underline">Proyecto Padel <ArrowUpRight size={15} className="ml-1 text-blue-700 dark:text-blue-300" /></a></h3>
            <button
              className="flex items-center hover:underline text-sm font-normal cursor-alias"
              onClick={() => onOpenUrl && onOpenUrl("https://proyecto-padel.vercel.app/")}
            >
              Previsualizar <Link2 size={15} className="ml-1 text-blue-700 dark:text-blue-300" />
            </button>
          </div>
          <p className="text-sm">Aplicación web destinada a facilitar la organización de partidos entre jugadores de pádel</p>
          <p className="text-xs text-[var(--text-link)] mt-2">React, Supabase, Tailwind CSS, ShadCN</p>
        </div>
      </div>
    </div>
  );
}