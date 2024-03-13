import { InvalidUuidError, Uuid } from "../uuid.vo";

describe('Uuid Unit test', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  test('should trhow error when uuid is invalid', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should create a valid uuid', () => {
    const uuid = new Uuid();
    expect(uuid).toBeDefined();
    expect(uuid.id).toBeDefined();
  });

  test('should accept a valid uuid', () => {
    const id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const uuid = new Uuid(id);
    expect(uuid).toBeDefined();
    expect(uuid.id).toBe(id);
  });
})