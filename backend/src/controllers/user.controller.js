const jwt = require("jsonwebtoken");
const keycloakService = require("../services/keycloak.service");

const assignRole = async (req, res) => {
  try {
    const userId = req.kauth.grant.access_token.content.sub;

    const { roleName } = req.body;
    console.log(`--> Yêu cầu gán role:`);
    console.log(`    - User ID: ${userId}`);
    console.log(`    - Role Name: ${roleName}`);
    if (!roleName) {
      return res
        .status(400)
        .json({ message: "Tên vai trò (roleName) là bắt buộc." });
    }

    await keycloakService.assignRoleToUser(userId, roleName);

    res.status(200).json({ message: `Gán vai trò '${roleName}' thành công!` });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Đã có lỗi xảy ra phía máy chủ." });
  }
};

module.exports = {
  assignRole,
};
