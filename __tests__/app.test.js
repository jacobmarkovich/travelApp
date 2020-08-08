const {checkDate} = require('../src/client/js/app')

describe('Test, the function "checkDate" should exist' , () => {
    test('Function should return true', () => {
        expect(checkDate).toBeDefined();
    });
});