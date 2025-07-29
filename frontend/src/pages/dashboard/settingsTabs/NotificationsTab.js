import React from 'react';

const NotificationsTab = ({ settings, onChange, onSave }) => {
  return (
    <form className="space-y-4 p-4" onSubmit={(e) => {
      e.preventDefault();
      onSave();
    }}>
      <h2 className="text-xl font-semibold">Notification Settings</h2>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.emailNotifications}
          onChange={(e) => onChange('notifications', 'emailNotifications', e.target.checked)}
        />
        <span>Email Notifications</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.commentNotifications}
          onChange={(e) => onChange('notifications', 'commentNotifications', e.target.checked)}
        />
        <span>Replies to Comments</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.weeklyDigest}
          onChange={(e) => onChange('notifications', 'weeklyDigest', e.target.checked)}
        />
        <span>Weekly Digest Emails</span>
      </label>

      <button type="submit" className="rounded bg-purple-600 px-4 py-2 text-white">
        Save Settings
      </button>
    </form>
  );
};

export default NotificationsTab;