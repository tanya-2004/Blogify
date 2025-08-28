import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import NewPostModal from '../../components/modals/NewPostModal';
import { showSuccess, showError, showLoading, dismissToast } from '../../utils/toast';
import API from '../../utils/axios';
import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/ThemeContext';

import {
  ProfileTab,
  PrivacyTab,
  NotificationsTab,
  AppearanceTab,
  PublishingTab
} from './settingsTabs';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'publishing', label: 'Publishing' }
];

export default function Settings() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState(null);
  const { loadUser } = useUser();
  const { colors, mode } = useTheme();

  const {
    text,
    textLight,
    accent,
    background,
    borderLight,
    primary
  } = colors;

  const tabFromQuery = searchParams.get('tab');
  const activeTab = tabs.some(t => t.id === tabFromQuery) ? tabFromQuery : 'profile';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/me');
        setSettings(res.data.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        showError('Unable to load user settings');
      }
    };

    fetchUser();
  }, []);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    const toastId = showLoading('Saving settings...');
    try {
      const res = await API.patch('/auth/settings', settings);
      const updatedUser = res.data?.user;

      if (!updatedUser) {
        dismissToast(toastId);
        showError('No updated user returned');
        return;
      }

      setSettings(updatedUser);
      await loadUser();

      dismissToast(toastId);
      showSuccess('Settings saved!');
    } catch (err) {
      dismissToast(toastId);
      console.error('[Settings Save Error]', err);
      showError('Failed to save settings');
    }
  };

  if (!settings) {
    return (
      <div
        className="p-6 text-center"
        style={{ color: textLight, backgroundColor: background }}
        data-theme={mode}
      >
        Loading settings...
      </div>
    );
  }

  return (
    <>
      <div
        className="dashboard-container"
        style={{ backgroundColor: background }}
        data-theme={mode}
      >
        <header className="dashboard-header">
          <Typography variant="h1" className="flex items-center space-x-3" style={{ color: text }}>
            <svg className="w-8 h-8" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </Typography>
          <Typography variant="body2" style={{ color: textLight }}>
            Customize your blogging experience
          </Typography>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <Card className="settings-nav" style={{ borderColor: borderLight }}>
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'primary' : 'ghost'}
                    onClick={() => navigate(`/settings?tab=${tab.id}`)}
                    className="w-full justify-start"
                    style={activeTab === tab.id ? { backgroundColor: primary, color: '#fff' } : { color: text }}
                  >
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </Card>
          </aside>

          <main className="flex-1">
            {activeTab === 'profile' && (
              <ProfileTab settings={settings} onChange={handleSettingChange} onSave={handleSaveSettings} />
            )}
            {activeTab === 'privacy' && (
              <PrivacyTab settings={settings} onChange={handleSettingChange} onSave={handleSaveSettings} />
            )}
            {activeTab === 'notifications' && (
              <NotificationsTab settings={settings} onChange={handleSettingChange} onSave={handleSaveSettings} />
            )}
            {activeTab === 'appearance' && (
              <AppearanceTab settings={settings} onChange={handleSettingChange} onSave={handleSaveSettings} />
            )}
            {activeTab === 'publishing' && (
              <PublishingTab settings={settings} onChange={handleSettingChange} onSave={handleSaveSettings} />
            )}
          </main>
        </div>
      </div>

      {showModal && (
        <NewPostModal
          onClose={() => setShowModal(false)}
          onPostCreated={() => {
            setShowModal(false);
            showSuccess('Post published!');
          }}
        />
      )}

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}