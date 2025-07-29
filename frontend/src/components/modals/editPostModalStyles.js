export const getIconStyle = () => ({
  width: '16px',
  height: '16px',
  minWidth: '16px',
  minHeight: '16px',
  flexShrink: 0
});

export const getInputStyle = (theme = {}, focusedField, name) => {
  const {
    colors = {},
    borderRadius = {}
  } = theme;

  return {
    width: '100%',
    padding: '12px 16px 12px 44px',
    border: `1px solid ${focusedField === name ? colors.primary || '#007bff' : colors.border || '#ddd'}`,
    borderRadius: borderRadius.md || '6px',
    fontSize: '14px',
    outline: 'none',
    boxShadow: focusedField === name ? `0 0 0 3px ${(colors.primary || '#007bff')}20` : 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  };
};

export const getTextareaStyle = (theme, focusedField, name) => ({
  ...getInputStyle(theme, focusedField, name),
  resize: 'vertical',
  minHeight: '120px',
  fontFamily: 'inherit',
  lineHeight: '1.5'
});

export const getModalStyles = (theme = {}) => {
  const {
    spacing = {},
    borderRadius = {},
    colors = {},
    shadows = {}
  } = theme;

  return {
    backdrop: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      zIndex: 1400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.lg || '24px'
    },
    container: {
      backgroundColor: colors.white || '#fff',
      borderRadius: borderRadius.lg || '8px',
      padding: 0,
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: shadows.modal || '0 4px 20px rgba(0,0,0,0.1)'
    },
    header: {
      padding: `${spacing.xl || '32px'} ${spacing.xl || '32px'} 0 ${spacing.xl || '32px'}`,
      position: 'relative',
      borderBottom: `1px solid ${colors.borderLight || '#f0f0f0'}`
    },
    titleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md || '16px',
      marginBottom: spacing.lg || '24px'
    },
    iconBox: {
      width: '32px',
      height: '32px',
      borderRadius: borderRadius.sm || '4px',
      backgroundColor: colors.primaryLight || '#e0f2fe',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.primary || '#3B82F6'
    },
    closeButton: {
      position: 'absolute',
      top: spacing.lg || '24px',
      right: spacing.lg || '24px',
      background: 'none',
      border: 'none',
      padding: spacing.sm || '8px',
      cursor: 'pointer',
      borderRadius: borderRadius.sm || '4px',
      color: colors.secondary || '#64748B'
    },
    body: {
      padding: spacing.xl || '32px',
      maxHeight: '60vh',
      overflowY: 'auto'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      gap: spacing.md || '16px'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: `2px solid ${colors.primary || '#3B82F6'}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    errorContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm || '8px',
      color: colors.error || '#EF4444',
      marginBottom: spacing.md || '16px',
      padding: spacing.md || '16px',
      backgroundColor: `${colors.error || '#EF4444'}10`,
      borderRadius: borderRadius.md || '6px',
      border: `1px solid ${(colors.error || '#EF4444')}30`
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    },
    footer: {
      padding: `${spacing.md || '16px'} ${spacing.xl || '32px'} ${spacing.lg || '24px'} ${spacing.xl || '32px'}`,
      borderTop: `1px solid ${colors.borderLight || '#f0f0f0'}`,
      backgroundColor: colors.background || '#F9FAFB'
    },
    footerActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: spacing.md || '16px'
    },
    submitButton: {
      minWidth: '140px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm || '8px',
      fontSize: '14px',
      borderRadius: borderRadius.md || '6px',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap'
    },
    submitLoading: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm || '8px',
      whiteSpace: 'nowrap'
    },
    submitLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm || '8px',
      whiteSpace: 'nowrap'
    },
    submitSpinner: {
      width: '16px',
      height: '16px',
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      flexShrink: 0
    }
  };
};