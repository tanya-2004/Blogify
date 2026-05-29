import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../../styles/design-system.css';
import { ThemeContext } from '../../contexts/ThemeContext';

const Card = ({
  children,
  variant = 'default',
  padding = 'normal',
  hover = true,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const { fontSize, primaryColor, selectedTheme } = useContext(ThemeContext);

  const baseClass = 'card';
  const variantClass = variant !== 'default' ? `card--${variant}` : '';
  const paddingClass = padding !== 'normal' ? `card--${padding}` : '';
  const hoverClass = hover ? 'card--hover' : '';
  const themeTextClass = selectedTheme.text;
  const themeBgClass = selectedTheme.bg;

  const cardClasses = [
    baseClass,
    variantClass,
    paddingClass,
    hoverClass,
    themeTextClass,
    themeBgClass,
    className
  ].filter(Boolean).join(' ');

  const dynamicStyle = {
    fontSize: `var(--font-size-${fontSize})`,
    borderColor: variant === 'glass' ? primaryColor : undefined
  };

  return (
    <Component className={cardClasses} style={dynamicStyle} {...rest}>
      {children}
    </Component>
  );
};

const CardHeader = ({ children, className = '', ...rest }) => {
  const { fontSize, selectedTheme } = useContext(ThemeContext);
  const headerClasses = ['card__header', selectedTheme.text, className].filter(Boolean).join(' ');

  return (
    <div className={headerClasses} style={{ fontSize: `var(--font-size-${fontSize})` }} {...rest}>
      {children}
    </div>
  );
};

const CardBody = ({ children, className = '', ...rest }) => {
  const { fontSize, selectedTheme } = useContext(ThemeContext);
  const bodyClasses = ['card__body', selectedTheme.text, className].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses} style={{ fontSize: `var(--font-size-${fontSize})` }} {...rest}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...rest }) => {
  const { fontSize, selectedTheme } = useContext(ThemeContext);
  const footerClasses = ['card__footer', selectedTheme.text, className].filter(Boolean).join(' ');

  return (
    <div className={footerClasses} style={{ fontSize: `var(--font-size-${fontSize})` }} {...rest}>
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

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;