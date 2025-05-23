import React from "react";

interface MyPCWindowProps {
  pcInfo: {
    plataforma: string;
    userAgent: string;
    idioma: string;
    memoria: string;
    cpu: string;
    resolucion: string;
    conexion: string;
  };
}

export default function MyPCWindow({ pcInfo }: MyPCWindowProps) {
  return (
    <div className="p-6">
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
  );
}
