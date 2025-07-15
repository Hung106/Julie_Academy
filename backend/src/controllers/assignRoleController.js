// backend/src/controllers/assignRoleController.js
const jwt = require('jsonwebtoken'); // Đảm bảo đã cài `jsonwebtoken`
const { initKeycloakAdminClient } = require('../services/keycloakAdmin');

exports.assignRole = async (req, res) => {
  const { roleName } = req.body;
  const userToken = req.headers.authorization?.split(' ')[1];

  console.log('[AssignRoleController] Received request to assign role.');
  console.log('[AssignRoleController] roleName from body:', roleName);
  console.log('[AssignRoleController] User token received (first 20 chars):', userToken ? userToken.substring(0, 20) + '...' : 'No token');


  if (!roleName || !userToken) {
    console.warn('[AssignRoleController] Bad Request: Missing roleName or userToken.');
    return res.status(400).json({ message: 'Thiếu tên vai trò hoặc token.' });
  }

  try {
    const kcAdminClient = await initKeycloakAdminClient();
    console.log('[AssignRoleController] Keycloak Admin Client is ready.');

    // Giải mã JWT để lấy user ID (sub)
    let decodedToken;
    try {
      decodedToken = jwt.decode(userToken);
      console.log('[AssignRoleController] Decoded user token (sub):', decodedToken?.sub);
    } catch (decodeErr) {
      console.error('[AssignRoleController] Error decoding user token:', decodeErr.message);
      return res.status(401).json({ message: 'Token người dùng không hợp lệ (lỗi giải mã).' });
    }

    if (!decodedToken || !decodedToken.sub) {
      console.warn('[AssignRoleController] Decoded token is missing "sub" (user ID).');
      return res.status(401).json({ message: 'Token người dùng không hợp lệ (thiếu user ID).' });
    }
    const userId = decodedToken.sub;

    // Lấy role từ realm
    console.log(`[AssignRoleController] Looking for role: ${roleName} in realm: ${kcAdminClient.realmName}`);
    const role = await kcAdminClient.roles.findOneByName({
      realm: kcAdminClient.realmName,
      name: roleName,
    });

    if (!role) {
      console.warn(`[AssignRoleController] Role '${roleName}' not found in Keycloak.`);
      return res.status(404).json({ message: `Vai trò '${roleName}' không tìm thấy trong Keycloak.` });
    }
    console.log(`[AssignRoleController] Found role: ${role.name} with ID: ${role.id}`);

    // Gán role cho user
    console.log(`[AssignRoleController] Assigning role '${role.name}' to user ID: ${userId}`);
    await kcAdminClient.users.addRealmRoleMappings({
      id: userId,
      roles: [{ id: role.id, name: role.name }],
    });

    console.log(`[AssignRoleController] Role '${roleName}' assigned to user successfully.`);
    return res.status(200).json({ message: `Vai trò '${roleName}' đã được gán thành công!` });

  } catch (err) {
    // Log toàn bộ đối tượng lỗi để debug sâu hơn
    console.error('--- [AssignRoleController] ERROR assigning role ---');
    console.error('Error object:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    if (err.response) {
      console.error('Keycloak Admin API Response Data (err.response.data):', err.response.data);
      console.error('Keycloak Admin API Response Status (err.response.status):', err.response.status);
    } else {
      console.error('Error message:', err.message);
    }
    console.error('----------------------------------------------------');

    const errorMessage = err.response?.data?.errorMessage || err.message || 'Lỗi không xác định khi gán vai trò.';
    return res.status(500).json({ message: 'Không thể gán vai trò.', error: errorMessage });
  }
};