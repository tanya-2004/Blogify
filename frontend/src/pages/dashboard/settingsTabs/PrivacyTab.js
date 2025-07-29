import React from 'react';

const PrivacyTab = ({ settings, onChange, onSave }) => {
  return (
    <form className="space-y-4 p-4" onSubmit={(e) => {
      e.preventDefault();
      onSave();
    }}>
      <h2 className="text-xl font-semibold">Privacy Settings</h2>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.profilePublic}
          onChange={(e) => onChange('privacy', 'profilePublic', e.target.checked)}
        />
        <span>Make my profile public</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.screenCurtainEnabled || false}
          onChange={(e) => onChange('privacy', 'screenCurtainEnabled', e.target.checked)}
        />
        <span>Enable screen curtain for Narrator</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.recallReset || false}
          onChange={(e) => onChange('privacy', 'recallReset', e.target.checked)}
        />
        <span>Reset Windows Recall snapshots</span>
      </label>

      <button type="submit" className="rounded bg-green-600 px-4 py-2 text-white">
        Save Preferences
      </button>
    </form>
  );
};

export default PrivacyTab;