import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api';
import DataTable from '../components/DataTable';
import AdminModal from '../components/AdminModal';

export default function ContactsManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    adminApi.contacts().then((res) => setItems(res.data.data || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (status) => {
    await adminApi.updateContact(selected._id, { status, adminNotes: selected.adminNotes });
    toast.success('Updated');
    setSelected(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete inquiry?')) return;
    await adminApi.deleteContact(id);
    toast.success('Deleted');
    load();
  };

  return (
    <div>
      <DataTable
        loading={loading}
        data={items}
        columns={[
          { key: 'fullName', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'serviceRequirement', label: 'Service' },
          { key: 'status', label: 'Status', render: (r) => (
            <span className={`px-2 py-1 rounded-full text-xs ${r.status === 'new' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'}`}>{r.status}</span>
          )},
          { key: 'createdAt', label: 'Date', render: (r) => new Date(r.createdAt).toLocaleDateString() },
        ]}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
      {selected && (
        <AdminModal title="Inquiry Details" onClose={() => setSelected(null)}>
          <div className="space-y-3 text-sm dark:text-gray-300">
            <p><strong>Name:</strong> {selected.fullName}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>Company:</strong> {selected.companyName}</p>
            <p><strong>Service:</strong> {selected.serviceRequirement}</p>
            <p><strong>Message:</strong> {selected.message}</p>
            <div className="flex gap-2 pt-4">
              {['read', 'replied', 'closed'].map((s) => (
                <button key={s} onClick={() => updateStatus(s)} className="px-3 py-1 bg-primary-600 text-white rounded-lg text-xs capitalize">{s}</button>
              ))}
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
