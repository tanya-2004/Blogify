import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './Card';
import Typography from './Typography';
import Button from './Button';

const BlogCard = ({ post }) => {
  if (!post) return null;

  const readTime = Math.ceil(post.content?.length / 250) || 1;
  const excerpt = post.content ? post.content.slice(0, 160) + '...' : '';
  const publishDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card
      variant="glass"
      className="blog-card group"
      role="article"
      aria-labelledby={`blog-card-title-${post._id}`}
    >
      {/* Featured Image Section */}
      <div className="blog-card__image-container">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <img
              src="/fallback.jpg"
              alt="Default blog illustration"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full border border-white/20 shadow-lg">
              {post.category || 'Article'}
            </span>
          </div>

          {/* Read Time Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm font-medium rounded-full">
              {readTime} min read
            </span>
          </div>
        </div>
      </div>

      <Card.Body>
        {/* Author & Meta Information */}
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
              <Typography variant="caption" weight="medium" className="text-gray-900">
                {post.author?.username || 'Anonymous'}
              </Typography>
              <Typography variant="caption" color="muted" className="text-xs">
                Author
              </Typography>
            </div>
          </div>

          <time
            dateTime={post.createdAt}
            className="text-gray-500 text-sm font-light"
            title={`Published on ${publishDate}`}
          >
            {publishDate}
          </time>
        </div>

        {/* Title */}
        <Typography
          id={`blog-card-title-${post._id}`}
          variant="heading"
          weight="bold"
          className="text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300"
        >
          <Link
            to={`/post/${post._id}`}
            className="hover:underline decoration-2 underline-offset-4"
            aria-describedby={`blog-card-excerpt-${post._id}`}
          >
            {post.title}
          </Link>
        </Typography>

        {/* Excerpt */}
        <Typography
          id={`blog-card-excerpt-${post._id}`}
          variant="body"
          color="muted"
          className="leading-relaxed mb-4 line-clamp-3 text-sm"
        >
          {excerpt}
        </Typography>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Post tags">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                role="listitem"
                className="px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 rounded-full text-xs border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer font-medium"
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

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            size="small"
            as={Link}
            to={`/post/${post._id}`}
            rightIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Read More
          </Button>

          <div className="flex items-center space-x-4 text-gray-400">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm font-light">—</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-light">—</span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string
    }),
    createdAt: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default BlogCard;