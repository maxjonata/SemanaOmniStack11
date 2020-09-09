const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(() => {
        connection.destroy();
    });

    it('should be able to create a new ong', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "ONGRobertin",
            email: "contato@apad.com.br",
            whatsapp: "2179975758",
            city: "Rio de Janeiro",
            uf: "RJ"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});