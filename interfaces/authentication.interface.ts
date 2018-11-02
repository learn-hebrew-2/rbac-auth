import PermissionItem from "../dto/permission.item";
import { OperationStatus } from "../enums/operation-status.enum";
import UserTypeItem from "../dto/user-type.item";

export default interface AuthenticationInterface {
  /**
   * @returns array of all user types;
   * @returns empty array if there is no user types;
   */
  getUserTypes(): UserTypeItem[];
  /**
   * 
   * @param id 
   * @returns user type with given user type id;
   * @throws NoSuchMediaExcepion if there is no user type with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  getUserType(id: string): UserTypeItem;
  /**
   * adds new user type item and 
   * @param userType: UserTypeItem
   * @returns created user type item record;
   * @throws ExistingMediaException if such user type item already exists;
   * @throws IllegalArgumentException if given data is not valid;
   */
  addUserType(userType: UserTypeItem): UserTypeItem;
  /**
   * updates user type item with given id;
   * @param id 
   * @param userType 
   * @returns updated UserTypeItem;
   * @throws NoSuchMediaException if there is no user type item with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  editUserType(id: string, userType: UserTypeItem): UserTypeItem;
  /**
   * deletes user type with given id;
   * @param id 
   * @returns deleted UserTypeItem;
   * @throws NoSuchMediaException if there is no UserTypeItem with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  deleteUserType(id: string): UserTypeItem;
  /**
   * @param id of user 
   * @param requirements: PermissionItem[] contains only permisions with will
   * be checked 
   * @returns true if all the requirements are present in
   * particular UserType with given id;
   * @throws NoSuchMediaException if there is no UserTypeItem with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  checkPermissions(id: string, requirements: PermissionItem[]): boolean;
  /**
   * assigns given permissions array to particular UserType with given id;
   * @param permissions 
   * @throws NoSuchMediaException if there is no UserTypeItem with given id;
   */
  setPermissions(id: string, permissions: PermissionItem[]): OperationStatus;
  /**
   * adds given permission to the particular UserType 
   * @throws NoSuchMediaException if there is no UserTypeItem with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  addPermissions(id: string, permissions: PermissionItem[]): OperationStatus;
  /**
   * remove given permission of the particular UserType 
   * @throws NoSuchMediaException if there is no UserTypeItem with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  removePermissions(id: string, permissions: PermissionItem[]): OperationStatus;
}