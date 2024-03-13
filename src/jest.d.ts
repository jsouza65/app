import { FieldsErrors } from "./shared/domain/validators/validator-fields-interface";

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorsMessages: (expected: FieldsErrors) => R;
    }
  }
}