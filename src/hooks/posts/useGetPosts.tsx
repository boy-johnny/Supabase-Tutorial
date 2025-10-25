'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/utils/client';
import { Post } from '@/types';

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Query the view that includes user email
      const { data, error } = await supabase
        .from('posts_with_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting posts:', error);
        setError(error.message);
        setPosts([]);
      } else {
        setPosts(data || []);
      }
    } catch (err: unknown) {
      console.error('Unexpected error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { posts, loading, error, getPosts };
};
