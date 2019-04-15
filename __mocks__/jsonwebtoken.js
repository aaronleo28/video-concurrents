const jwt = jest.genMockFromModule('jsonwebtoken');

jwt.sign = () => 'token';

jwt.verify = a => a === 'token' ? { username: 'user1' } : null;

export default jwt;