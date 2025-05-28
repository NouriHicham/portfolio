import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";

const MESSAGE_LIMIT = 3;

export default function ContactWindow() {
  const form = useRef<HTMLFormElement>(null);
  const [modal, setModal] = useState<{ type: "success" | "error"; message: string } | null>(null);

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
      setModal({ type: "error", message: `Has alcanzado el límite de ${MESSAGE_LIMIT} mensajes por día.` });
      setTimeout(() => setModal(null), 3500);
      return;
    }

    emailjs.sendForm(
      'service_oa7dned',
      'template_8oo0wzo',
      form.current as HTMLFormElement,
      {
        publicKey: 'sMl4ez9Qo77U_88mb',
      })
      .then(
        (result) => {
          incrementMessageCount();
          setModal({ type: "success", message: "Mensaje enviado con éxito" });
          setTimeout(() => setModal(null), 3500);
        },
        (error) => {
          setModal({ type: "error", message: "Ocurrió un error al enviar el mensaje" });
          setTimeout(() => setModal(null), 3500);
        }
      );
  };

  return (
    <div className="p-6 relative">
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
      {modal && (
        <div className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded shadow-lg text-white text-center ${modal.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {modal.message}
        </div>
      )}
    </div>
  );
}
