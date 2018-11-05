describe('USER ROUTES TEST', () => {
  beforeEach(async () => {
    serverInstance = require('../../index');
    await model.deleteMany({});
  });
  afterEach(async () => {
    await serverInstance.close();
    await model.deleteMany({});
  });
  it('asdf', () => {

  });
});