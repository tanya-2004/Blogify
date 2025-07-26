// import { useState } from 'react';
// import { Button, Typography } from '../../components';

// export default function Comments() {
//   const [filter, setFilter] = useState('all');

//   const mockComments = [
//     {
//       id: 1,
//       author: 'CosmicReader123',
//       content: 'This is an amazing post! Really enjoyed the celestial theme and the way you explained the concepts.',
//       post: 'Getting Started with React Hooks',
//       date: '2024-01-15',
//       status: 'approved',
//       likes: 5,
//       replies: 2
//     },
//     {
//       id: 2,
//       author: 'StarGazer_42',
//       content: 'Could you elaborate more on the useEffect hook? I\'m still a bit confused about the dependency array.',
//       post: 'Advanced React Patterns',
//       date: '2024-01-14',
//       status: 'pending',
//       likes: 2,
//       replies: 0
//     },
//     {
//       id: 3,
//       author: 'DevMaster99',
//       content: 'Spam comment with lots of promotional content. Check out my website for amazing deals!',
//       post: 'CSS Grid vs Flexbox',
//       date: '2024-01-13',
//       status: 'spam',
//       likes: 0,
//       replies: 0
//     },
//     {
//       id: 4,
//       author: 'QuantumCoder',
//       content: 'Thank you for this tutorial! The examples were super clear and easy to follow.',
//       post: 'Building Modern UIs',
//       date: '2024-01-12',
//       status: 'approved',
//       likes: 8,
//       replies: 1
//     }
//   ];

//   const filteredComments = mockComments.filter(
//     comment => filter === 'all' || comment.status === filter
//   );

//   const handleApprove = id => console.log('Approved', id);
//   const handleReject = id => console.log('Rejected', id);
//   const handleDelete = id => console.log('Deleted', id);

//   const CommentCard = ({ comment }) => (
//     <div className="bg-white rounded-xl p-6 shadow-md transition hover:shadow-lg space-y-4">
//       <div className="flex justify-between items-start">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-semibold">
//             {comment.author[0]}
//           </div>
//           <div>
//             <Typography variant="body1" className="font-medium text-neutral-900">
//               {comment.author}
//             </Typography>
//             <Typography variant="caption" className="text-neutral-500 text-sm">
//               {new Date(comment.date).toLocaleDateString()}
//             </Typography>
//           </div>
//         </div>
//         <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${comment.status === 'approved' ? 'bg-green-100 text-green-700' :
//           comment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
//             'bg-red-100 text-red-600'
//           }`}>
//           {comment.status}
//         </span>
//       </div>

//       <Typography variant="body2" className="text-neutral-700">
//         {comment.content}
//       </Typography>

//       <div className="flex items-center gap-2 text-sm text-neutral-500">
//         <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6" />
//         </svg>
//         <span>On: <strong>{comment.post}</strong></span>
//       </div>

//       <div className="flex justify-between items-center pt-3 mt-3 border-t border-neutral-200 text-sm">
//         <div className="flex gap-4 text-neutral-500">
//           <span className="flex items-center gap-1">❤️ {comment.likes}</span>
//           {comment.replies > 0 && (
//             <span className="flex items-center gap-1">💬 {comment.replies}</span>
//           )}
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {comment.status === 'pending' && (
//             <>
//               <Button size="small" variant="primary" onClick={() => handleApprove(comment.id)}>Approve</Button>
//               <Button size="small" variant="secondary" onClick={() => handleReject(comment.id)}>Reject</Button>
//             </>
//           )}
//           <Button size="small" variant="secondary">Reply</Button>
//           <Button size="small" variant="danger" onClick={() => handleDelete(comment.id)}>Delete</Button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 bg-neutral-50 text-neutral-900">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-3 text-3xl font-bold">
//           <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8m-8 4h4m-6 4l-2 2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H8z" />
//           </svg>
//           Comments Manager
//         </div>
//         <p className="text-sm text-neutral-600 mt-1">Moderate and manage comments from your blog</p>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3">
//         {['all', 'pending', 'approved', 'spam'].map(status => (
//           <Button
//             key={status}
//             variant={filter === status ? 'primary' : 'secondary'}
//             onClick={() => setFilter(status)}
//             className="text-sm px-4 py-1.5"
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </Button>
//         ))}
//       </div>

//       {/* Stats */}
//       <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded-lg shadow-sm text-center">
//           <p className="text-lg font-semibold">{mockComments.length}</p>
//           <p className="text-sm text-neutral-500">Total</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm text-center">
//           <p className="text-lg font-semibold text-green-700">
//             {mockComments.filter(c => c.status === 'approved').length}
//           </p>
//           <p className="text-sm text-green-600">Approved</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm text-center">
//           <p className="text-lg font-semibold text-yellow-700">
//             {mockComments.filter(c => c.status === 'pending').length}
//           </p>
//           <p className="text-sm text-yellow-600">Pending</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm text-center">
//           <p className="text-lg font-semibold text-red-700">
//             {mockComments.filter(c => c.status === 'spam').length}
//           </p>
//           <p className="text-sm text-red-600">Spam</p>
//         </div>
//       </section>

//       {/* Comment List */}
//       <section className="space-y-6">
//         {filteredComments.length === 0 ? (
//           <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg bg-white">
//             <p className="text-lg font-semibold text-neutral-500">No comments</p>
//             <p className="text-sm text-neutral-400">Try a different filter or wait for new comments</p>
//           </div>
//         ) : (
//           filteredComments.map(comment => (
//             <CommentCard key={comment.id} comment={comment} />
//           ))
//         )}
//       </section>
//     </div>
//   );
// }

import React from 'react';
import Typography from '../../components/ui/Typography';
import { useComments } from '../../hooks/useComments';
import { CommentStats } from '../../components/CommentStats';
import { CommentFilter } from '../../components/CommentFilter';
import { CommentList } from '../../components/CommentList';

export default function Comments() {
  const {
    comments,
    filter,
    setFilter,
    loading,
    error,
    stats,
    handleApprove,
    handleReject,
    handleDelete
  } = useComments();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 bg-neutral-50 text-neutral-900">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 text-3xl font-bold">
          <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8m-8 4h4m-6 4l-2 2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H8z" />
          </svg>
          Comments Manager
        </div>
        <p className="text-sm text-neutral-600 mt-1">
          Moderate and manage comments from your blog
        </p>
      </div>

      {/* Filters */}
      <CommentFilter filter={filter} setFilter={setFilter} />

      {/* Stats */}
      <CommentStats stats={stats} />

      {/* Comment List */}
      {loading ? (
        <div className="text-center py-12">
          <Typography variant="body1" className="text-neutral-500">
            Loading comments...
          </Typography>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <Typography variant="body1" className="text-red-500">
            {error}
          </Typography>
        </div>
      ) : (
        <CommentList
          comments={comments}
          handlers={{ handleApprove, handleReject, handleDelete }}
        />
      )}
    </div>
  );
}