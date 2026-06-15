import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api';
import { Input, Textarea } from '../components/FormField';

export default function AboutManage() {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
// Fetch the current about section data when the component mounts
  useEffect(() => {
    adminApi.about().then((res) => setForm(res.data.data || {})).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateAbout(form);
      toast.success('About section updated');
    } catch {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div className="max-w-3xl space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow space-y-4">
        <Input label="Title" value={form.title || ''} onChange={(e) => set('title', e.target.value)} />
        <Textarea label="Content" rows={4} value={form.content || ''} onChange={(e) => set('content', e.target.value)} />
        <Textarea label="Mission" rows={3} value={form.mission || ''} onChange={(e) => set('mission', e.target.value)} />
        <Textarea label="Vision" rows={3} value={form.vision || ''} onChange={(e) => set('vision', e.target.value)} />
        <div>
          <label className="text-sm font-medium dark:text-gray-300">Statistics (JSON)</label>
          <textarea
            rows={6}
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white font-mono text-sm"
            value={JSON.stringify(form.statistics || [], null, 2)}
            onChange={(e) => {
              try { set('statistics', JSON.parse(e.target.value)); } catch { /* ignore */ }
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-gray-300">Core Values (JSON)</label>
          <textarea
            rows={8}
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white font-mono text-sm"
            value={JSON.stringify(form.coreValues || [], null, 2)}
            onChange={(e) => {
              try { set('coreValues', JSON.parse(e.target.value)); } catch { /* ignore */ }
            }}
          />
        </div>
        <button onClick={handleSave} disabled={saving} className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
