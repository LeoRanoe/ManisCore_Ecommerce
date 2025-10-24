'use client';

import { useEffect, useState, ChangeEvent, FocusEvent } from 'react';
import { FloatingLabelInput } from './FloatingLabelInput';
import { useFormValidation, ValidationRule } from '@/lib/useFormValidation';

interface ValidatedInputProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  rules: ValidationRule[];
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  className?: string;
  icon?: React.ReactNode;
  validateOnChange?: boolean; // Default: true
  validateOnBlur?: boolean; // Default: true
}

export function ValidatedInput({
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  rules,
  placeholder,
  disabled,
  helperText,
  className,
  icon,
  validateOnChange = true,
  validateOnBlur = true,
}: ValidatedInputProps) {
  const { validationState, validate, setFieldTouched } = useFormValidation({
    [name]: rules,
  });

  const fieldState = validationState[name];
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);

    if (validateOnChange && fieldState?.isDirty) {
      await validate(name, newValue);
    }
  };

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    setFieldTouched(name, true);
    
    if (validateOnBlur) {
      await validate(name, localValue);
    }
    
    onBlur?.();
  };

  // Determine status for FloatingLabelInput
  const shouldShowError = (fieldState?.isTouched || fieldState?.isDirty) && fieldState?.error;
  const shouldShowSuccess = fieldState?.isValid && fieldState?.isDirty && !fieldState?.error;

  return (
    <FloatingLabelInput
      id={name}
      name={name}
      type={type}
      label={label}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled || fieldState?.isValidating}
      error={shouldShowError ? fieldState?.error || undefined : undefined}
      success={shouldShowSuccess}
      helperText={helperText}
      icon={icon}
      className={className}
    />
  );
}

// Form wrapper component for managing multiple validated inputs
export function ValidatedForm({
  children,
  onSubmit,
  className,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {children}
    </form>
  );
}
