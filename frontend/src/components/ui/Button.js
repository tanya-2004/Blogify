import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/design-system.css';

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
  const buttonClasses = [
    'button',
    `button--${variant}`,
    size !== 'medium' ? `button--${size}` : '',
    loading ? 'button--loading' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  const content = loading ? (
    <>
      <span className="sr-only">Loading...</span>
      <span aria-hidden="true" className="button__loading-indicator">Loading...</span>
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
  );

  const sharedProps = {
    className: buttonClasses,
    onClick: handleClick,
    'aria-disabled': disabled || loading,
    ...rest
  };

  return Component === 'button' ? (
    <button
      type={type}
      disabled={disabled || loading}
      {...sharedProps}
    >
      {content}
    </button>
  ) : (
    <Component
      role="button"
      tabIndex={disabled || loading ? -1 : 0}
      {...sharedProps}
    >
      {content}
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