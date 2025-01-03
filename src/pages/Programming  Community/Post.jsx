import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { useComments } from "./hooks/useCommentAPi";
import { Comment } from "./Comment";

export const Post = ({ post, onDelete, onUpdate }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({
    title: post.title,
    description: post.description,
    code: post.code,
    tags: post.tags,
    language: post.language || "", // Handle language as part of the post object
  });

  const {
    comments,
    newComment,
    setNewComment,
    fetchComments,
    handleAddComment,
    handleVote,
    deleteComment,
    updateComment,
  } = useComments(post._id);

  const { user } = useContext(AuthContext);
  const author = user?.email;
  const isAuthor = user?.email === post.author;

  // Toggle comment visibility and fetch comments if not already visible
  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  // Fetch comments whenever the component mounts or when commentsVisible changes
  useEffect(() => {
    if (commentsVisible) {
      fetchComments();
    }
  }, [commentsVisible, fetchComments]);

  // Handle updating post
  const handleUpdate = () => {
    onUpdate(post._id, { ...updatedPost, author });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {isEditing ? (
        <div className="space-y-4">
          <input
            value={updatedPost.title}
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, title: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Edit title"
          />
          <textarea
            value={updatedPost.description}
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Edit description"
          />
          <textarea
            value={updatedPost.code}
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, code: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Edit code"
          />
          <input
            value={updatedPost.language}
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, language: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Code language (e.g., JavaScript)"
          />
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 text-white rounded-md">
            Save
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-gray-600 text-sm mt-1">
            Posted by {post.author} •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700 mt-4">{post.description}</p>

          {/* Tags Section */}
          <div className="mt-4">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap space-x-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Code Language Label */}
          {post.language && (
            <div className="mt-2">
              <span className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full text-sm">
                Language: {post.language}
              </span>
            </div>
          )}

          {/* Code Section */}
          {post.code && (
            <div className="mt-6 bg-gray-800 text-white p-4 rounded-md">
              <pre className="whitespace-pre-wrap break-words">{post.code}</pre>
            </div>
          )}
        </>
      )}

      {isAuthor && (
        <div className="mt-4 flex space-x-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => onDelete(post._id)}>
            Delete
          </button>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={toggleComments}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md">
          {commentsVisible ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {commentsVisible && (
        <div className="mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddComment({ author, text: newComment });
            }}
            className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Add your comment..."
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                userEmail={author}
                onVote={handleVote}
                onDelete={deleteComment}
                onUpdate={updateComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
