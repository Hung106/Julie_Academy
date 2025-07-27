const axios = require("axios");
const config = require("../config/config");

const getAdminToken = async () => {
  const params = new URLSearchParams();
  params.append("client_id", config.keycloak.backend_client_id);
  params.append("client_secret", config.keycloak.backend_client_secret);
  params.append("grant_type", "client_credentials");

  try {
    const response = await axios.post(
      `${config.keycloak.url}/realms/${config.keycloak.realm}/protocol/openid-connect/token`,
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Lỗi khi lấy admin token:", error.response?.data);
    throw new Error("Không thể xác thực với Keycloak Service Account.");
  }
};

const assignRoleToUser = async (userId, roleName) => {
  const adminToken = await getAdminToken();
  const authHeader = { Authorization: `Bearer ${adminToken}` };

  try {
    const roleResponse = await axios.get(
      `${config.keycloak.url}/admin/realms/${config.keycloak.realm}/roles/${roleName}`,
      { headers: authHeader }
    );
    const roleToAssign = roleResponse.data;

    await axios.post(
      `${config.keycloak.url}/admin/realms/${config.keycloak.realm}/users/${userId}/role-mappings/realm`,
      [roleToAssign],
      { headers: authHeader }
    );
    console.log(`Đã gán thành công role '${roleName}' cho user '${userId}'`);
    return true;
  } catch (error) {
    console.error("Lỗi khi gán role cho user:", error.response?.data);
    const errorMessage =
      error.response?.data?.errorMessage || `Không thể gán role '${roleName}'.`;
    throw new Error(errorMessage);
  }
};

const initKeycloakAdminClient = async () => {
  await getAdminToken();
};

module.exports = {
  assignRoleToUser,
  initKeycloakAdminClient,
};
