import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CadastroPage from './pages/CadastroPage';
// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Temporariamente redirecionando para /cadastro até LandingPage estar pronta */}
        <Route path="/" element={<Navigate to="/cadastro" replace />} />
        <Route path="*" element={<Navigate to="/cadastro" replace />} />
      </Routes>
    </Router>
  );
}

// Renderizar o App
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);