const { connectBot } = require('../services/botService');

describe('Bot status', () => {
  test('Checking bot connection', async () => {
    const response = await connectBot();
    expect(response).not.toEqual('An invalid token was provided.');
  });
});
