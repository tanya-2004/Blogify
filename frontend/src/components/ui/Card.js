import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/design-system.css';

/**
 * Card Component
 * 
 * A flexible card component with support for various visual styles
 * including glassmorphism and neumorphism effects
 */
const Card = ({
  children,
  variant = 'default',
  padding = 'normal',
  hover = true,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const baseClass = 'card';
  const variantClass = variant !== 'default' ? `card--${variant}` : '';
  const paddingClass = padding !== 'normal' ? `card--${padding}` : '';
  const hoverClass = hover ? 'card--hover' : '';
  
  const cardClasses = [
    baseClass,
    variantClass,
    paddingClass,
    hoverClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={cardClasses} {...rest}>
      {children}
    </Component>
  );
};

/**
 * Card Header Component
 */
const CardHeader = ({ children, className = '', ...rest }) => {
  const headerClasses = ['card__header', className].filter(Boolean).join(' ');
  
  return (
    <div className={headerClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card Body Component
 */
const CardBody = ({ children, className = '', ...rest }) => {
  const bodyClasses = ['card__body', className].filter(Boolean).join(' ');
  
  return (
    <div className={bodyClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card Footer Component
 */
const CardFooter = ({ children, className = '', ...rest }) => {
  const footerClasses = ['card__footer', className].filter(Boolean).join(' ');
  
  return (
    <div className={footerClasses} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'glass', 'neumorphic', 'elevated']),
  padding: PropTypes.oneOf(['none', 'small', 'normal', 'large']),
  hover: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.elementType
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Compound component pattern
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
