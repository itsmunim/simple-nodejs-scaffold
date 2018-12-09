/**
 * Returns user by id (for now, it's dummy)
 * @param id The user id
 * @returns {{name: string, role: string}}
 */
function getUserById(id) {
  if (id) {
    return {
      name: 'John Doe',
      role: 'admin',
      actions: ['profile', 'settings']
    };
  }
}

module.exports = {
  getUserById
};
