import { useState, useEffect } from 'react';

interface UserInfo {
  token: string | null;
  userType: string | null;
  isAuthenticated: boolean;
  isCliente: boolean;
  isProfissional: boolean;
  refreshAuth?: () => void;
}

export const useAuth = (): UserInfo => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    token: null,
    userType: null,
    isAuthenticated: false,
    isCliente: false,
    isProfissional: false,
  });

  const updateUserInfo = () => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    const isAuthenticated = !!token;
    const isCliente = userType === 'cliente' || userType === 'familia' || userType === 'paciente';
    const isProfissional = userType === 'profissional';
    
    setUserInfo({
      token,
      userType,
      isAuthenticated,
      isCliente,
      isProfissional,
    });
  };

  useEffect(() => {
    // Atualiza na inicialização
    updateUserInfo();
    
    // Escuta mudanças no localStorage (funciona apenas entre abas diferentes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' || e.key === 'userType') {
        updateUserInfo();
      }
    };
    
    // Escuta eventos customizados para mudanças na mesma aba
    const handleAuthChange = () => {
      updateUserInfo();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChanged', handleAuthChange);
    
    // Verifica periodicamente para garantir sincronização
    const interval = setInterval(updateUserInfo, 1000);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChanged', handleAuthChange);
      clearInterval(interval);
    };
  }, []);

  return {
    ...userInfo,
    refreshAuth: updateUserInfo
  };
};

export default useAuth;
