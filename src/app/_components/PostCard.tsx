'use client';

import { PostCardProps } from '@/types';
import { useAuth } from '@/hooks';
import Image from 'next/image';

export const PostCard = ({ post, onDelete }: PostCardProps) => {
  const imageUrl = '';
  const { user } = useAuth();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
  };

  return (
    <div className="py-4 px-4 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground dark:text-foreground">
            {post.user_email || 'Unknown user'}
          </span>
          <span className="text-muted-foreground dark:text-muted-foreground text-sm">
            • {new Date(post.created_at).toLocaleString()}
          </span>
        </div>
        {user && user.id === post.user_id && onDelete ? (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Delete
          </button>
        ) : null}
      </div>

      <p className="mb-2 text-foreground dark:text-foreground whitespace-pre-wrap">{post.content}</p>

      {post.image_id && imageUrl ? (
        <Image src={imageUrl} alt="Post image" width={800} height={600} className="w-full rounded-lg mt-3" />
      ) : null}
    </div>
  );
};
