'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ErrorMessage } from '@/app/_components';

interface Post {
  id: string;
  user_data: {
    email: string;
  };
  created_at: string;
  content: string;
  image_id: string | null;
  user_id: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div>
            <div className="md:flex md:items-center md:justify-between mb-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  Posts
                </h2>
              </div>
              <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Link href={'/new-post'}>New Post</Link>
                </button>
              </div>
            </div>

            <ErrorMessage error={error || ''} />

            <ul role="list" className="divide-y divide-gray-200">
              {posts.map((post) => {
                const imageUrl = '';
                return (
                  <li key={post.id} className="py-4">
                    <h4 className={'mb-4'}>
                      {post.user_data.email}
                      <span className={'text-gray-500'}> - {new Date(post.created_at).toLocaleString()}</span>
                    </h4>
                    <p className={'mb-2'}>{post.content}</p>
                    {post.image_id && imageUrl ? (
                      <Image src={imageUrl} alt="Post image" width={800} height={600} className={'w-full'} />
                    ) : null}
                    {userId === post.user_id ? (
                      <button onClick={() => {}} className={'text-red-500'}>
                        Delete
                      </button>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
