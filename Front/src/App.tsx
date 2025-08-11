import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from "../src/components/layout/MainLayout";
import ProtectedRoute from "../src/components/auth/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import CadastroPage from "./pages/CadastroPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SearchResultsPage from "./pages/PesquisaProfissionalPage/PesquisaProfissionalPage";
import ProfissionalPage from "./pages/ProfissionalPage/ProfissionalPage";
import PesquisaDeProfissional from "./pages/PesquisaProfissionalPage/PesquisaDeProfissional";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profissionais" element={<SearchResultsPage />} />
              <Route path="/ProfissionalPage" element={<ProfissionalPage />} />
              <Route path="/profissional/:id" element={<ProfissionalPage />} />
              <Route path="/pesquisa" element={<PesquisaDeProfissional />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
}

export default App;