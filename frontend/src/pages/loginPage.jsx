
import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login({ redirectUri: window.location.origin + '/redirect' });
    }
  }, [keycloak, initialized]);

  if (!initialized) return null;
  if (keycloak.authenticated) return <Navigate to="/redirect" replace />;
  return null;
};

export default LoginPage;
