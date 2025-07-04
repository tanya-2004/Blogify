import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import NewPostModal from '../../components/modals/NewPostModal';

export default function Theme() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [fontSize, setFontSize] = useState('medium');

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
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <Typography variant="h1" className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            <span>Theme Customization</span>
          </Typography>
          <Typography variant="body2" className="text-text-secondary">
            Customize the appearance of your blog to match your style
          </Typography>
        </div>

        {/* Theme Selection */}
        <Card className="mb-6">
          <Typography variant="h2" className="mb-4">
            🎨 Choose Theme
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`theme-option ${
                  selectedTheme === theme.id ? 'theme-option--selected' : ''
                }`}
              >
                <div className={`theme-preview ${theme.bg} border mb-2 relative overflow-hidden`}>
                  <div className={`theme-preview__accent ${theme.accent}`}></div>
                  <div className={`theme-preview__line theme-preview__line--primary ${theme.text === 'text-white' ? 'bg-white' : 'bg-gray-400'}`}></div>
                  <div className={`theme-preview__line theme-preview__line--secondary ${theme.text === 'text-white' ? 'bg-gray-300' : 'bg-gray-300'}`}></div>
                </div>
                <Typography variant="caption" className="font-medium">
                  {theme.name}
                </Typography>
              </button>
            ))}
          </div>
        </Card>

        {/* Color Customization */}
        <Card className="mb-6">
          <Typography variant="h2" className="mb-4">
            🌈 Primary Color
          </Typography>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setPrimaryColor(color.value)}
                className={`color-option ${
                  primaryColor === color.value ? 'color-option--selected' : ''
                }`}
              >
                <div
                  className="color-swatch"
                  style={{ backgroundColor: color.value }}
                ></div>
                <Typography variant="caption" className="font-medium">
                  {color.name}
                </Typography>
              </button>
            ))}
          </div>
        </Card>

        {/* Typography */}
        <Card className="mb-6">
          <Typography variant="h2" className="mb-4">
            ✍️ Typography
          </Typography>
          <div className="space-y-4">
            <div>
              <Typography variant="body1" className="font-medium mb-2">
                Font Size
              </Typography>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="form-select w-full"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Preview */}
        <Card className="mb-6">
          <Typography variant="h2" className="mb-4">
            👀 Preview
          </Typography>
          <div className="theme-preview-container">
            <div className="mb-4">
              <div
                className="theme-preview-header"
                style={{ backgroundColor: primaryColor }}
              >
                Sample Header
              </div>
            </div>
            <div className={`theme-preview-content ${fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
              <Typography variant="h3" className="mb-2">
                Sample Blog Post Title
              </Typography>
              <Typography variant="body2" className="text-text-secondary mb-4">
                This is a sample blog post content to show how your theme will look. 
                The typography and colors will be applied according to your selection.
              </Typography>
              <Button
                variant="primary"
                style={{ backgroundColor: primaryColor }}
              >
                Read More
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="large"
            onClick={() => alert('Theme settings saved! (This is a demo)')}
            className="save-theme-btn"
          >
            <span className="mr-2">💾</span>
            Save Changes
          </Button>
        </div>
      </div>

      {showModal && <NewPostModal onClose={() => setShowModal(false)} />}
    </>
  );
}
