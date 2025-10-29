import React from 'react';

export default function NavbarAdmin() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold text-xl">Painel Admin</h1>
      <div>
        <button
          className="bg-red-500 px-3 py-1 rounded"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
