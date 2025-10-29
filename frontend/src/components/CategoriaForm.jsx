import React, { useState, useEffect } from "react";

export default function CategoriaForm({ onClose, onSaved, initialData = null, API_URL }) {
  const [nome, setNome] = useState(initialData ? initialData.nome : "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setNome(initialData.nome);
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = initialData ? `${API_URL}/categorias/${initialData.id}/` : `${API_URL}/categorias/`;
      const method = initialData ? "PATCH" : "POST";

      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: (() => {
          // API espera JSON simples para categoria (ajuste se sua API usa outro formato)
          const body = JSON.stringify({ nome });
          return body;
        })(),
      });

      onSaved && onSaved();
      onClose && onClose();
    } catch (err) {
      console.error("Erro ao salvar categoria:", err);
      alert("Erro ao salvar categoria. Veja console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow">
      <h4 className="text-lg font-semibold text-slate-700 mb-3">
        {initialData ? "Editar Categoria" : "Nova Categoria"}
      </h4>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-slate-600 mb-1">Nome</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded"
            required
            placeholder="Ex: Pizzas, Bebidas"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Salvando..." : initialData ? "Salvar" : "Criar"}
          </button>
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="bg-slate-400 hover:bg-slate-300 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
