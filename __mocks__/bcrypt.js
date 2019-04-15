const bcrypt = jest.genMockFromModule('bcrypt');

bcrypt.compare = (a, b) => a === b;
bcrypt.hash = () => Promise.resolve('hashedPassword')

export default bcrypt;