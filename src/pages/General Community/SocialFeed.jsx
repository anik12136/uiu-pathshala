import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import {
  Trash2,
  Send,
  Heart,
  MessageCircle,
} from "lucide-react";
import {
  fetchPosts,
  handleLikePost as apiHandleLikePost,
  handleDeletePost as apiHandleDeletePost,
  handleNewPost as apiHandleNewPost,
  handleComment as apiHandleComment,
  handleDeleteComment as apiHandleDeleteComment,
} from "./APicall";
import { Card, Textarea, Avatar, Button, formatEmail } from "./UI/UI";
import { formatDistanceToNow } from "date-fns";

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loadingComment, setLoadingComment] = useState(false);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  useEffect(() => {
    const loadPosts = async () => {
      const { posts, comments } = await fetchPosts();
      setPosts(posts);
      setComments(comments);
    };
    loadPosts();
  }, []);

  const handleNewPost = async () => {
    if (!newPost.trim() || !newPostTitle.trim()) return;

    try {
      await apiHandleNewPost(newPostTitle, newPost, email);
      setNewPost("");
      setNewPostTitle("");
      const { posts, comments } = await fetchPosts();
      setPosts(posts);
      setComments(comments);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLikePost = async (postId) => {
    await apiHandleLikePost(postId, email);
    const { posts, comments } = await fetchPosts();
    setPosts(posts);
    setComments(comments);
  };

  const handleDeletePost = async (postId) => {
    await apiHandleDeletePost(postId);
    const { posts, comments } = await fetchPosts();
    setPosts(posts);
    setComments(comments);
  };

  const handleComment = async (postId, content) => {
    if (!content.trim()) return;
    setLoadingComment(true);
    await apiHandleComment(postId, content, email);
    setNewComment((prev) => ({
      ...prev,
      [postId]: "", // Clear the comment input after sending
    }));
    const { posts, comments } = await fetchPosts();
    setPosts(posts);
    setComments(comments);
    setLoadingComment(false); // Stop loading
  };

  const handleDeleteComment = async (commentId) => {
    await apiHandleDeleteComment(commentId);
    const { posts, comments } = await fetchPosts();
    setPosts(posts);
    setComments(comments);
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-semibold text-center text-blue-700">
          Welcome to the General Community!
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Share your thoughts, ideas, and engage with others!
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 p-4">
          <Avatar email={email} className="w-10 h-10" />
          <div className="flex-1">
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Post title"
              className="w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
            />
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="mb-3"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="p-2 hover:bg-gray-100 rounded-full"></Button>
              </div>
              <Button
                onClick={handleNewPost}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2">
                <Send size={16} />
                Post
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {posts.map((post) => (
        <Card key={post._id}>
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar email={post.email} className="w-10 h-10" />
              <div>
                <h3 className="font-semibold">{formatEmail(post.email)}</h3>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {email === post.email && (
                <Button
                  variant="ghost"
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  onClick={() => handleDeletePost(post._id)}>
                  <Trash2 size={20} />
                </Button>
              )}
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-xl font-bold mb-3">{post.title}</h2>
            <p className="whitespace-pre-line text-gray-700">{post.content}</p>
          </div>

          <div className="flex items-center gap-6 px-4 py-3 border-t border-b">
            <button
              onClick={() => handleLikePost(post._id)}
              className={`flex items-center gap-2 ${
                post.likes?.includes(email)
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }`}>
              <Heart
                size={20}
                fill={post.likes?.includes(email) ? "currentColor" : "none"}
              />
              <span className="text-sm font-medium">
                {post.likes?.length || 0}
              </span>
            </button>
            <button
              onClick={() => toggleComments(post._id)}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle size={20} />
              <span className="text-sm font-medium">
                {comments[post._id]?.length || 0}
              </span>
            </button>
          </div>

          {showComments[post._id] && (
            <div className="p-4 bg-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Avatar email={email} className="w-8 h-8" />
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment[post._id] || ""}
                  onChange={(e) =>
                    setNewComment({ ...newComment, [post._id]: e.target.value })
                  }
                />
              </div>

              {/* Send button for posting the comment */}
              <Button
                onClick={() => handleComment(post._id, newComment[post._id])}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                disabled={loadingComment}>
                {loadingComment ? "Sending..." : "Send"}
              </Button>

              {/* Displaying comments */}
              {comments[post._id]?.map((comment) => (
                <div
                  key={comment._id}
                  className="mt-4 bg-white p-4 rounded-lg shadow-sm mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar email={comment.email} className="w-8 h-8" />
                    <div>
                      <h4 className="font-semibold">
                        {formatEmail(comment.email)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mt-2">{comment.content}</p>
                  {comment.email === email && (
                    <Button
                      variant="ghost"
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full mt-2 "
                      onClick={() => handleDeleteComment(comment._id)}>
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default SocialFeed;
