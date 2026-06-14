import { HiX } from 'react-icons/hi';

export default function AdminModal({ title, children, onClose, onSave, saving, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} my-8`}>
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <HiX className="w-5 h-5 dark:text-white" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
        {onSave && (
          <div className="p-6 border-t dark:border-gray-700 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg dark:text-white">Cancel</button>
            <button onClick={onSave} disabled={saving} className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// This component is a reusable modal dialog for admin interfaces. It accepts props for the title, content, and actions. The modal is styled with Tailwind CSS and includes a close button and an optional save button. The `wide` prop allows for a wider modal when needed.