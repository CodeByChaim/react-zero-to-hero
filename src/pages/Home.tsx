import React from 'react';
// import React, { useEffect, useState } from 'react';
// import apiClient from '../services/apiClient';
// import { Post } from "../services/type";
import { useGetPostsQuery } from "../store/postsApi";



const Home: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(false);

  const { data: posts, error, isLoading } = useGetPostsQuery();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const response = await apiClient.get<Post[]>('/posts')
  //       setPosts(response.data);
  //     } catch (error: any) {
  //       console.error('Error fetching posts:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts?.map( (post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
