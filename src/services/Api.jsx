import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Api = createApi({

  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }), 
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts', 
    }),
    createPosts: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, updatedPost }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: updatedPost,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostsMutation, useDeletePostMutation, useUpdatePostMutation } = Api;