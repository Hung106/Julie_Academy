// backend/src/services/keycloakAdmin.js
const KeycloakAdminClient = require('@keycloak/keycloak-admin-client').default;

let kcAdminClientInstance = null;
let tokenExpirationTime = 0; // Thời điểm token hiện tại sẽ hết hạn (Unix timestamp)

const initKeycloakAdminClient = async () => {
  // Kiểm tra nếu instance đã tồn tại và token còn hợp lệ (chưa hết hạn)
  // Trừ đi một khoảng thời gian nhỏ (ví dụ 60 giây) để làm mới sớm hơn
  if (kcAdminClientInstance && (Date.now() / 1000) < (tokenExpirationTime - 60)) {
    console.log('[KeycloakAdmin] Keycloak Admin Client token is still valid. Reusing instance.');
    return kcAdminClientInstance;
  }

  // Nếu instance chưa tồn tại hoặc token sắp/đã hết hạn, khởi tạo/xác thực lại
  console.log('[KeycloakAdmin] Initializing or re-authenticating Keycloak Admin Client instance...');
  console.log(`[KeycloakAdmin] Base URL: ${process.env.KEYCLOAK_BASE_URL}`);
  console.log(`[KeycloakAdmin] Realm Name: ${process.env.KEYCLOAK_REALM_NAME}`);
  console.log(`[KeycloakAdmin] Client ID: ${process.env.KEYCLOAK_BACKEND_CLIENT_ID}`);

  if (!kcAdminClientInstance) {
    kcAdminClientInstance = new KeycloakAdminClient({
      baseUrl: process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080',
      realmName: process.env.KEYCLOAK_REALM_NAME || 'Julie_Academy',
    });
  }

  try {
    await kcAdminClientInstance.auth({
      grantType: 'client_credentials',
      clientId: process.env.KEYCLOAK_BACKEND_CLIENT_ID || 'my-backend-service',
      clientSecret: process.env.KEYCLOAK_BACKEND_CLIENT_SECRET,
    });
    
    // Lưu thời điểm hết hạn của token mới
    tokenExpirationTime = kcAdminClientInstance.accessTokenParsed.exp;
    console.log('[KeycloakAdmin] Keycloak Admin Client authenticated/re-authenticated successfully.');
    console.log(`[KeycloakAdmin] New token expires at: ${new Date(tokenExpirationTime * 1000).toLocaleString()}`);
    
    return kcAdminClientInstance;
  } catch (error) {
    console.error('[KeycloakAdmin] FAILED to authenticate Keycloak Admin Client!');
    console.error('[KeycloakAdmin] Error details:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    throw new Error('Failed to initialize Keycloak Admin Client.');
  }
};

module.exports = { initKeycloakAdminClient };