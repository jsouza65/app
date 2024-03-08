import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(public value: string) {
    super();
  }
}

describe("Value Object Unit Test", () => {

  test('should be equals', () => {
    const vo1 = new StringValueObject('test');
    const vo2 = new StringValueObject('test');
    expect(vo1.equals(vo2)).toBeTruthy();
  });
});