import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api';
import DataTable from '../components/DataTable';
import AdminModal from '../components/AdminModal';
import { Input, Textarea } from '../components/FormField';
import ImageUpload from '../components/ImageUpload';

const empty = { title: '', shortDescription: '', description: '', icon: 'FaCode', order: 0, isActive: true };

export default function ServicesManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminApi.services().then((res) => setItems(res.data.data || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (form._id) await adminApi.updateService(form._id, form);
      else await adminApi.createService(form);
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
    if (!confirm('Delete this service?')) return;
    await adminApi.deleteService(id);
    toast.success('Deleted');
    load();
  };

  return (
    <div>
      <button onClick={() => { setForm(empty); setModal(true); }} className="mb-4 px-4 py-2 gradient-bg text-white rounded-lg font-semibold">+ Add Service</button>
      <DataTable
        loading={loading}
        data={items}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'order', label: 'Order' },
          { key: 'isActive', label: 'Active', render: (r) => r.isActive ? 'Yes' : 'No' },
        ]}
        onEdit={(row) => { setForm(row); setModal(true); }}
        onDelete={handleDelete}
      />
      {modal && (
        <AdminModal title={form._id ? 'Edit Service' : 'Add Service'} onClose={() => setModal(false)} onSave={handleSave} saving={saving} wide>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input label="Icon (react-icons name)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            <Input label="Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} />
            <Textarea label="Short Description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            <Textarea label="Full Description" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
          </div>
        </AdminModal>
      )}
    </div>
  );
}
