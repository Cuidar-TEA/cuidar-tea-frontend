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
        {//<Route path="/" element={<LandingPage />} />
        // <Route path="/login" element={<LoginPage />} />
        }        
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;