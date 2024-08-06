import { useState } from 'react';

import { emailRegex } from '@/utils/constants';
import { ValidationError, ValidationFields } from '@/utils/interfaces';

const useValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validate = (input: string, type: ValidationFields) => {
    switch (type) {
      case ValidationFields.email:
        {
          const isValidEmail = emailRegex.test(input);
          const errorExist = errors.find((err) => err.type === type);

          if (!isValidEmail && !errorExist) {
            setErrors([...errors, { type, error: 'Invalid email' }]);
          } else if (isValidEmail && errorExist) {
            const index = errors.findIndex((err) => err.type === type);
            errors.splice(index, 1);
          }
        }
        break;

      case ValidationFields.password:
      case ValidationFields.passwordAgain:
        {
          const isValidLength = input.length > 5;
          const errorExist = errors.find((err) => err.type === type);

          if (!isValidLength && !errorExist) {
            setErrors([...errors, { type, error: 'Password too short' }]);
          } else if (isValidLength && errorExist) {
            const index = errors.findIndex((err) => err.type === type);
            errors.splice(index, 1);
          }
        }
        break;

      case ValidationFields.name:
        {
          const isValidLength = input.length > 1;
          const errorExist = errors.find((err) => err.type === type);

          if (!isValidLength && !errorExist) {
            setErrors([...errors, { type, error: 'Name too short' }]);
          } else if (isValidLength && errorExist) {
            const index = errors.findIndex((err) => err.type === type);
            errors.splice(index, 1);
          }
        }
        break;

      default:
        break;
    }
  };

  return [errors, validate] as const;
};

export default useValidation;
