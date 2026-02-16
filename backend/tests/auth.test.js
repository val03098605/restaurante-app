const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

describe('Auth Routes', () => {

    it('Debe registrar un usuario', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: 'TestUser',
                email: 'testuser@test.com',
                password: '123456',
                rol: 'admin'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Usuario registrado correctamente');
    });

    it('Debe hacer login correctamente', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@test.com',
                password: '123456'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

});

afterAll(async () => {
    if (db.end) {
        await db.end();
    }
});
