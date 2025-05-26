import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";

const MESSAGE_LIMIT = 3;

export default function ContactWindow() {
  const form = useRef<HTMLFormElement>(null);

  const canSendMessage = () => {
    const today = new Date().toISOString().slice(0, 10);
    const data = JSON.parse(localStorage.getItem("contact_messages") || "{}");
    if (data.date !== today) {
      // Reset count for new day
      localStorage.setItem(
        "contact_messages",
        JSON.stringify({ date: today, count: 0 })
      );
      return true;
    }
    return data.count < MESSAGE_LIMIT;
  };

  const incrementMessageCount = () => {
    const today = new Date().toISOString().slice(0, 10);
    const data = JSON.parse(localStorage.getItem("contact_messages") || "{}");
    const count = data.date === today ? (data.count || 0) + 1 : 1;
    localStorage.setItem(
      "contact_messages",
      JSON.stringify({ date: today, count })
    );
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!canSendMessage()) {
      alert(`Has alcanzado el límite de ${MESSAGE_LIMIT} mensajes por día.`);
      return;
    }

    emailjs
      .sendForm(
        "service_oa7dned", // ID de tu servicio
        "template_8oo0wzo", // ID de tu plantilla (ajusta esto al correcto)
        form.current?.current, // Referencia al formulario
        "sMl4ez9Qo77U_88mb" // Tu clave pública de EmailJS
      )
      .then(
        (result) => {
          incrementMessageCount();
          console.log("Mensaje enviado", result.text);
          alert("Mensaje enviado con éxito");
        },
        (error) => {
          console.error("Error", error.text);
          alert("Ocurrió un error al enviar el mensaje");
        }
      );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Contacto</h2>
      <form ref={form} className="" id="my-form" onSubmit={sendEmail}>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          required
          className="border p-2 w-full mb-3"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          className="border p-2 w-full mb-3"
        />

        <label>Mensaje</label>
        <textarea
          name="message"
          required
          className="border p-2 w-full mb-3 resize-none"
        />

        <button
          type="submit"
          className="bg-gradient-to-bl from-blue-500 to-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Enviar
        </button>
      </form>
      <div className="border-t border-gray-300 mt-5 pt-4"></div>
      <h3 className="font-bold mb-2">Información de contacto</h3>
      <ul className="pl-1 mb-4 list-none">
        <li className="flex items-center">📧 <a href="mailto:hichak55@gmail.com" className="flex items-center hover:underline ml-1">hichak55@gmail.com <ArrowUpRight size={15} className="ml-0.5"></ArrowUpRight> </a></li>
        <li>📞 +34 634 723 067</li>
        <li className="flex items-center">🌐 <a href="linkedin.com/in/nourihicham174/" className="flex items-center hover:underline ml-1">linkedin.com/in/nourihicham174/ <ArrowUpRight size={15} className="ml-0.5"></ArrowUpRight></a></li>
        <li className="flex items-center">🐱 <a href="github.com/NouriHicham174" className="flex items-center hover:underline ml-1"> github.com/NouriHicham174 <ArrowUpRight size={15} className="ml-0.5"></ArrowUpRight></a></li>
        <li>📍 <span className="ml-1">Barcelona, España</span></li>
      </ul>
    </div>
  );
}
