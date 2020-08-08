const {server} = require('../src/server/index');

describe('Test, the function "server" should exist' , () => {
    test('Function should return true', () => {
        expect(server).toBeDefined();
    });
});