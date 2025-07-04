import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/design-system.css';

/**
 * Input Component
 * 
 * A flexible input component with support for various states,
 * validation, and accessibility features
 */
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
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClass = 'input';
  const sizeClass = size !== 'medium' ? `input--${size}` : '';
  const variantClass = variant !== 'default' ? `input--${variant}` : '';
  const errorClass = error ? 'input--error' : '';
  
  const inputClasses = [
    baseClass,
    sizeClass,
    variantClass,
    errorClass,
    leftIcon ? 'input--with-left-icon' : '',
    rightIcon ? 'input--with-right-icon' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-group">
      {label && (
        <label 
          htmlFor={inputId}
          className={`input-label ${required ? 'input-label--required' : ''}`}
        >
          {label}
          {required && <span className="input-label__required" aria-label="required">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {leftIcon && (
          <div className="input-icon input-icon--left" aria-hidden="true">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClasses}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [
              error ? `${inputId}-error` : '',
              hint ? `${inputId}-hint` : ''
            ].filter(Boolean).join(' ') || undefined
          }
          {...rest}
        />
        
        {rightIcon && (
          <div className="input-icon input-icon--right" aria-hidden="true">
            {rightIcon}
          </div>
        )}
      </div>
      
      {hint && (
        <div id={`${inputId}-hint`} className="input-hint">
          {hint}
        </div>
      )}
      
      {error && (
        <div 
          id={`${inputId}-error`} 
          className="input-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
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
