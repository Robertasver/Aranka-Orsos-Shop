import React from "react";

export default function Kontakt() {
  return (
    <div className="min-h-screen bg-white bg-opacity-90 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-green-800 mb-4 animate-fade-in">Kontakt oss</h2>
      <p className="text-gray-700 mb-6 animate-fade-in">Har du spørsmål eller spesialbestillinger? Send oss en melding.</p>

      <form className="space-y-4 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Navn"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="E-post"
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Melding"
          className="w-full border p-2 rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
