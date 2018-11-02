import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import UserInterface from "../interfaces/users.interface";
import UserItem from "../dto/user.item";
import ExistingMediaException from "../exceptions/existing-media.error";
import IllegalArgumentExeption from "../exceptions/illegal-argument.error";
import DBAccessError from '../exceptions/db-access.error';


export default class UsersService implements UserInterface {
  private UserModel = UserItem.model;

  async createUser(user: UserItem): Promise<UserItem> {
    if (user === null) throw new IllegalArgumentExeption();

    try {
      const dbUser = await this.UserModel.findOne({email: user.email});
      if (dbUser) throw new ExistingMediaException('User');
    } catch (err) {
      throw new DBAccessError(err.message);
    }

    const salt = 
    
    try {
      const userModel = new this.UserModel(user.object);

    } catch (err) {
      throw new DBAccessError(err.message);
    }
    return null;
  }

  createUserSession(user: UserItem): string {
    return "";
  }

  deleteUser(id: string): UserItem {
    return undefined;
  }

  getUser(id: string): UserItem {
    return undefined;
  }

  getUsers(first?: number, last?: number): UserItem[] {
    return [];
  }

  updateUser(user: UserItem): UserItem {
    return undefined;
  }

}