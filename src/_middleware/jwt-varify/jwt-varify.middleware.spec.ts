import { JwtVarifyMiddleware } from './jwt-varify.middleware';

describe('JwtVarifyMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtVarifyMiddleware()).toBeDefined();
  });
});
