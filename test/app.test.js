const request = require('supertest');
const app = require('../src/app');
const accountService = require('../src/services/accountService');

describe('API Endpoints', () => {
    describe('POST /reset', () => {
        beforeEach(() => {
            accountService.resetAccounts();
        });

        test('should reset accounts and return "OK"', async () => {
            const response = await request(app).post('/reset');
            expect(response.status).toBe(200);
            expect(response.text).toBe('OK');
        });
    });

    describe('POST /event', () => {
        beforeEach(() => {
            accountService.resetAccounts();
        });

        test('should create a deposit event successfully', async () => {
            const response = await request(app)
                .post('/event')
                .send({ type: 'deposit', amount: 100, destination: 'account1' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                destination: {
                    id: 'account1',
                    balance: 100
                }
            });
        });

        test('should return 400 if destination account is not provided for deposit', async () => {
            const response = await request(app)
                .post('/event')
                .send({ type: 'deposit', amount: 100 });

            expect(response.status).toBe(400);
            expect(response.text).toBe('Destination account is required for deposit');
        });

        test('should create a withdraw event successfully', async () => {
            accountService.handleEvent({ type: 'deposit', amount: 100, destination: 'account1' });

            const response = await request(app)
                .post('/event')
                .send({ type: 'withdraw', amount: 50, origin: 'account1' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                origin: {
                    id: 'account1',
                    balance: 50
                }
            });
        });

        test('should return 400 if origin account is not provided for withdraw', async () => {
            const response = await request(app)
                .post('/event')
                .send({ type: 'withdraw', amount: 50 });

            expect(response.status).toBe(400);
            expect(response.text).toBe('Origin account is required for withdraw');
        });

        test('should return 404 if origin account does not exist for withdraw', async () => {
            const response = await request(app)
                .post('/event')
                .send({ type: 'withdraw', amount: 50, origin: 'nonexistent' });

            expect(response.status).toBe(404);
            expect(response.text).toBe('0');
        });

        test('should create a transfer event successfully', async () => {
            accountService.handleEvent({ type: 'deposit', amount: 100, destination: 'account1' });
            accountService.handleEvent({ type: 'deposit', amount: 50, destination: 'account2' });

            const response = await request(app)
                .post('/event')
                .send({ type: 'transfer', amount: 50, origin: 'account1', destination: 'account2' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                origin: {
                    id: 'account1',
                    balance: 50
                },
                destination: {
                    id: 'account2',
                    balance: 100
                }
            });
        });

        test('should return 400 if origin or destination account is not provided for transfer', async () => {
            const response1 = await request(app)
                .post('/event')
                .send({ type: 'transfer', amount: 50, origin: 'account1' });

            expect(response1.status).toBe(400);
            expect(response1.text).toBe('Origin and destination accounts are required for transfer');

            const response2 = await request(app)
                .post('/event')
                .send({ type: 'transfer', amount: 50, destination: 'account2' });

            expect(response2.status).toBe(400);
            expect(response2.text).toBe('Origin and destination accounts are required for transfer');
        });

        test('should return 404 if origin account does not exist for transfer', async () => {
            const response = await request(app)
                .post('/event')
                .send({ type: 'transfer', amount: 50, origin: 'nonexistent', destination: 'account2' });

            expect(response.status).toBe(404);
            expect(response.text).toBe('0');
        });

        test('should return 404 if balance is insufficient for transfer', async () => {
            accountService.handleEvent({ type: 'deposit', amount: 30, destination: 'account1' });
            accountService.handleEvent({ type: 'deposit', amount: 50, destination: 'account2' });

            const response = await request(app)
                .post('/event')
                .send({ type: 'transfer', amount: 50, origin: 'account1', destination: 'account2' });

            expect(response.status).toBe(404);
            expect(response.text).toBe('0');
        });
    });

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
