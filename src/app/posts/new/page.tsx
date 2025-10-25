'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ErrorMessage } from '@/app/_components';
import { useCreatePost } from '@/hooks/';

export default function NewPost() {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const { createPost, loading, isAuthenticated } = useCreatePost();

  const handleCreatePost = async () => {
    setError('');
    const result = await createPost(content);
    if (result.error) {
      setError(result.error);
    } else {
      setContent('');
      setFile(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Please log in to create a post</h2>
          <Link href="/login" className="text-primary hover:text-primary/80">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={'mt-4 flex flex-row ml-8'}>
        <Link href={'/posts'} className={'text-indigo-600'}>
          Go Back
        </Link>
      </div>
      <div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground dark:text-foreground ">
          Write a Post
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <form className="relative mb-5">
            <div className="overflow-hidden rounded-lg border border-border shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <label htmlFor="description" className="sr-only">
                Post
              </label>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                rows={2}
                name="content"
                id="content"
                className="h-60 px-4 py-2 block w-full resize-none border-0 text-foreground dark:text-foreground bg-white dark:bg-card shadow-sm ring-1 ring-inset ring-border dark:ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Write a post..."
                defaultValue={''}
              />

              {/* Spacer element to match the height of the toolbar */}
              <div aria-hidden="true">
                <div className="py-2">
                  <div className="h-9" />
                </div>
                <div className="h-px" />
                <div className="py-2">
                  <div className="py-px">{/*<div className="h-9" />*/}</div>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-px bottom-0 bg-background dark:bg-card">
              <div className="flex items-center justify-between  space-x-3 border-t border-border dark:border-border px-2 py-2 sm:px-3 hover:bg-secondary dark:hover:bg-secondary/50 transition-colors">
                <label htmlFor="picture" className="cursor-pointer">
                  <input
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className=""
                    id="picture"
                    name="picture"
                    type="file"
                  />
                </label>
                <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                  {file?.name || 'No file selected'}
                </span>
              </div>
              <div className="w-full flex justify-end p-2">
                <button
                  onClick={handleCreatePost}
                  type="button"
                  disabled={loading || !content.trim()}
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </form>
          <ErrorMessage error={error || ''} />
        </div>
      </div>
    </div>
  );
}
