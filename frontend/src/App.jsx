import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Cardapio from "./pages/admin/Cardapio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/cardapio" element={<Cardapio />} />
      </Routes>
    </Router>
  );
}

export default App;
