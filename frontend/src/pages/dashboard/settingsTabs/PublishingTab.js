import React from 'react';

const PublishingTab = ({ settings, onChange, onSave }) => {
  return (
    <form className="space-y-4 p-4" onSubmit={(e) => {
      e.preventDefault();
      onSave();
    }}>
      <h2 className="text-xl font-semibold">Publishing Settings</h2>

      <label className="block">
        <span className="text-sm font-medium">Default Post Visibility</span>
        <select
          value={settings.defaultPostVisibility}
          onChange={(e) => onChange('publishing', 'defaultPostVisibility', e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="unlisted">Unlisted</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Default Category</span>
        <select
          value={settings.defaultCategory}
          onChange={(e) => onChange('publishing', 'defaultCategory', e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        >
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.enableAutoSave}
          onChange={(e) => onChange('publishing', 'enableAutoSave', e.target.checked)}
        />
        <span>Enable Auto-Save</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.requireAdminConsent || false}
          onChange={(e) => onChange('publishing', 'requireAdminConsent', e.target.checked)}
        />
        <span>Require admin approval for third-party publishing apps</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.enforceTls12 || false}
          onChange={(e) => onChange('publishing', 'enforceTls12', e.target.checked)}
        />
        <span>Enforce TLS 1.2+ for publishing endpoints</span>
      </label>

      <button type="submit" className="rounded bg-indigo-600 px-4 py-2 text-white">
        Save Publishing Defaults
      </button>
    </form>
  );
};

export default PublishingTab;