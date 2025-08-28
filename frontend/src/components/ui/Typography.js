import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import '../../styles/design-system.css';
import { ThemeContext } from '../../contexts/ThemeContext';

const defaultElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  hero: 'h1',
  title: 'h2',
  subtitle: 'h3',
  heading: 'h4',
  subheading: 'h5',
  body1: 'p',
  body2: 'p',
  body: 'p',
  caption: 'span',
  overline: 'span'
};

const Typography = ({
  children,
  variant = 'body',
  as,
  weight = 'normal',
  color = 'default',
  align = 'left',
  gradient = false,
  className = '',
  style = {},
  ...rest
}) => {
  const { primaryColor, fontSize, selectedTheme } = useContext(ThemeContext);

  const Component = useMemo(() => as || defaultElements[variant] || 'p', [as, variant]);

  const fontClass = useMemo(() => {
    return fontSize === 'small' ? 'text-sm'
      : fontSize === 'large' ? 'text-lg'
        : 'text-base';
  }, [fontSize]);

  const textClasses = useMemo(() => {
    return [
      `text--${variant}`,
      weight !== 'normal' && `text--${weight}`,
      color !== 'default' && `text--${color}`,
      align !== 'left' && `text--${align}`,
      gradient && 'text--gradient',
      selectedTheme.text,
      fontClass,
      className
    ].filter(Boolean).join(' ');
  }, [variant, weight, color, align, gradient, fontClass, className, selectedTheme.text]);

  const dynamicStyle = useMemo(() => {
    return {
      color: color === 'primary' ? primaryColor || 'var(--color-primary-default)' : undefined,
      fontSize: `var(--font-size-${fontSize})`,
      ...style
    };
  }, [color, primaryColor, fontSize, style]);

  return (
    <Component className={textClasses} data-testid="typography" style={dynamicStyle} {...rest}>
      {children}
    </Component>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'hero', 'title', 'subtitle', 'heading', 'subheading',
    'body1', 'body2', 'body',
    'caption', 'overline'
  ]),
  as: PropTypes.elementType,
  weight: PropTypes.oneOf([
    'thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'
  ]),
  color: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'muted',
    'success', 'warning', 'error'
  ]),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  gradient: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Typography;