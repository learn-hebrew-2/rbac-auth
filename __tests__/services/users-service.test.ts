import 'supertest';
import UserService from '../../src/services/users.service';
import IllegalArgumentExeption from '../../src/exceptions/illegal-argument.error';


let userService: UserService;

describe('creation of new user in mongodb', () => {
  beforeEach(() => {
    userService = new UserService()
  });
  
  it('should throw IllegalArgument exception with not valid input', () => {

    expect(userService.createUser(null)).toThrowError(IllegalArgumentExeption);
  });
});