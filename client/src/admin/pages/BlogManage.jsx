import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { adminApi } from '../../api';
import DataTable from '../components/DataTable';
import AdminModal from '../components/AdminModal';
import { Input, Textarea } from '../components/FormField';
import ImageUpload from '../components/ImageUpload';

const empty = { title: '', excerpt: '', content: '', category: 'Technology', isPublished: false, metaTitle: '', metaDescription: '' };

export default function BlogManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => adminApi.blogs().then((res) => setItems(res.data.data || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (form._id) await adminApi.updateBlog(form._id, form);
      else await adminApi.createBlog(form);
      toast.success('Saved');
      setModal(false);
      load();
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button onClick={() => { setForm(empty); setModal(true); }} className="mb-4 px-4 py-2 gradient-bg text-white rounded-lg font-semibold">+ New Post</button>
      <DataTable
        loading={loading}
        data={items}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'isPublished', label: 'Status', render: (r) => r.isPublished ? 'Published' : 'Draft' },
        ]}
        onEdit={(row) => { setForm(row); setModal(true); }}
        onDelete={async (id) => { if (confirm('Delete?')) { await adminApi.deleteBlog(id); load(); } }}
      />
      {modal && (
        <AdminModal title={form._id ? 'Edit Post' : 'New Post'} onClose={() => setModal(false)} onSave={handleSave} saving={saving} wide>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Textarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <ImageUpload value={form.featuredImage} onChange={(url) => setForm({ ...form, featuredImage: url })} />
            <div>
              <label className="text-sm font-medium dark:text-gray-300">Content</label>
              <ReactQuill theme="snow" value={form.content || ''} onChange={(v) => setForm({ ...form, content: v })} className="bg-white mt-1" />
            </div>
            <Input label="Meta Title" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
            <Textarea label="Meta Description" value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
              <span className="text-sm dark:text-gray-300">Published</span>
            </label>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
