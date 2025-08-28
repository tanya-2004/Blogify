import React, { forwardRef, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import '../../styles/design-system.css';
import { ThemeContext } from '../../contexts/ThemeContext';

const Input = forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  type = 'text',
  size = 'medium',
  variant = 'default',
  disabled = false,
  required = false,
  className = '',
  id,
  ...rest
}, ref) => {
  const { primaryColor, fontSize, selectedTheme } = useContext(ThemeContext);

  const inputId = useMemo(() => id || `input-${Math.random().toString(36).substr(2, 9)}`, [id]);

  const inputClasses = [
    'input',
    size !== 'medium' && `input--${size}`,
    variant !== 'default' && `input--${variant}`,
    error && 'input--error',
    leftIcon && 'input--with-left-icon',
    rightIcon && 'input--with-right-icon',
    className
  ].filter(Boolean).join(' ');

  const inputGroupClasses = [
    'input-group',
    selectedTheme.bg,
    selectedTheme.text
  ].filter(Boolean).join(' ');

  const dynamicStyle = {
    fontSize: `var(--font-size-${fontSize})`,
    borderColor: error ? 'var(--color-error)' : primaryColor || 'var(--color-primary-default)',
    outlineColor: primaryColor || 'var(--color-primary-default)'
  };

  return (
    <div className={inputGroupClasses} data-testid="input-group">
      {label && (
        <label
          htmlFor={inputId}
          className={`input-label ${required ? 'input-label--required' : ''}`}
          style={{ fontSize: `var(--font-size-${fontSize})` }}
        >
          {label}
          {required && <span className="input-label__required" aria-label="required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {leftIcon && <div className="input-icon input-icon--left">{leftIcon}</div>}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClasses}
          style={dynamicStyle}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={
            [error ? `${inputId}-error` : '', hint ? `${inputId}-hint` : ''].filter(Boolean).join(' ') || undefined
          }
          data-testid="input-field"
          {...rest}
        />

        {rightIcon && <div className="input-icon input-icon--right">{rightIcon}</div>}
      </div>

      {hint && <div id={`${inputId}-hint`} className="input-hint">{hint}</div>}
      {error && <div id={`${inputId}-error`} className="input-error" role="alert">{error}</div>}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'filled', 'outline']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string
};

export default Input;