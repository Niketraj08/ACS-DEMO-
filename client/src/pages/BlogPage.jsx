import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { publicApi } from '../api';
import SEO from '../components/ui/SEO';
import SectionTitle from '../components/ui/SectionTitle';
import { formatDate, getImageUrl, truncate } from '../utils/helpers';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    publicApi.blogs().then((res) => setBlogs(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <>
      <SEO title="Blog" description="Tech insights, tutorials, and industry news from Astra Cognix." />
      <div className="pt-28 pb-8 gradient-bg">
        <div className="container-custom text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Insights and updates from our technology experts.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700 group"
              >
                <div className="h-48 bg-gradient-to-br from-primary-600 to-primary-900">
                  {blog.featuredImage && <img src={getImageUrl(blog.featuredImage)} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary-600 uppercase">{blog.category}</span>
                  <h2 className="font-display font-bold text-lg mt-2 mb-2 text-gray-900 dark:text-white">
                    <Link to={`/blog/${blog.slug}`} className="hover:text-primary-600 transition-colors">{blog.title}</Link>
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{truncate(blog.excerpt, 100)}</p>
                  <p className="text-xs text-gray-400">{formatDate(blog.createdAt)}</p>
                </div>
              </motion.article>
            ))}
          </div>
          {!blogs.length && <p className="text-center text-gray-500 mt-8">No blog posts yet.</p>}
        </div>
      </section>
    </>
  );
}
