import { useState } from 'react';
import { Card, Button, Typography, Input, NewPostModal } from '../../components';

export default function Settings() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    username: 'CosmicBlogger',
    email: 'cosmic@example.com',
    bio: 'Exploring the universe through words and code',
    avatar: '',
    
    // Privacy Settings
    profilePublic: true,
    showEmail: false,
    allowComments: true,
    moderateComments: true,
    
    // Notification Settings
    emailNotifications: true,
    commentNotifications: true,
    followNotifications: false,
    weeklyDigest: true,
    
    // Appearance Settings
    theme: 'cosmic',
    language: 'en',
    timezone: 'UTC',
    
    // Blog Settings
    blogTitle: 'My Cosmic Journey',
    blogDescription: 'A personal blog about technology, creativity, and the cosmos',
    postsPerPage: 10,
    allowSubscriptions: true
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const SettingGroup = ({ title, children }) => (
    <Card className="setting-group mb-6">
      <Typography variant="h3" className="mb-4">
        {title}
      </Typography>
      <div className="space-y-4">
        {children}
      </div>
    </Card>
  );

  const ToggleSetting = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Typography variant="body1" className="font-medium force-black-text">
          {label}
        </Typography>
        {description && (
          <Typography variant="caption" className="force-black-text mt-1">
            {description}
          </Typography>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`toggle-switch ${checked ? 'toggle-switch--on' : 'toggle-switch--off'}`}
      >
        <span className={`toggle-switch__handle ${checked ? 'toggle-switch__handle--on' : 'toggle-switch__handle--off'}`} />
      </button>
    </div>
  );

  const InputSetting = ({ label, value, onChange, type = 'text', placeholder }) => (
    <div>
      <Typography variant="body1" className="font-medium force-black-text mb-2">
        {label}
      </Typography>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );

  const SelectSetting = ({ label, value, onChange, options }) => (
    <div>
      <Typography variant="body1" className="font-medium force-black-text mb-2">
        {label}
      </Typography>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select w-full"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const tabs = [
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    },
    { 
      id: 'privacy', 
      label: 'Privacy', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 5H4l5-5v5zM15 17h5l-5 5v-5z" />
      </svg>
    },
    { 
      id: 'appearance', 
      label: 'Appearance', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    },
    { 
      id: 'blog', 
      label: 'Blog Settings', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    }
  ];

  return (
    <>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <Typography variant="h1" className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </Typography>
          <Typography variant="body2" className="text-text-secondary">
            Customize your blogging experience
          </Typography>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Navigation */}
          <div className="lg:w-64">
            <Card className="settings-nav">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "primary" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className="w-full justify-start space-x-3"
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </Button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div>
                <SettingGroup title="Profile Information">
                  <InputSetting
                    label="Username"
                    value={settings.username}
                    onChange={(value) => handleSettingChange('profile', 'username', value)}
                    placeholder="Enter your username"
                  />
                  <InputSetting
                    label="Email"
                    value={settings.email}
                    onChange={(value) => handleSettingChange('profile', 'email', value)}
                    type="email"
                    placeholder="Enter your email"
                  />
                  <div>
                    <Typography variant="body1" className="font-medium force-black-text mb-2">
                      Bio
                    </Typography>
                    <textarea
                      value={settings.bio}
                      onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="form-textarea w-full"
                    />
                  </div>
                </SettingGroup>

                <SettingGroup title="Avatar">
                  <div className="flex items-center space-x-4">
                    <div className="avatar avatar--gradient-purple w-16 h-16 text-2xl">
                      {settings.username[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <Button variant="primary">
                        Upload New Avatar
                      </Button>
                      <Typography variant="caption" className="text-text-tertiary mt-1 block">
                        JPG, PNG or GIF (max 2MB)
                      </Typography>
                    </div>
                  </div>
                </SettingGroup>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <SettingGroup title="🔒 Privacy Settings">
                  <ToggleSetting
                    label="Public Profile"
                    description="Allow others to view your profile and posts"
                    checked={settings.profilePublic}
                    onChange={(value) => handleSettingChange('privacy', 'profilePublic', value)}
                  />
                  <ToggleSetting
                    label="Show Email"
                    description="Display your email address on your profile"
                    checked={settings.showEmail}
                    onChange={(value) => handleSettingChange('privacy', 'showEmail', value)}
                  />
                  <ToggleSetting
                    label="Allow Comments"
                    description="Let readers comment on your posts"
                    checked={settings.allowComments}
                    onChange={(value) => handleSettingChange('privacy', 'allowComments', value)}
                  />
                  <ToggleSetting
                    label="Moderate Comments"
                    description="Require approval before comments are published"
                    checked={settings.moderateComments}
                    onChange={(value) => handleSettingChange('privacy', 'moderateComments', value)}
                  />
                </SettingGroup>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <SettingGroup title="🔔 Email Notifications">
                  <ToggleSetting
                    label="Email Notifications"
                    description="Receive notifications via email"
                    checked={settings.emailNotifications}
                    onChange={(value) => handleSettingChange('notifications', 'emailNotifications', value)}
                  />
                  <ToggleSetting
                    label="Comment Notifications"
                    description="Get notified when someone comments on your posts"
                    checked={settings.commentNotifications}
                    onChange={(value) => handleSettingChange('notifications', 'commentNotifications', value)}
                  />
                  <ToggleSetting
                    label="Follow Notifications"
                    description="Get notified when someone follows you"
                    checked={settings.followNotifications}
                    onChange={(value) => handleSettingChange('notifications', 'followNotifications', value)}
                  />
                  <ToggleSetting
                    label="Weekly Digest"
                    description="Receive a weekly summary of your blog activity"
                    checked={settings.weeklyDigest}
                    onChange={(value) => handleSettingChange('notifications', 'weeklyDigest', value)}
                  />
                </SettingGroup>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <SettingGroup title="Appearance">
                  <SelectSetting
                    label="Theme"
                    value={settings.theme}
                    onChange={(value) => handleSettingChange('appearance', 'theme', value)}
                    options={[
                      { value: 'cosmic', label: 'Cosmic (Current)' },
                      { value: 'dark', label: 'Dark Mode' },
                      { value: 'light', label: 'Light Mode' },
                      { value: 'auto', label: 'Auto (System)' }
                    ]}
                  />
                  <SelectSetting
                    label="Language"
                    value={settings.language}
                    onChange={(value) => handleSettingChange('appearance', 'language', value)}
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Español' },
                      { value: 'fr', label: 'Français' },
                      { value: 'de', label: 'Deutsch' }
                    ]}
                  />
                  <SelectSetting
                    label="Timezone"
                    value={settings.timezone}
                    onChange={(value) => handleSettingChange('appearance', 'timezone', value)}
                    options={[
                      { value: 'UTC', label: 'UTC' },
                      { value: 'EST', label: 'Eastern Time' },
                      { value: 'PST', label: 'Pacific Time' },
                      { value: 'GMT', label: 'Greenwich Mean Time' }
                    ]}
                  />
                </SettingGroup>
              </div>
            )}

            {activeTab === 'blog' && (
              <div>
                <SettingGroup title="Blog Configuration">
                  <InputSetting
                    label="Blog Title"
                    value={settings.blogTitle}
                    onChange={(value) => handleSettingChange('blog', 'blogTitle', value)}
                    placeholder="Enter your blog title"
                  />
                  <div>
                    <Typography variant="body1" className="font-medium force-black-text mb-2">
                      Blog Description
                    </Typography>
                    <textarea
                      value={settings.blogDescription}
                      onChange={(e) => handleSettingChange('blog', 'blogDescription', e.target.value)}
                      placeholder="Describe your blog..."
                      rows={3}
                      className="form-textarea w-full"
                    />
                  </div>
                  <SelectSetting
                    label="Posts Per Page"
                    value={settings.postsPerPage}
                    onChange={(value) => handleSettingChange('blog', 'postsPerPage', parseInt(value))}
                    options={[
                      { value: 5, label: '5 posts' },
                      { value: 10, label: '10 posts' },
                      { value: 15, label: '15 posts' },
                      { value: 20, label: '20 posts' }
                    ]}
                  />
                  <ToggleSetting
                    label="Allow Subscriptions"
                    description="Let readers subscribe to your blog updates"
                    checked={settings.allowSubscriptions}
                    onChange={(value) => handleSettingChange('blog', 'allowSubscriptions', value)}
                  />
                </SettingGroup>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8">
              <Button variant="primary" size="large" className="save-settings-btn">
                <span className="mr-2">💾</span>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <NewPostModal onClose={() => setShowModal(false)} />}
    </>
  );
}
