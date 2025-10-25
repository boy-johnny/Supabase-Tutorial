'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ErrorMessage, PostCard } from '@/app/_components';
import { useGetPosts } from '@/hooks/';

export default function Posts() {
  const { posts, loading, error, getPosts } = useGetPosts();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleDeletePost = async (postId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete post:', postId);
  };

  return (
    <div>
      <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl ">
          <div>
            <div className="md:flex md:items-center md:justify-between mb-10">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-foreground dark:text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
                  Posts
                </h2>
              </div>
              <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
                >
                  <Link href={'/posts/new'}>New Post</Link>
                </button>
              </div>
            </div>

            <ErrorMessage error={error || ''} />

            <ul role="list" className="divide-y divide-border dark:divide-border">
              {loading ? (
                <li className="py-4 text-muted-foreground">Loading posts...</li>
              ) : posts.length === 0 ? (
                <li className="py-4 text-muted-foreground text-center">No posts yet. Be the first to create one!</li>
              ) : (
                posts.map((post) => (
                  <li key={post.id}>
                    <PostCard post={post} onDelete={handleDeletePost} />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
