const PermissionItem = require('../../src/dto/permission.item');

describe('PermissionItem', () => {
    beforeEach(() => {
    
    });
    it('should return json object of permission item', () => {
        const item = {
            id: null,
            resource: 'resource', 
            method: 'method', 
            description: 'description'
        };
        const permissionItem = new PermissionItem(item.id, item.resource,
            item.method, item.description);
        expect(permissionItem.toJson()).toEqual(item);
    });
    it('should validate item by permission item schema', () => {
        const item = {
            resource: 'resource', 
            method: 'method', 
            description: 'description'
        };
        const { error } = PermissionItem.validate(item);
        expect(error).toBeNull();
    });
    it('should validate item by permission item schema, shortfall', () => {
        const itemWrong = {
            method: 'method', 
            description: 'description'
        };
        const { error } = PermissionItem.validate(itemWrong);
        expect(error).toBeDefined();
    });
    it('should validate item by permission item schema, extra field', () => {
        const itemWrong = {
            extra: '',
            resource: 'resource', 
            method: 'method', 
            description: 'description'
        };
        const { error } = PermissionItem.validate(itemWrong);
        expect(error).toBeDefined();
    });
    it('should validate item by permission item schema, empty fiels', () => {
        const itemWrong = {
            resource: 'resource', 
            method: 'method', 
            description: ''
        };
        const { error } = PermissionItem.validate(itemWrong);
        expect(error).toBeDefined();
    });
});