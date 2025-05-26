import React from "react";

interface BrowserWindowProps {
  url: string;
  onClose: () => void;
}

export default function BrowserWindow({ url }: BrowserWindowProps) {
    if (!url) return null;

    return (
        <iframe src={url} className="flex-1 w-full h-full min-h-[300px] bg-white" title="Browser Window {$url}" />
    );
}
