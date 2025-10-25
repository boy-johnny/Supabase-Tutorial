'use client';

import { useAuth } from '../auth';
import { createClient } from '@/utils/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useCreatePost = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const createPost = async (content: string): Promise<{ error: string | null }> => {
    if (!user) {
      return { error: 'You must be logged in to create a post' };
    }

    if (!content.trim()) {
      return { error: 'Post content cannot be empty' };
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('posts').insert({
        content: content.trim(),
        user_id: user.id,
      });

      if (error) {
        console.error('Error creating post:', error);
        return { error: error.message };
      }

      router.push('/posts');
      return { error: null };
    } catch (err: unknown) {
      console.error('Unexpected error:', err);
      return { error: err instanceof Error ? err.message : 'Failed to create post' };
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, isAuthenticated: !!user };
};
