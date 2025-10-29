import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-800 text-slate-200 flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8 text-center text-white">Admin</h1>

      <nav className="flex flex-col gap-3">
        <Link
          to="/admin"
          className="hover:bg-slate-700 px-3 py-2 rounded transition"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/cardapio"
          className="hover:bg-slate-700 px-3 py-2 rounded transition"
        >
          Cardapio
        </Link>
        <Link
          to="/admin/pedidos"
          className="hover:bg-slate-700 px-3 py-2 rounded transition"
        >
          Pedidos
        </Link>
      </nav>
    </div>
  );
}
