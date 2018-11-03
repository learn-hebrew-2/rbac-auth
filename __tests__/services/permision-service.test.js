const PermissionService = require('../../src/services/permissions.service');
const permissionModel = require('../../src/dto/permission.item').model;
const request = require('supertest');
// const permissionModel = PermissionItem.getModel();
let server;

describe('/api/permission', () => {
    beforeEach(() => {
        server = require('../../src/index.js');
    });
    afterEach(async () => {
        await permissionModel.remove({});
        server.close();
    });
    describe('POST /', () => {
        let item;
        const exec = async () => {
            return await request(server).post('/api/permissions').send(item);
        };
        it('should return 200 and save permission item', async () => {
            item = {
                resource: "test resourse",
                method: "test method",
                description: "test description"
            }
            const result = await exec();
            expect(result.status).toBe(200);
            const record = permissionModel.find({resource: "test resourse" });
            expect(record).not.toBeNull();
        });
    });
    // desctribe('GET /', () => {

    // });
    // desctribe('PUT /', () => {

    // });
    // desctribe('DELETE /', () => {

    // });
});