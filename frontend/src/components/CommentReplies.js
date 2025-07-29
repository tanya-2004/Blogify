const CommentReplies = ({ replies }) => (
  <div className="mt-4 space-y-3 text-sm text-neutral-700">
    {replies.map((r, i) => (
      <div key={i} className="border-l-2 pl-3">
        <p><strong>{r.author}</strong> • {new Date(r.date).toLocaleString()}</p>
        <p>{r.content}</p>
      </div>
    ))}
  </div>
);

export default CommentReplies;