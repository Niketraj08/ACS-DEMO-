import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { publicApi } from '../api';
import SEO from '../components/ui/SEO';
import { formatDate, getImageUrl } from '../utils/helpers';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    publicApi.blog(slug).then((res) => setBlog(res.data.data)).catch(() => {});
  }, [slug]);

  if (!blog) return <div className="pt-32 text-center py-20">Loading...</div>;

  return (
    <>
      <SEO title={blog.metaTitle || blog.title} description={blog.metaDescription || blog.excerpt} />
      <article className="pt-28">
        {blog.featuredImage && (
          <div className="h-64 md:h-96 overflow-hidden">
            <img src={getImageUrl(blog.featuredImage)} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="container-custom max-w-3xl py-12">
          <Link to="/blog" className="text-primary-600 text-sm font-medium mb-4 inline-block">← Back to Blog</Link>
          <span className="text-sm font-semibold text-primary-600 uppercase">{blog.category}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">{blog.title}</h1>
          <p className="text-gray-500 text-sm mb-8">{formatDate(blog.publishedAt || blog.createdAt)} • {blog.author?.name || 'Astra Cognix'}</p>
          <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content || '' }} />
        </div>
      </article>
    </>
  );
}
