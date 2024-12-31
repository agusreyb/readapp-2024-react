import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sessionStorageService } from '../../services/sessionStorage/sessionStorageService';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorageService.removeItem('userId');
    navigate('/login');
  }, [navigate]);

  return null; 
};

export default Logout;
