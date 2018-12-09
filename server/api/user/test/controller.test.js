const controller = require('../controller');

describe('user.controller', function () {
  describe('getUserById', function () {
    it('should return dummy user object', function () {
      let user = controller.getUserById('2');
      user.name.should.equal('John Doe');
      user.role.should.equal('admin');
    });
  });
});
