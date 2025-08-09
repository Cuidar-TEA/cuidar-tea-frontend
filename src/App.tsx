import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts e Componentes de Rota
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Nossas Páginas
import LandingPage from "./pages/LandingPage";
import CadastroPage from "./pages/CadastroPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SearchResultsPage from "./pages/PesquisaProfissionalPage/PesquisaProfissionalPage";
import ProfissionalPage from "./pages/ProfissionalPage/ProfissionalPage";
import ConsultasPage from "./pages/ConsultasPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          {/* Estas rotas não exigem login e não têm a Navbar principal */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* --- ROTAS PRIVADAS E COM LAYOUT --- */}
          {/* Todas as rotas aqui dentro usarão o MainLayout (que tem a Navbar) */}
          {/* E também exigirão que o usuário esteja logado (ProtectedRoute) */}
          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profissionais" element={<SearchResultsPage />} />
              <Route path="/profissional/:id" element={<ProfissionalPage />} />
              <Route path="/consultas" element={<ConsultasPage />} />
              {/* Adicione aqui futuras páginas privadas, como /perfil, /minhas-consultas, etc. */}
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
}

export default App;