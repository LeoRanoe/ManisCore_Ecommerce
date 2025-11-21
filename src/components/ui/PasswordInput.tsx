'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '../ui/Input';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidityChange?: (isValid: boolean) => void;
  placeholder?: string;
  showStrength?: boolean;
  minLength?: number;
}

export function PasswordInput({
  value,
  onChange,
  onValidityChange,
  placeholder = 'Enter password',
  showStrength = true,
  minLength = 8,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Calculate password strength
  const strength = useMemo(() => {
    const checks = {
      length: value.length >= minLength,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value),
    };

    if (!value) return { score: 0, label: '', color: '', checks, isValid: false };

    let score = 0;
    score += checks.length ? 1 : 0;
    score += checks.uppercase ? 1 : 0;
    score += checks.lowercase ? 1 : 0;
    score += checks.number ? 1 : 0;
    score += checks.special ? 1 : 0;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['', 'red', 'orange', 'yellow', 'lime', 'green'];

    const isValid = score >= 3 && checks.length;
    onValidityChange?.(isValid);

    return {
      score,
      label: labels[score] || '',
      color: colors[score] || '',
      checks,
      isValid,
    };
  }, [value, minLength, onValidityChange]);

  return (
    <div className="space-y-2">
      {/* Password Input */}
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Strength Indicator */}
      {showStrength && value && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          {/* Strength Bar */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <motion.div
                key={level}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: strength.score >= level ? 1 : 0 }}
                transition={{ delay: level * 0.05 }}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  strength.score >= level
                    ? strength.color === 'red'
                      ? 'bg-red-500'
                      : strength.color === 'orange'
                      ? 'bg-orange-500'
                      : strength.color === 'yellow'
                      ? 'bg-yellow-500'
                      : strength.color === 'lime'
                      ? 'bg-lime-500'
                      : 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Strength Label */}
          <p
            className={`text-xs font-medium ${
              strength.color === 'red'
                ? 'text-red-600 dark:text-red-400'
                : strength.color === 'orange'
                ? 'text-orange-600 dark:text-orange-400'
                : strength.color === 'yellow'
                ? 'text-yellow-600 dark:text-yellow-400'
                : strength.color === 'lime'
                ? 'text-lime-600 dark:text-lime-400'
                : 'text-green-600 dark:text-green-400'
            }`}
          >
            {strength.label}
          </p>

          {/* Requirements Checklist */}
          <div className="space-y-1 text-xs">
            <RequirementItem met={strength.checks.length} label={`At least ${minLength} characters`} />
            <RequirementItem met={strength.checks.uppercase} label="One uppercase letter" />
            <RequirementItem met={strength.checks.lowercase} label="One lowercase letter" />
            <RequirementItem met={strength.checks.number} label="One number" />
            <RequirementItem met={strength.checks.special} label="One special character" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function RequirementItem({ met, label }: { met: boolean; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-2 ${met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}
    >
      {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{label}</span>
    </motion.div>
  );
}
