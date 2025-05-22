import React from "react";
export default function SkillsWindow() {
  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-4">Habilidades</h2>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Frontend</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">HTML</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">CSS</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">JavaScript</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">TypeScript</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">React</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Next.js</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Tailwind CSS</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Bootstrap</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Backend</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Php</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Symfony</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Laravel</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Node.js</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">SQL</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Supabase</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Firebase</span>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-2">Herramientas</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Git</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">GitHub</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">VS Code</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">ChatGPT</span>
          <span className="px-2 py-1 bg-[var(--skill-bg)] rounded text-sm">Copilot</span>
        </div>
      </div>
    </div>);
}