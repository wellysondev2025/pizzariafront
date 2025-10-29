import React, { useState, useEffect } from "react";

export default function ProdutoForm({ API_URL, categorias, initialData = null, onClose, onSaved }) {
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    descricao: "",
    categoria: "",
    imagem: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || "",
        preco: initialData.preco || "",
        descricao: initialData.descricao || "",
        categoria: initialData.categoria || "", // aqui pegamos o ID direto
        imagem: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFile = (e) => {
    setForm((s) => ({ ...s, imagem: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validação básica
    if (!form.nome || !form.preco || !form.categoria) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("nome", form.nome);
      fd.append("preco", form.preco);
      fd.append("descricao", form.descricao);
      fd.append("categoria", Number(form.categoria));
      if (form.imagem) fd.append("imagem", form.imagem);

      let url = `${API_URL}/produtos/`;
      let method = "POST";
      if (initialData) {
        url += `${initialData.id}/`;
        method = "PATCH";
      }

      const res = await fetch(url, {
        method,
        body: fd,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        console.error("Resposta da API:", errJson);
        throw new Error(errJson ? JSON.stringify(errJson) : "Erro desconhecido");
      }

      onSaved && onSaved();
      onClose && onClose();
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      alert("Erro ao salvar produto. Veja console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow">
      <h4 className="text-lg font-semibold text-slate-700 mb-3">
        {initialData ? "Editar Produto" : "Novo Produto"}
      </h4>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-slate-600 mb-1">Nome</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-slate-600 mb-1">Preço</label>
          <input
            name="preco"
            type="number"
            step="0.01"
            value={form.preco}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-slate-600 mb-1">Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded"
          />
        </div>

        <div>
          <label className="block text-slate-600 mb-1">Categoria</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded"
            required
          >
            <option value="">-- selecione --</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-600 mb-1">Imagem</label>
          <input type="file" onChange={handleFile} className="w-full" />
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
