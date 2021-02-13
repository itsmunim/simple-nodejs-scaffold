const controller = require('../controller');

describe('user.controller', function () {
  describe('getUser', function () {
    it('should return dummy user object', async function () {
      let user = await controller.getUser();
      user.name.should.equal('John Doe');
      user.role.should.equal('admin');
    });
  });
});
