class Controller {
  static async getUser() {
    return {
      name: 'John Doe',
      role: 'admin',
      actions: ['profile', 'settings'],
    };
  }
}

module.exports = Controller;
