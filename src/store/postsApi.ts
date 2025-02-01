import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = { baseUrl: 'https://jsonplaceholder.typicode.com' };
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery(url),
  endpoints: (builder) => ({
    getPosts: builder.query<{ id: number; title: string }[], void>({
      query: () => '/posts',
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
