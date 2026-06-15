import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaEnvelope, FaBlog, FaCogs, FaBriefcase, FaUsers } from 'react-icons/fa';
import { adminApi } from '../../api';
// Define the configuration for the statistic cards displayed on the dashboard
const statCards = [
  { key: 'contacts', label: 'Total Inquiries', icon: FaEnvelope, color: 'bg-blue-500', link: '/admin/contacts' },
  { key: 'newContacts', label: 'New Inquiries', icon: FaEnvelope, color: 'bg-orange-500', link: '/admin/contacts' },
  { key: 'blogs', label: 'Blog Posts', icon: FaBlog, color: 'bg-green-500', link: '/admin/blogs' },
  { key: 'services', label: 'Services', icon: FaCogs, color: 'bg-purple-500', link: '/admin/services' },
  { key: 'projects', label: 'Projects', icon: FaBriefcase, color: 'bg-cyan-500', link: '/admin/portfolio' },
  { key: 'subscribers', label: 'Subscribers', icon: FaUsers, color: 'bg-pink-500', link: '/admin/settings' },
];
// The Dashboard component displays an overview of key metrics and recent activity for the admin users. It fetches dashboard data from the server when it mounts and displays statistic cards for total inquiries, new inquiries, blog posts, services, projects, and subscribers. It also includes a bar chart showing monthly inquiries and a list of recent inquiries with their status.
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.dashboard()
      .then((res) => setData(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />;

  const stats = data?.stats || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map(({ key, label, icon: Icon, color, link }) => (
          <Link key={key} to={link} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition-shadow">
            <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats[key] || 0}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Monthly Inquiries</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data?.monthlyContacts || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Inquiries</h3>
          <div className="space-y-3">
            {(data?.recentContacts || []).map((c) => (
              <div key={c._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div>
                  <p className="font-medium text-sm dark:text-white">{c.fullName}</p>
                  <p className="text-xs text-gray-500">{c.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'new' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                  {c.status}
                </span>
              </div>
            ))}
            {!data?.recentContacts?.length && <p className="text-gray-500 text-sm">No inquiries yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
