import PermissionInterface from "../interfaces/permissions.interface";
import PermissionItem from "../dto/permission.item";
import * as debuger from 'debug';
const permissionServiceDebuger = debuger('app:permissionService');

export default class PermissionService implements PermissionInterface {
    async addPermission(permission: PermissionItem) {
        const model = PermissionItem.getModel()(permission.object);
        try {
            permission = await model.save();
            return permission;
        } catch(e) {
            permissionServiceDebuger(e.message);
            return e;
        }
    }    
    updatePermission(permission: PermissionItem): PermissionItem {
        throw new Error("Method not implemented.");
    }
    removePermission(id: String): PermissionItem {
        throw new Error("Method not implemented.");
    }
    getPermission(id: String): PermissionItem {
        throw new Error("Method not implemented.");
    }
    getPermissions(): PermissionItem[] {
        throw new Error("Method not implemented.");
    }

}