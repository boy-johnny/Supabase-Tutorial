import { createClient } from '@/utils/';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const supabase = createClient();

  const router = useRouter();

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    } else {
      router.push('/posts');
    }
  };

  const signup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    } else {
      router.push('/posts');
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    } else {
      router.push('/');
    }
  };

  return { login, signup, logout };
};
