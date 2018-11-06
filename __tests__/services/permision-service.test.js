const PermissionItem = require('../../src/dto/permission.item');
const permissionModel = PermissionItem.model;
const request = require('supertest');
let server;

describe('/api/permission', () => {
    beforeEach(async () => {
        server = require('../../src/index.js');
        await permissionModel.remove({});
    });
    afterEach(async () => {
        await server.close();
        await permissionModel.remove({});
    });
    describe('POST /', () => {
        let item;
        const exec = async () => {
            return await request(server).post('/api/permissions').send(item);
        };
        it('should return status 200 and save permission item', async () => {
            item = {
                resource: "test resourse",
                method: "test method",
                description: "test description"
            }
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res).not.toBeNull();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('resource', 'test resourse');
            const record = await permissionModel.find({'resource': 'test resourse' });
            expect(record.length).toBeGreaterThan(0);
        });
        it('should return status 400, shortfall method', async () => {
            item = {
                resource: "test resourse",
                description: "test description"
            }
            const result = await exec();
            expect(result.status).toBe(400);
        });
        it('should return status 400, no valid resource', async () => {
            item = {
                resource: "",
                method: "test method",
                description: "test description"
            }
            const result = await exec();
            expect(result.status).toBe(400);
        });
    });
    describe('GET /', () => {
        const items = [
            {
                resource: "resourse_1",
                method: "method_1",
                description: "description_1"
            },
            {
                resource: "resourse_2",
                method: "method_2",
                description: "description_2"
            },
            {
                resource: "resourse_3",
                method: "method_3",
                description: "description_3"
            }
        ];
        const exec = async () => {
            return await request(server).get('/api/permissions').send();
        };
        it('should return array of permission items', async () => {
            await permissionModel.insertMany(items);
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some(item => item.resource === 'resourse_1')).toBeTruthy();
            expect(res.body.some(item => item.resource === 'resourse_2')).toBeTruthy();
        });
    });
    describe('GET /:id', () => {
        it('should return permission item by given id', async () => {
            const item = {
                resource: "resourse_1",
                method: "method_1",
                description: "description_1"
            }
            const permisionItem = permissionModel(item);
            await permisionItem.save();
            const res = await request(server).get('/api/permissions/'+permisionItem._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('resource', 'resourse_1');
        });
        it('should return status 400, not valid id', async () => {
            const res = await request(server).get('/api/permissions/1234');
            expect(res.status).toBe(400);
        });
        it('should return status 404, not exist record by given id', async () => {
            const res = await request(server).get('/api/permissions/5bdebbd5d5b45451a466668e');
            expect(res.status).toBe(404);
        });
    });
    describe('PUT /:id', () => {
        it('should return status 200 and update permission item', async () => {
            const item = {
                resource: "resource_1",
                method: "method_1",
                description: "description_1"
            }
            const newItem = {
                resource: "resource_2",
                method: "method_2",
                description: "description_3"
            }
            const permisionItem = permissionModel(item);
            await permisionItem.save();
            const res = await request(server).put('/api/permissions/'+permisionItem._id)
                .send(newItem);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('resource', 'resource_2');
        });
        it('should return status 400 not valid description field', async () => {
            const item = {
                resource: "resource_1",
                method: "method_1",
                description: ""
            }
            const newItem = {
                resource: "resource_2",
                method: "method_2",
                description: ""
            }
            const permisionItem = permissionModel(item);
            await permisionItem.save();
            const res = await request(server).put('/api/permissions/'+permisionItem._id)
                .send(newItem);
            expect(res.status).toBe(400);
        });
        it('should return status 400, wrong id in put request', async () => {
            const newItem = {
                resource: "resource_2",
                method: "method_2",
                description: "description_3"
            }
            const res = await request(server).put('/api/permissions/1234')
                .send(newItem);
            expect(res.status).toBe(400);
        });
    });
    describe('DELETE /', () => {
        it('should return status 200 and remove reecord', async () => {
            let item = {
                resource: "resource_delete",
                method: "method_delete",
                description: "description_delete"
            }
            const permisionItem = permissionModel(item);
            item = await permisionItem.save();
            const res = await request(server).delete('/api/permissions/'+item._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('resource', 'resource_delete');
        });
        it('should return status 400, invalid id', async () => {
            const res = await request(server).delete('/api/permissions/1234');
            expect(res.status).toBe(400);
        });
        it('should return status 404, not exist id', async () => {
            const res = await request(server).delete('/api/permissions/5bdebbd5d5b45451a466668e');
            expect(res.status).toBe(404);
        });
    });
});