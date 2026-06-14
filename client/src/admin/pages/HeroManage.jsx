import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api';
import { Input, Textarea } from '../components/FormField';

export default function HeroManage() {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.hero().then((res) => setForm(res.data.data || {})).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateHero(form);
      toast.success('Hero updated');
    } catch {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow space-y-4">
        <Input label="Headline" value={form.headline || ''} onChange={(e) => set('headline', e.target.value)} />
        <Textarea label="Subheadline" rows={3} value={form.subheadline || ''} onChange={(e) => set('subheadline', e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Primary CTA" value={form.primaryCta || ''} onChange={(e) => set('primaryCta', e.target.value)} />
          <Input label="Secondary CTA" value={form.secondaryCta || ''} onChange={(e) => set('secondaryCta', e.target.value)} />
        </div>
        <button onClick={handleSave} disabled={saving} className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
