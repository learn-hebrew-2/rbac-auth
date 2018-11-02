import PermissionItem from "../dto/permission.item";
import RoleItem from '../dto/role.item';
import { OperationStatus } from "../enums/operation-status.enum";

export default interface RolesInterface {
  /**
   * @returns array of all user types;
   * @returns empty array if there is no user types;
   */
  getRoles(): RoleItem[];
  /**
   * 
   * @param id 
   * @returns user type with given user type id;
   * @throws NoSuchMediaExcepion if there is no user type with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  getRole(id: string): RoleItem;
  /**
   * adds new user type item and 
   * @param userType: RoleItem
   * @returns created RoleItem record;
   * @throws ExistingMediaException if such user type item already exists;
   * @throws IllegalArgumentException if given data is not valid;
   */
  addRole(role: RoleItem): RoleItem;
  /**
   * updates RoleItem with given id;
   * @param id 
   * @param userType 
   * @returns updated RoleItem;
   * @throws NoSuchMediaException if there is no user type item with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  updateRole(id: string, userType: RoleItem): RoleItem;
  /**
   * deletes user type with given id;
   * @param id 
   * @returns deleted RoleItem;
   * @throws NoSuchMediaException if there is no RoleItem with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  deleteRole(id: string): RoleItem;
  /**
   * @param id of user 
   * @param requirements: PermissionItem[] contains only permisions with will
   * be checked 
   * @returns true if all the requirements are present in
   * particular RoleItem with given id;
   * @throws NoSuchMediaException if there is no RoleItem with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  checkPermissions(id: string, requirements: PermissionItem[]): boolean;
  /**
   * adds given permission to the particular RoleItem 
   * @throws NoSuchMediaException if there is no RoleItem with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  addPermissions(id: string, permissions: PermissionItem[]): OperationStatus;
  /**
   * remove given permission of the particular RoleItem 
   * @throws NoSuchMediaException if there is no RoleItem with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
  removePermissions(id: string, permissions: PermissionItem[]): OperationStatus;
}