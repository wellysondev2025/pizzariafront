import React from "react";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-slate-700 mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-slate-500 text-sm font-semibold mb-2">
              Total de Pedidos
            </h3>
            <p className="text-2xl font-bold text-blue-600">124</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-slate-500 text-sm font-semibold mb-2">
              Total de Produtos
            </h3>
            <p className="text-2xl font-bold text-blue-600">36</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-slate-500 text-sm font-semibold mb-2">
              Receita Total
            </h3>
            <p className="text-2xl font-bold text-blue-600">R$ 4.320,00</p>
          </div>
        </div>

        {/* Seção futura — gráficos, métricas, etc */}
        <div className="mt-10 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">
            Estatísticas Recentes
          </h3>
          <p className="text-slate-500">
            Aqui você poderá visualizar métricas, gráficos de vendas e
            desempenho da pizzaria.
          </p>
        </div>
      </div>
    </div>
  );
}
