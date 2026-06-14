import { useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api';

export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await adminApi.upload(file);
      onChange(res.data.url);
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      {value && <img src={value} alt="" className="w-32 h-32 object-cover rounded-lg mb-2" />}
      <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="text-sm" />
      <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Or paste URL" className="mt-2 w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white text-sm" />
    </div>
  );
}
