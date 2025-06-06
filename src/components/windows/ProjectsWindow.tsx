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
            <h3 className="font-bold"><a href="https://github.com/nouriHicham174/proyectoTetris" target="_blank" rel="noreferrer" className="flex items-center hover:underline whitespace-nowrap">Tetris <ArrowUpRight size={15} className="ml-1 text-blue-700 dark:text-blue-300" /></a></h3>
            <button
              className="flex items-center hover:underline text-sm font-normal cursor-alias whitespace-nowrap"
              onClick={() => onOpenUrl && onOpenUrl("https://proyecto-tetris-blond.vercel.app/")}
            >
              Previsualizar <Link2 size={15} className="ml-1 text-blue-700 dark:text-blue-300" />
            </button>
          </div>
          <p className="text-sm">Recreación del juego Tetris</p>
          <p className="text-xs text-[var(--text-link)] mt-2">React, Bootstrap, SCSS</p>
        </div>
        <div className="border p-3 rounded bg-[var(--bg-window)] dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-bold"><a href="https://github.com/nouriHicham174/proyectoUno/tree/importaci%C3%B3n" target="_blank" rel="noreferrer" className="flex items-center hover:underline whitespace-nowrap">Uno <ArrowUpRight size={15} className="ml-1 text-blue-700 dark:text-blue-300" /></a></h3>
            <button
              className="flex items-center hover:underline text-sm font-normal cursor-alias whitespace-nowrap"
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
            <h3 className="font-bold"><a href="https://github.com/NouriHicham/proyectoPadel" target="_blank" rel="noreferrer" className="flex items-center hover:underline whitespace-nowrap">Proyecto Padel <ArrowUpRight size={15} className="ml-1 text-blue-700 dark:text-blue-300" /></a></h3>
            <div className="flex gap-2 whitespace-nowrap ml-2">
              <a
                href="https://gabrielbascope.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline text-sm font-normal text-blue-700 dark:text-blue-300 whitespace-nowrap"
                title="Ver currículum de compañero"
              >
                CV compañero <ArrowUpRight size={14} className="ml-1" />
              </a>
              <button
                className="flex items-center hover:underline text-sm font-normal cursor-alias whitespace-nowrap"
                onClick={() => onOpenUrl && onOpenUrl("https://proyecto-padel.vercel.app/")}
              >
                Previsualizar <Link2 size={15} className="ml-1 text-blue-800 dark:text-blue-300" />
              </button>
            </div>
          </div>
          <p className="text-sm">Aplicación web destinada a facilitar la organización de partidos entre jugadores de pádel, que hice con mi compañero Gabriel Bascope</p>
          <p className="text-xs text-[var(--text-link)] mt-2">React, Supabase, Tailwind CSS, ShadCN</p>
        </div>
        <div className="border p-3 rounded bg-[var(--bg-window)] dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-bold"><a href="https://github.com/NouriHicham/proyecto-memory" target="_blank" rel="noreferrer" className="flex items-center hover:underline whitespace-nowrap">Juego de memoria <ArrowUpRight size={15} className="ml-1 text-blue-700 dark:text-blue-300" /></a></h3>
            <div className="flex gap-2 whitespace-nowrap ml-2">
              <a
                href="https://github.com/NouriHicham/M7-NouriHicham/tree/proyecto-memory"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline text-sm font-normal text-blue-700 dark:text-blue-300 whitespace-nowrap"
                title="Ver API"
              >
                Ver API <ArrowUpRight size={14} className="ml-1" />
              </a>
              <button
                className="flex items-center hover:underline text-sm font-normal cursor-alias whitespace-nowrap"
                onClick={() => onOpenUrl && onOpenUrl("https://proyecto-memory-bice.vercel.app/")}
              >
                Previsualizar <Link2 size={15} className="ml-1 text-blue-700 dark:text-blue-300" />
              </button>
            </div>
          </div>
          <p className="text-sm">Proyecto donde recreo el juego de la memoria y uso mi propia API hecha en Laravel</p>
          <p className="text-xs text-[var(--text-link)] mt-2">NextJS, TSX, Tailwind, ShadCN, Laravel</p>
        </div>
      </div>
    </div>
  );
}