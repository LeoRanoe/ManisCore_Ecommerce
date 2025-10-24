'use client';

import { useEffect, useState, useCallback } from 'react';

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface FieldValidation {
  isValid: boolean;
  error: string | null;
  isValidating: boolean;
  isDirty: boolean;
  isTouched: boolean;
}

export interface FormValidationState {
  [fieldName: string]: FieldValidation;
}

// Validation functions
const validators = {
  required: (value: any) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  },
  
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  
  minLength: (value: string, min: number) => {
    return value.length >= min;
  },
  
  maxLength: (value: string, max: number) => {
    return value.length <= max;
  },
  
  pattern: (value: string, pattern: RegExp) => {
    return pattern.test(value);
  },
};

export function useFormValidation(initialState: { [fieldName: string]: ValidationRule[] }) {
  const [validationState, setValidationState] = useState<FormValidationState>(() => {
    const initial: FormValidationState = {};
    Object.keys(initialState).forEach(fieldName => {
      initial[fieldName] = {
        isValid: true,
        error: null,
        isValidating: false,
        isDirty: false,
        isTouched: false,
      };
    });
    return initial;
  });

  const validateField = useCallback(
    async (fieldName: string, value: any): Promise<{ isValid: boolean; error: string | null }> => {
      const rules = initialState[fieldName];
      if (!rules) return { isValid: true, error: null };

      for (const rule of rules) {
        let isValid = true;

        switch (rule.type) {
          case 'required':
            isValid = validators.required(value);
            break;
          case 'email':
            isValid = validators.email(value);
            break;
          case 'minLength':
            isValid = validators.minLength(value, rule.value);
            break;
          case 'maxLength':
            isValid = validators.maxLength(value, rule.value);
            break;
          case 'pattern':
            isValid = validators.pattern(value, rule.value);
            break;
          case 'custom':
            if (typeof rule.value === 'function') {
              const result = rule.value(value);
              isValid = result instanceof Promise ? await result : result;
            }
            break;
        }

        if (!isValid) {
          return { isValid: false, error: rule.message };
        }
      }

      return { isValid: true, error: null };
    },
    [initialState]
  );

  const validate = useCallback(
    async (fieldName: string, value: any) => {
      // Set validating state
      setValidationState(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          isValidating: true,
          isDirty: true,
        },
      }));

      // Perform validation
      const result = await validateField(fieldName, value);

      // Update state with result
      setValidationState(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          isValid: result.isValid,
          error: result.error,
          isValidating: false,
        },
      }));

      return result.isValid;
    },
    [validateField]
  );

  const validateAll = useCallback(
    async (values: { [fieldName: string]: any }) => {
      const results: { [fieldName: string]: boolean } = {};

      for (const fieldName of Object.keys(initialState)) {
        const isValid = await validate(fieldName, values[fieldName]);
        results[fieldName] = isValid;
      }

      return Object.values(results).every(v => v);
    },
    [initialState, validate]
  );

  const setFieldTouched = useCallback((fieldName: string, touched = true) => {
    setValidationState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        isTouched: touched,
      },
    }));
  }, []);

  const setFieldDirty = useCallback((fieldName: string, dirty = true) => {
    setValidationState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        isDirty: dirty,
      },
    }));
  }, []);

  const resetField = useCallback((fieldName: string) => {
    setValidationState(prev => ({
      ...prev,
      [fieldName]: {
        isValid: true,
        error: null,
        isValidating: false,
        isDirty: false,
        isTouched: false,
      },
    }));
  }, []);

  const resetForm = useCallback(() => {
    const resetState: FormValidationState = {};
    Object.keys(initialState).forEach(fieldName => {
      resetState[fieldName] = {
        isValid: true,
        error: null,
        isValidating: false,
        isDirty: false,
        isTouched: false,
      };
    });
    setValidationState(resetState);
  }, [initialState]);

  return {
    validationState,
    validate,
    validateAll,
    setFieldTouched,
    setFieldDirty,
    resetField,
    resetForm,
  };
}
