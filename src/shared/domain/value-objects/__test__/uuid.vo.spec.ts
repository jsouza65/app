import { InvalidUuidError, Uuid } from "../uuid.vo";

describe('Uuid Unit test', () => {

  test('should trhow error when uuid is invalid', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow(new InvalidUuidError());
  });
})