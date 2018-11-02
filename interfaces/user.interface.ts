import UserItem from '../dto/user.item';
import { OperationStatus } from '../enums/operation-status.enum';

export default interface UserInterface {
  /**
   * creates new user in db users collection; 
   * @param user 
   * @returns created user record; 
   * @throws ExistingMediaException if such user already exists;
   * @throws IllegalArgumentException if given data is not valid;
   */
  createUser(user: UserItem): UserItem;
  /**
   * creates new user session;
   * returns new user session token;
   * @param user 
   * @return token: string
   * @throws IllegalArgumentException if given data is not valid;
   */
  createUserSession(user: UserItem): string; 
  /**
   * @returns all users records from db, which placed between given 
   * boundaries [first, last];
   * @returns empty array in the case if there is no records in users collection;
   * @throws IllegalArgumentException if given data is not valid;
   */
  getUsers(first?: number, last?: number): UserItem[];
  /**
   * @param id 
   * @returns UserItem with given id
   * @throws NoSuchMediaException if there is no user with such id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  getUser(id: string): UserItem;
  /**
   * updates user record with given id:string (user id) in db with
   * given new user: UserItem object;
   * @param id 
   * @returns updated user: UserItem;
   * @throws NoSuchMediaException in the case if there is no user record 
   * with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  updateUser(id: string, user: UserItem): UserItem;
  /**
   * deletes user record with given user id and
   * returns deleted object;
   * @param id
   * @returns deleted user record: UserItem;
   * @throws NoSuchMediaException in the case if there is no user 
   * record with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  deleteUser(id: string): UserItem;
  /**
   * adds new stat item: UserStatItem into user record with given user id;
   * @param statItem 
   * @returns created UserStatItem;
   * @throws IllegalArgumentException if given data is not valid;
   */
  addStatItem(id: string, statItem: UserStatItem): UserStatItem;
}