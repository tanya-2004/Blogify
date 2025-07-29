import React from 'react';

const AppearanceTab = ({ settings, onChange, onSave }) => {
  return (
    <form className="space-y-4 p-4" onSubmit={(e) => {
      e.preventDefault();
      onSave();
    }}>
      <h2 className="text-xl font-semibold">Appearance Settings</h2>

      <label className="block">
        <span className="text-sm font-medium">Theme</span>
        <select
          value={settings.theme}
          onChange={(e) => onChange('appearance', 'theme', e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        >
          <option value="cosmic">Cosmic</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.compactLayout}
          onChange={(e) => onChange('appearance', 'compactLayout', e.target.checked)}
        />
        <span>Use compact layout</span>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Language</span>
        <select
          value={settings.language}
          onChange={(e) => onChange('appearance', 'language', e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Timezone</span>
        <input
          type="text"
          value={settings.timezone}
          onChange={(e) => onChange('appearance', 'timezone', e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        />
      </label>

      <button type="submit" className="rounded bg-gray-800 px-4 py-2 text-white">
        Apply Theme
      </button>
    </form>
  );
};

export default AppearanceTab;