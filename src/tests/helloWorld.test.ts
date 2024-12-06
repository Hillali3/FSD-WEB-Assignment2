jest.config.js:
{
  "testEnvironment": "node"
}

src/tests/helloWorld.test.ts:
const helloWorld = require('../path/to/helloWorld'); // Adjust the path as necessary

describe('helloWorld function', () => {
  test('should return "Hello, World!"', () => {
    expect(helloWorld()).toBe('Hello, World!');
  });
});