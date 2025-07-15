// src/components/RoleRedirect.js
import { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

const ROLE_SELECTION_PAGE = '/select-role';

export default function RoleRedirect() {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized) return;
    if (!keycloak?.authenticated) {
      navigate('/', { replace: true });
      return;
    }
    const roles = keycloak.tokenParsed?.realm_access?.roles || [];
    if (roles.includes('tutor')) navigate('/dashboard/tutor', { replace: true });
    else if (roles.includes('student')) navigate('/dashboard/student', { replace: true });
    else if (roles.includes('parent')) navigate('/dashboard/parent', { replace: true });
    else navigate(ROLE_SELECTION_PAGE, { replace: true });
  }, [keycloak, initialized, navigate]);

  return null;
}