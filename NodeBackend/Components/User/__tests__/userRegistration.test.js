const request = require('supertest');
const app = require('../../../server'); // Import your Express app
const mongoose = require('mongoose');
// const User = require('../schemas/user.schema'); 
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

// // Mocking JWT middleware to avoid errors during testing
// jest.mock('../middlewares/jwtMiddleware.js', () => ({
//     default: (req, res, next) => next(),
// }));

beforeAll(async () => {
    // Connect to an in-memory MongoDB for testing
    const mongoUri = MONGO_URL;
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Close the connection after all tests
    await mongoose.connection.close();
});

describe('User Registration', () => {
    // Test for successful registration
    // it('should register a user with valid data', async () => {
    //     const userData = {
    //         email: 'testuser1@example.com',
    //         password: 'password123',
    //         first_name: 'John',
    //         last_name: 'Doe',
    //         gender: 'male',
    //         birthDate: '1990-01-01',
    //         contact: '+1234567890',
    //         is_active: true,
    //     };

    //     const response = await request(app)
    //         .post('/signup')
    //         .send(userData);

    //     expect(response.status).toBe(201); // Check for successful registration
    //     expect(response.body.status).toBe('ok');
    //     expect(response.body.message).toBe('User created successfully');
    //     expect(response.body.data).toHaveProperty('email', userData.email);
    // });

    // Test for existing user registration
    it('should return an error if the email is already taken', async () => {
        // First create a user to simulate an existing user

        // Try to register a user with the same email
        const userData = {
            email: 'testuser1@example.com',
            password: 'password123',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male',
            birthDate: '1990-01-01',
            contact: '+1234567890',
            is_active: true,
        };

        const response = await request(app)
            .post('/signup')
            .send(userData);

        expect(response.status).toBe(400); // Expect a bad request
        expect(response.body.status).toBe('unavail');
        expect(response.body.message).toBe('Email is already taken');
    });

    // Test for missing required fields (e.g., email)
    it('should return an error if required fields are missing', async () => {
        const userData = {
            password: 'password123',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male',
            birthDate: '1990-01-01',
            contact: '+1234567890',
            is_active: true,
        };

        const response = await request(app)
            .post('/signup')
            .send(userData);

        expect(response.status).toBe(400); // Expect a bad request due to validation error
        expect(response.body.errors).toContain('Please provide a valid email address');
    });

    // Test for invalid email format
    it('should return an error if the email format is invalid', async () => {
        const userData = {
            email: 'invalid-email',
            password: 'password123',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male',
            birthDate: '1990-01-01',
            contact: '+1234567890',
            is_active: true,
        };

        const response = await request(app)
            .post('/signup')
            .send(userData);

        expect(response.status).toBe(400); // Expect a bad request due to invalid email
        expect(response.body.errors).toContain('Please provide a valid email address');
    });
});
