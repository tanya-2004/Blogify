import React from 'react';

const ProfileTab = ({ settings, onChange, onSave }) => {
  return (
    <form className="space-y-4 p-4" onSubmit={(e) => {
      e.preventDefault();
      onSave();
    }}>
      <h2 className="text-xl font-semibold">Profile Settings</h2>

      <label className="block">
        <span className="text-sm font-medium">Display Name</span>
        <input
          type="text"
          value={settings.username}
          onChange={(e) => onChange('profile', 'username', e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Bio</span>
        <textarea
          value={settings.bio}
          onChange={(e) => onChange('profile', 'bio', e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Passkey Provider</span>
        <select
          value={settings.passkeyProvider || ''}
          onChange={(e) => onChange('profile', 'passkeyProvider', e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        >
          <option value="">None</option>
          <option value="windows">Windows Hello</option>
          <option value="1password">1Password</option>
          <option value="google">Google Password Manager</option>
        </select>
      </label>

      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        Save Changes
      </button>
    </form>
  );
};

export default ProfileTab;