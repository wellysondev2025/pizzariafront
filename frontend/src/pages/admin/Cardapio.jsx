import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProdutoForm from "../../components/ProdutoForm";

export default function Cardapio() {
  const API_URL = "http://127.0.0.1:8000/api";

  // Estados
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [allProdutos, setAllProdutos] = useState([]); // array mestre
  const [loading, setLoading] = useState(true);

  const [showProdutoForm, setShowProdutoForm] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);

  // Buscar produtos
  const fetchProdutos = async () => {
    try {
      const res = await fetch(`${API_URL}/produtos/`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProdutos(data);
        setAllProdutos(data);
      } else {
        setProdutos([]);
        setAllProdutos([]);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setProdutos([]);
      setAllProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  // Buscar categorias
  const fetchCategorias = async () => {
    try {
      const res = await fetch(`${API_URL}/categorias/`);
      const data = await res.json();
      if (Array.isArray(data)) setCategorias(data);
      else setCategorias([]);
    } catch {
      console.warn("Categorias não disponíveis — continuando sem elas.");
      setCategorias([]);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchProdutos();
  }, []);

  // Deletar produto
  const handleDeleteProduto = async (id) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    try {
      await fetch(`${API_URL}/produtos/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProdutos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-slate-700 mb-6">Cardápio</h2>

        {/* Header com filtragem */}
        <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg border border-slate-200 shadow">
          <div className="flex gap-2 items-center">
            <select
              onChange={(e) => {
                const catId = e.target.value;
                if (!catId) {
                  setProdutos(allProdutos);
                  return;
                }
                const filtered = allProdutos.filter(
                  (p) => String(p.categoria?.id || p.categoria) === catId
                );
                setProdutos(filtered);
              }}
              className="border border-slate-300 px-2 py-1 rounded"
            >
              <option value="">Todas categorias</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => {
              setProdutoEdit(null);
              setShowProdutoForm(true);
            }}
          >
            + Produto
          </button>
        </div>

        {/* Formulário de produto */}
        {showProdutoForm && (
          <div className="mb-4">
            <ProdutoForm
              API_URL={API_URL}
              categorias={categorias}
              initialData={produtoEdit}
              onClose={() => {
                setShowProdutoForm(false);
                setProdutoEdit(null);
                fetchProdutos();
              }}
              onSaved={() => fetchProdutos()}
            />
          </div>
        )}

        {/* Tabela de produtos */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow overflow-x-auto">
          {loading ? (
            <p className="text-slate-500">Carregando produtos...</p>
          ) : produtos.length === 0 ? (
            <p className="text-slate-500">Nenhum produto encontrado.</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-700 text-white">
                <tr>
                  <th className="p-2">Imagem</th>
                  <th className="p-2">Nome</th>
                  <th className="p-2">Preço</th>
                  <th className="p-2">Categoria</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => (
                  <tr key={p.id} className="border-b border-slate-200">
                    <td className="p-2">
                      {p.imagem ? (
                        <img
                          src={p.imagem}
                          alt={p.nome}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="p-2">{p.nome}</td>
                    <td className="p-2">R$ {p.preco}</td>
                    <td className="p-2">{p.categoria_nome || "—"}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        className="px-2 py-1 bg-yellow-400 hover:bg-yellow-300 rounded text-slate-800"
                        onClick={() => {
                          setProdutoEdit(p);
                          setShowProdutoForm(true);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-white"
                        onClick={() => handleDeleteProduto(p.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
