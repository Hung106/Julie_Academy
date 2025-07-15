import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles, children }) {
  const { keycloak } = useKeycloak();

  if (!keycloak?.authenticated) {
    return <Navigate to="/login" replace />;
  }

  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const hasRole = allowedRoles.some(role => roles.includes(role));

  if (!hasRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}