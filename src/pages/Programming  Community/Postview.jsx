import { usePosts } from "./hooks/usePosts";
import { Post } from "./Post";

export const PostView = () => {
  const { posts, loading, error, deletePost, updatePost } = usePosts();

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onDelete={deletePost}
            onUpdate={updatePost}
          />
        ))}
      </div>
    </div>
  );
};

export default PostView;
