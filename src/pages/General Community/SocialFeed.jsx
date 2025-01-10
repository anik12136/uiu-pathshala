import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Trash2, Send, Heart, MessageCircle } from "lucide-react";
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
    try {
      await apiHandleComment(postId, content, email);
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      const { posts, comments } = await fetchPosts();
      setPosts(posts);
      setComments(comments);
    } finally {
      setLoadingComment(false);
    }
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

  const mostLikedPosts = [...posts]
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white mb-8">
          <h1 className="text-3xl font-bold text-center">
            Welcome to the General Community!
          </h1>
          <p className="text-center text-blue-100 mt-2">
            Share your thoughts, ideas, and engage with others!
          </p>
        </div>

        {/* Create Post Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 p-4">
            <Avatar email={email} className="w-12 h-12" />
            <div className="flex-1">
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Post title"
                className="w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold bg-gray-50"
              />
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="mb-3 bg-gray-50"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleNewPost}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors duration-300">
                  <Send size={16} />
                  Share Post
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {posts.map((post) => (
              <Card
                key={post._id}
                className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar email={post.email} className="w-10 h-10" />
                    <div>
                      <h3 className="font-semibold">
                        {formatEmail(post.email)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  {email === post.email && (
                    <Button
                      variant="ghost"
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
                      onClick={() => handleDeletePost(post._id)}>
                      <Trash2 size={20} />
                    </Button>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                  <p className="whitespace-pre-line text-gray-700">
                    {post.content}
                  </p>
                </div>

                <div className="flex items-center gap-6 px-4 py-3 border-t">
                  <button
                    onClick={() => handleLikePost(post._id)}
                    className={`flex items-center gap-2 transition-colors duration-300 ${
                      post.likes?.includes(email)
                        ? "text-red-500"
                        : "text-gray-500 hover:text-red-500"
                    }`}>
                    <Heart
                      size={20}
                      fill={
                        post.likes?.includes(email) ? "currentColor" : "none"
                      }
                    />
                    <span className="text-sm font-medium">
                      {post.likes?.length || 0}
                    </span>
                  </button>
                  <button
                    onClick={() => toggleComments(post._id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-300">
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
                          setNewComment({
                            ...newComment,
                            [post._id]: e.target.value,
                          })
                        }
                        className="bg-white"
                      />
                    </div>

                    <Button
                      onClick={() =>
                        handleComment(post._id, newComment[post._id])
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-300"
                      disabled={loadingComment}>
                      {loadingComment ? "Sending..." : "Comment"}
                    </Button>

                    <div className="space-y-4 mt-6">
                      {comments[post._id]?.map((comment) => (
                        <div
                          key={comment._id}
                          className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center gap-3">
                            <Avatar email={comment.email} className="w-8 h-8" />
                            <div>
                              <h4 className="font-semibold">
                                {formatEmail(comment.email)}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {formatDistanceToNow(
                                  new Date(comment.createdAt),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm mt-2">{comment.content}</p>
                          {comment.email === email && (
                            <Button
                              variant="ghost"
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full mt-2"
                              onClick={() => handleDeleteComment(comment._id)}>
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Top Posts Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Top Trending Posts
              </h3>
              <div className="space-y-4">
                {mostLikedPosts.map((post) => (
                  <Card
                    key={post._id}
                    className="p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold">{post.title}</h4>
                    <p className="text-gray-600 text-sm mt-2">
                      {post.content.slice(0, 100)}...
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-blue-600">
                      <Heart size={16} />
                      <span className="font-bold">{post.likes.length}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;
