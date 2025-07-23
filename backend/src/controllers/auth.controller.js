const userService = require('../services/user.service');

const syncUser = async (req, res) => {
  try {
    const keycloakUser = req.kauth.grant.access_token.content;
    const roles = keycloakUser.realm_access?.roles || [];
    const userRole = roles.includes('tutor') ? 'tutor' 
                   : roles.includes('student') ? 'student' 
                   : roles.includes('parent') ? 'parent' 
                   : 'user';

    const userData = {
      id: keycloakUser.sub,
      email: keycloakUser.email,
      username: keycloakUser.preferred_username,
      firstName: keycloakUser.given_name,
      lastName: keycloakUser.family_name,
      role: userRole,
      status: 'active', 
    };

    const user = await userService.upsertUser(userData);
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Lỗi đồng bộ người dùng.', error: error.message });
  }
};

module.exports = { syncUser };