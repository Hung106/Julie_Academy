import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'Julie_Academy',
  clientId: 'Julie_Academy',
});

export default keycloak;