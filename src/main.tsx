import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CadastroPage from './pages/CadastroPage';
import ProfissionalPage from './pages/ProfissionalPage/ProfissionalPage';
import PesquisaProfissionalPage from './pages/PesquisaProfissionalPage/PesquisaProfissionalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ProfissionalPage" element={<ProfissionalPage />} />
        {/* Temporariamente redirecionando para /PesquisaProfissionalPage */}
        <Route path="/" element={<PesquisaProfissionalPage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);