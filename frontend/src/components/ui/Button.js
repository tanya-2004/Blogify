import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/design-system.css';

/**
 * Button Component
 * 
 * A versatile button component following design system standards
 * Supports multiple variants, sizes, states, and accessibility features
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  as: Component = 'button',
  onClick,
  ...rest
}) => {
  const baseClass = 'button';
  const variantClass = `button--${variant}`;
  const sizeClass = size !== 'medium' ? `button--${size}` : '';
  const loadingClass = loading ? 'button--loading' : '';
  
  const buttonClasses = [
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  // For button elements
  if (Component === 'button') {
    return (
      <Component
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-disabled={disabled || loading}
        {...rest}
      >
        {loading ? (
          <>
            <span className="sr-only">Loading...</span>
            <span aria-hidden="true">Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="button__icon button__icon--left" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            <span className="button__content">{children}</span>
            {rightIcon && (
              <span className="button__icon button__icon--right" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Component>
    );
  }

  // For other elements (like Link)
  return (
    <Component
      className={buttonClasses}
      onClick={handleClick}
      role="button"
      tabIndex={disabled || loading ? -1 : 0}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <span className="sr-only">Loading...</span>
          <span aria-hidden="true">Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="button__icon button__icon--left" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <span className="button__content">{children}</span>
          {rightIcon && (
            <span className="button__icon button__icon--right" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType,
  onClick: PropTypes.func
};

export default Button;
