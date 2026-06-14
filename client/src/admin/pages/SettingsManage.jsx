import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api';
import { Input, Textarea } from '../components/FormField';
import ImageUpload from '../components/ImageUpload';

export default function SettingsManage() {
  const [settings, setSettings] = useState({});
  const [footer, setFooter] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([adminApi.settings(), adminApi.footer()])
      .then(([s, f]) => {
        setSettings(s.data.data || {});
        setFooter(f.data.data || {});
      })
      .catch(() => {});
  }, []);

  const saveSettings = async () => {
    setSaving(true);
    try {
      await adminApi.updateSettings(settings);
      await adminApi.updateFooter(footer);
      toast.success('Settings saved');
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow space-y-4">
        <h3 className="font-bold dark:text-white">Website Settings</h3>
        <Input label="Site Name" value={settings.siteName || ''} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
        <Input label="Tagline" value={settings.tagline || ''} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
        <Input label="Contact Email" value={settings.contactEmail || ''} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
        <Input label="Contact Phone" value={settings.contactPhone || ''} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} />
        <Textarea label="Address" value={settings.address || ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
        <ImageUpload label="Logo" value={settings.logo} onChange={(url) => setSettings({ ...settings, logo: url })} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow space-y-4">
        <h3 className="font-bold dark:text-white">Footer</h3>
        <Textarea label="Company Description" value={footer.companyDescription || ''} onChange={(e) => setFooter({ ...footer, companyDescription: e.target.value })} />
        <Input label="Copyright" value={footer.copyright || ''} onChange={(e) => setFooter({ ...footer, copyright: e.target.value })} />
      </div>
      <button onClick={saveSettings} disabled={saving} className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold">
        {saving ? 'Saving...' : 'Save All Settings'}
      </button>
    </div>
  );
}
