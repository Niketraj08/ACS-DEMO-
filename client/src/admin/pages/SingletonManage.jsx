import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SingletonManage({ title, fetchFn, updateFn }) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFn().then((res) => setForm(res.data.data || {})).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFn(form);
      toast.success(`${title} updated`);
    } catch {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <label className="text-sm font-medium dark:text-gray-300">Edit JSON Data</label>
        <textarea
          rows={20}
          className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white font-mono text-sm"
          value={JSON.stringify(form, null, 2)}
          onChange={(e) => {
            try { setForm(JSON.parse(e.target.value)); } catch { /* ignore parse errors while typing */ }
          }}
        />
        <button onClick={handleSave} disabled={saving} className="mt-4 px-6 py-2 gradient-bg text-white rounded-lg font-semibold">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
