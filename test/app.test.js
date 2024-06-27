const request = require('supertest');
const app = require('../src/app');
const accountService = require('../src/services/accountService');

describe('API Endpoints', () => {
    describe('GET /balance', () => {
        beforeEach(() => {
            accountService.resetAccounts();
        });

        test('should return 400 if account_id is not provided', async () => {
            const response = await request(app).get('/balance');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Account ID is required');
        });

        test('should return 404 if account does not exist', async () => {
            const response = await request(app).get('/balance').query({ account_id: 'nonexistent' });
            expect(response.status).toBe(404);
            expect(response.text).toBe('0');
        });

        test('should return 200 and the account balance if account exists', async () => {
            accountService.handleEvent({ type: 'deposit', amount: 100, destination: 'existent' });
            const response = await request(app).get('/balance').query({ account_id: 'existent' });
            expect(response.status).toBe(200);
            expect(response.text).toBe('100');
        });
    });
});
