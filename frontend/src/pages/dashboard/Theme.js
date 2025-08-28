import { useState } from 'react';
import { Card, Button, Typography, NewPostModal } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';
import { showSuccess } from '../../utils/toast';

export default function Theme() {
  const [showModal, setShowModal] = useState(false);
  const {
    selectedTheme,
    setSelectedTheme,
    primaryColor,
    setPrimaryColor,
    fontSize,
    setFontSize,
    colors,
    mode
  } = useTheme();

  const fontSizeTokens = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };
  const themedSize = fontSizeTokens[fontSize] || 'text-base';

  const themes = [
    { id: 'light', name: 'Light', bg: 'bg-white', text: 'text-gray-900', accent: 'bg-blue-500' },
    { id: 'dark', name: 'Dark', bg: 'bg-gray-900', text: 'text-white', accent: 'bg-blue-400' },
    { id: 'minimal', name: 'Minimal', bg: 'bg-gray-50', text: 'text-gray-800', accent: 'bg-gray-600' },
    { id: 'warm', name: 'Warm', bg: 'bg-orange-50', text: 'text-orange-900', accent: 'bg-orange-500' }
  ];

  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Pink', value: '#EC4899' }
  ];

  return (
    <>
      <div className="dashboard-container" style={{ backgroundColor: colors.background }} data-theme={mode}>
        {/* Header */}
        <div className="dashboard-header flex justify-between items-start">
          <div>
            <Typography variant="h1" style={{ color: colors.text }} className="flex items-center space-x-3">
              <svg className="w-8 h-8" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              <span>Theme Customization</span>
            </Typography>
            <Typography variant="body2" style={{ color: colors.textLight }}>
              Customize the appearance of your blog to match your style
            </Typography>
          </div>

          <Button variant="primary" onClick={() => setShowModal(true)} className="flex items-center space-x-2" style={{ backgroundColor: primaryColor }}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Post</span>
          </Button>
        </div>

        {/* Theme Selection */}
        <Card className="mb-6" style={{ borderColor: colors.borderLight }}>
          <Typography variant="h2" style={{ color: colors.text }} className="mb-4">Choose Theme</Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`theme-option ${selectedTheme === theme.id ? 'theme-option--selected' : ''}`}
              >
                <div className={`theme-preview ${theme.bg} border mb-2`}>
                  <div className={`theme-preview__accent ${theme.accent}`} />
                  <div className={`theme-preview__line ${theme.text === 'text-white' ? 'bg-white' : 'bg-gray-400'}`} />
                </div>
                <Typography variant="caption" className="font-medium" style={{ color: colors.text }}>{theme.name}</Typography>
              </button>
            ))}
          </div>
        </Card>

        {/* Primary Color Selection */}
        <Card className="mb-6" style={{ borderColor: colors.borderLight }}>
          <Typography variant="h2" style={{ color: colors.text }} className="mb-4">Primary Color</Typography>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setPrimaryColor(color.value)}
                className={`color-option ${primaryColor === color.value ? 'color-option--selected' : ''}`}
              >
                <div className="color-swatch" style={{ backgroundColor: color.value }} />
                <Typography variant="caption" className="font-medium" style={{ color: colors.text }}>{color.name}</Typography>
              </button>
            ))}
          </div>
        </Card>

        {/* Font Size Selection */}
        <Card className="mb-6" style={{ borderColor: colors.borderLight }}>
          <Typography variant="h2" style={{ color: colors.text }} className="mb-4">Typography</Typography>
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="form-select w-full">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </Card>

        {/* Preview */}
        <Card className="mb-6" style={{ borderColor: colors.borderLight }}>
          <Typography variant="h2" style={{ color: colors.text }} className="mb-4">Preview</Typography>
          <div className="theme-preview-container">
            <div className="mb-4">
              <div className="theme-preview-header" style={{ backgroundColor: primaryColor }}>Sample Header</div>
            </div>
            <div className={`theme-preview-content ${themedSize}`}>
              <Typography variant="h3" style={{ color: colors.text }} className="mb-2">Sample Blog Post Title</Typography>
              <Typography variant="body2" style={{ color: colors.textLight }} className="mb-4">
                This is a sample blog post content to show how your theme will look.
              </Typography>
              <Button variant="primary" style={{ backgroundColor: primaryColor }}>
                Read More
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            variant="primary"
            size="large"
            onClick={() => showSuccess('Theme settings saved!')}
            className="save-theme-btn"
            style={{ backgroundColor: primaryColor }}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {showModal && (
        <NewPostModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onPostCreated={() => {
            setShowModal(false);
            showSuccess('Post published!');
          }}
        />
      )}
    </>
  );
}