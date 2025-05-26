import React from "react";
export default function ContactWindow() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Contacto</h2>
      <form className="">
      <label>Nombre</label>
      <input type="text" name="user_name" required className="border p-2 w-full mb-3" />

      <label>Email</label>
      <input type="email" name="user_email" required className="border p-2 w-full mb-3" />

      <label>Mensaje</label>
      <textarea name="message" required className="border p-2 w-full mb-3 resize-none"/>

      <button type="submit" className="bg-gradient-to-bl from-blue-500 to-blue-700 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </form>
      <div className="border-t border-gray-300 mt-5 pt-4"></div>
      <h3 className="font-bold mb-2">Información de contacto</h3>
      <ul className="pl-1 mb-4 list-none">
          <li>📧 hichak55@gmail.com</li>
          <li>📞 +34 634 723 067</li>
          <li>🔗 linkedin.com/in/nourihicham174/</li>
          <li>🐱 github.com/NouriHicham174</li>
          <li>📍 Barcelona, España</li>
      </ul>
    </div>
  )
  ;
}