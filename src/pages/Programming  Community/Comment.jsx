import React, { useState } from "react";

export const Comment = ({ comment, onVote, onDelete, onUpdate, userEmail }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(comment.text);

  const hasLiked =
    Array.isArray(comment.likes) && comment.likes.includes(userEmail);
  const hasDisliked =
    Array.isArray(comment.dislikes) && comment.dislikes.includes(userEmail);
  const likesCount = Array.isArray(comment.likes) ? comment.likes.length : 0;
  const dislikesCount = Array.isArray(comment.dislikes)
    ? comment.dislikes.length
    : 0;

  const handleUpdate = () => {
    onUpdate(comment._id, updatedText);
    setIsEditing(false);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-6 p-6">
      {isEditing ? (
        <div className="space-y-6">
          <textarea
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className="w-full min-h-24 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Edit your comment..."
          />
          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Author and Date */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-800">
                {comment.author}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(comment.createdAt)}
              </p>
            </div>
            {userEmail === comment.author && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-500 hover:text-yellow-600 focus:outline-none transition duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(comment._id)}
                  className="text-gray-500 hover:text-red-600 focus:outline-none transition duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Comment Text */}
          <p className="text-gray-800 text-sm leading-relaxed">
            {comment.text}
          </p>

          {/* Like/Dislike Buttons */}
          <div className="flex items-center space-x-6 pt-4">
            <button
              onClick={() => onVote(comment._id, "like", userEmail)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md ${
                hasLiked ? "text-green-600" : "text-gray-500"
              } hover:bg-gray-100 transition duration-200`}>
              <svg
                className="w-5 h-5"
                fill={hasLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span className="text-sm">{likesCount}</span>
            </button>
            <button
              onClick={() => onVote(comment._id, "dislike", userEmail)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md ${
                hasDisliked ? "text-red-600" : "text-gray-500"
              } hover:bg-gray-100 transition duration-200`}>
              <svg
                className="w-5 h-5"
                fill={hasDisliked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5 0v2a2 2 0 01-2 2h-2.5"
                />
              </svg>
              <span className="text-sm">{dislikesCount}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
