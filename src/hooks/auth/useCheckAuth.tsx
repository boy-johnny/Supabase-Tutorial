'use client';

import { createClient } from '@/utils/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * @deprecated Use useRequireAuth or useAuth instead
 * This hook redirects users based on auth status
 */
export const useCheckAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then((response) => {
      if (response.data.user === null) {
        router.push('/login');
      } else {
        router.push('/posts');
      }
    });
  }, [router]);
};
