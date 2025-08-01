import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CadastroPage from './pages/CadastroPage';
import ProfissionalPage from './pages/ProfissionalPage/ProfissionalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ProfissionalPage" element={<ProfissionalPage />} />
        {/* Temporariamente redirecionando para /ProfissionalPage */}
        <Route path="/" element={<Navigate to="/ProfissionalPage" replace />} />
        <Route path="*" element={<Navigate to="/ProfissionalPage" replace />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);