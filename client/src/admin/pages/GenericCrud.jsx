import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from '../components/DataTable';
import AdminModal from '../components/AdminModal';
import { Input, Textarea } from '../components/FormField';
import ImageUpload from '../components/ImageUpload';
// This is a generic CRUD component that can be reused for managing different types of data in the admin panel. It takes in props for the title, API methods, form fields, and table columns. It handles fetching the list of items, displaying them in a table, and providing a modal form for creating and editing items. The component also includes functionality for deleting items and shows toast notifications for actions taken.
export default function GenericCrud({ title, api, fields, emptyItem, columns }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyItem);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.list();
      setItems(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (form._id) await api.update(form._id, form);
      else await api.create(form);
      toast.success('Saved');
      setModal(false);
      load();
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    await api.remove(id);
    toast.success('Deleted');
    load();
  };

  const renderField = (field) => {
    const val = form[field.name] ?? '';
    const onChange = (v) => setForm({ ...form, [field.name]: v });

    if (field.type === 'textarea') return <Textarea key={field.name} label={field.label} rows={field.rows || 3} value={val} onChange={(e) => onChange(e.target.value)} />;
    if (field.type === 'image') return <ImageUpload key={field.name} label={field.label} value={val} onChange={onChange} />;
    if (field.type === 'checkbox') return (
      <label key={field.name} className="flex items-center gap-2">
        <input type="checkbox" checked={!!val} onChange={(e) => onChange(e.target.checked)} />
        <span className="text-sm dark:text-gray-300">{field.label}</span>
      </label>
    );
    if (field.type === 'number') return <Input key={field.name} label={field.label} type="number" value={val} onChange={(e) => onChange(+e.target.value)} />;
    if (field.type === 'select') return (
      <div key={field.name}>
        <label className="text-sm font-medium dark:text-gray-300">{field.label}</label>
        <select value={val} onChange={(e) => onChange(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white">
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
    return <Input key={field.name} label={field.label} value={val} onChange={(e) => onChange(e.target.value)} />;
  };

  return (
    <div>
      <button onClick={() => { setForm(emptyItem); setModal(true); }} className="mb-4 px-4 py-2 gradient-bg text-white rounded-lg font-semibold">+ Add {title}</button>
      <DataTable loading={loading} data={items} columns={columns} onEdit={(row) => { setForm(row); setModal(true); }} onDelete={handleDelete} />
      {modal && (
        <AdminModal title={form._id ? `Edit ${title}` : `Add ${title}`} onClose={() => setModal(false)} onSave={handleSave} saving={saving} wide>
          <div className="space-y-4">{fields.map(renderField)}</div>
        </AdminModal>
      )}
    </div>
  );
}
