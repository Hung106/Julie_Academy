const Keycloak = require('keycloak-connect');
const config = require('../config/config');

const keycloakConfig = {
  realm: config.keycloak.realm,
  'auth-server-url': config.keycloak.url,
  'ssl-required': 'external',
  resource: config.keycloak.frontend_client_id,
  'public-client': true,
  'confidential-port': 0,
};

const keycloak = new Keycloak({}, keycloakConfig);

module.exports = keycloak;