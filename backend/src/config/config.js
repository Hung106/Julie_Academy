require('dotenv').config();

const config = {
  port: process.env.PORT,
  keycloak: {
    url: process.env.KC_URL,
    realm: process.env.KC_REALM,
    backend_client_id: process.env.KC_BACKEND_CLIENT_ID,
    backend_client_secret: process.env.KC_BACKEND_CLIENT_SECRET,
    frontend_client_id: process.env.KC_FRONTEND_CLIENT_ID,
  },
};

module.exports = config;