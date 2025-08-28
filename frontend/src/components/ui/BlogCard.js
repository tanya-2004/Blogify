import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Typography from './Typography';
import Button from './Button';
import { postStatsSummary } from '../../utils/postStats';

const BlogCard = ({ post, mode = 'public', onEdit, onDelete, onLike }) => {
  if (!post) return null;

  const readTime = Math.ceil((post.content?.length || 0) / 250);
  const excerpt = post.content ? post.content.slice(0, 160) + '...' : '';
  const publishDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    : 'Unknown';

  const formattedStats = postStatsSummary([post]);

  return (
    <Card
      variant={mode === 'dashboard' ? 'soft' : 'glass'}
      className={`blog-card group ${mode === 'dashboard' ? 'shadow-md border bg-white' : ''}`}
      role="article"
      aria-labelledby={`blog-card-title-${post._id}`}
    >
      {/* 🖼️ Featured Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <img
          src={post.imageUrl || '/fallback.jpg'}
          alt={post.title || 'Blog preview'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.target.src = '/fallback.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/95 text-gray-700 text-sm font-medium rounded-full shadow-lg">
            {post.category || 'Article'}
          </span>
        </div>
        {mode !== 'dashboard' && (
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-black/60 text-white text-sm font-medium rounded-full">
              {readTime} min read
            </span>
          </div>
        )}
      </div>

      <Card.Body>
        {/* 👤 Author + Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-semibold">
                  {(post.author?.username || 'A')[0].toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <Typography variant="caption" weight="medium">
                {post.author?.username || 'Anonymous'}
              </Typography>
              <Typography variant="caption" color="muted" className="text-xs">
                Author
              </Typography>
            </div>
          </div>
          <time dateTime={post.createdAt} className="text-gray-500 text-sm">
            {publishDate}
          </time>
        </div>

        {/* 📝 Title */}
        <Typography
          id={`blog-card-title-${post._id}`}
          variant="heading"
          weight="bold"
          className="mb-3 line-clamp-2"
        >
          <Link to={`/post/${post._id}`} className="hover:underline">
            {post.title}
          </Link>
        </Typography>

        {/* 🧾 Excerpt */}
        <Typography
          id={`blog-card-excerpt-${post._id}`}
          variant="body"
          color="muted"
          className="mb-4 line-clamp-3 text-sm"
        >
          {excerpt}
        </Typography>

        {/* 🏷 Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Post tags">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                role="listitem"
                className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs border border-gray-200 hover:shadow-sm"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-3 py-1 text-gray-400 text-xs font-light">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* 🎛 Actions + Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-4">
            {mode === 'dashboard' && (
              <>
                <Button variant="ghost" size="small" onClick={() => onEdit(post._id)}>
                  Edit
                </Button>
                <Button variant="ghost" size="small" color="danger" onClick={() => onDelete(post._id)}>
                  Delete
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="small"
              onClick={() => onLike(post._id)}
              aria-label="Like this post"
              className="text-accent-primary hover:opacity-80 transition-colors duration-200"
            >
              ❤️ {(typeof post.likes === 'number' ? post.likes : 0).toLocaleString()}
            </Button>
          </div>

          {/* 📊 Summary Stats */}
          <p className="text-sm text-gray-500 font-medium">{formattedStats}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;