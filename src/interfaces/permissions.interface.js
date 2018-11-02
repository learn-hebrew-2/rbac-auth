import PermissionItem from "../dto/permission.item";

export default interface PermissionInterface {
    /**
     * added PermissionItem into db collectionon
     * @param permission 
     * @return added PermissionItem 
     * @throws ExistingMediaException
     * @throws IllegalArgumentExeption
     * @throws DataBaseConnectionError
     */
    addPermission(permission: PermissionItem);
    /**
     * updated PermissionItem in db collection
     * @param permission 
     * @return updated PermissionItem 
     * @throws NoSuchMediaException
     * @throws IllegalArgumentExeption
     * @throws DataBaseConnectionError
     */
    updatePermission(permission: PermissionItem): PermissionItem;
    /**
     * removed PermissionItem from db collection
     * @param id 
     * @return removed PermissionItem
     * @throws NoSuchMediaException
     * @throws IllegalArgumentExeption
     * @throws DataBaseConnectionError
     */
    removePermission(id: String): PermissionItem;
    /**
     * getted PermissionItem by given id from db collection
     * @param id 
     * @return removed PermissionItem
     * @throws NoSuchMediaException
     * @throws IllegalArgumentExeptio 
     * @throws DataBaseConnectionError
     */
    getPermission(id: String): PermissionItem;
    /**
     * geted all PermissionItems from db collection
     * @return PermissionItem[]
     * @throws DataBaseConnectionError
     */
    getPermissions(): PermissionItem[];
}