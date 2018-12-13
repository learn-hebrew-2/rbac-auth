const RoleItem = require('../../src/dto/role.item');
const PermissionItem = require('../../src/dto/permission.item');
const PermissionsService = require('../../src/services/permissions.service');
const permissionModel = PermissionItem.model;

let invalidJoiSchames;
let validJoiSchames;
let permissionsItems;
describe('ROLE ITEM', () => {
    beforeEach(async () => {
        permissionsItems = [
            new PermissionItem(null, 'resource_1', 'method_1', 'description_1'),
            new PermissionItem(null, 'resource_2', 'method_2', 'description_2'),
            new PermissionItem(null, 'resource_3', 'method_3', 'description_3'),
            new PermissionItem(null, 'resource_4', 'method_4', 'description_4'),
        ];
        invalidJoiSchames = [
            null,
            NaN,
            Infinity,
            '',
            {},
            {dwd: 'mklw'},
            {
                name: '',
                description: '',
                permissionsID: '',
                parentId: ''
            },
            {
                name: '',
                description: 'description test',
                permissionsID: 'description permissions',
            },
            {
                name: 'name test',
                description: 'description test',
                permissionsID: 'description permissions',
            },
            {
                name: 'name test',
                description: 'description test',
                permissionsID: [12],
                parentId: 'parentId test'
            }
        ];
        validJoiSchames = [
            {
                name: 'name test',
                description: 'description test',
                permissionsID: [],
                parentId: 'parentId test'
            },
            {
                name: 'name test',
                description: 'description test',
            }
        ]
        // const permissionsService = new PermissionsService();
        // for(let i = 1; i < permissionsItems.length; i++) {
        //     await permissionsService.addPermission(permissionsItems[i]);
        // }
    });
    afterEach(async () => {
        // for(let i = 1; i < permissionsItems.length; i++) {
        //     await permissionsService.removePermission(permissionsItems[i]);
        // }
    });
    it('should returns defined joi error on testing with invalid items', async () => {
        for(let i = 0; i < invalidJoiSchames.length; i++) {
            const result = RoleItem.validate(invalidJoiSchames[i]);
            await expect(result.error).not.toBeNull();
        }
    });
    it('should return undefined joi error on testing with valid items', async () => {
        for(let i = 0; i < validJoiSchames.length; i++) {
            const { error } = RoleItem.validate(validJoiSchames[i]);
            await expect(error).toBeNull()
        }
    });
});