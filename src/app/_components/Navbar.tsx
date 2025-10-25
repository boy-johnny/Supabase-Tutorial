'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks';

export const Navbar = () => {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-neutral-800 dark:bg-neutral-900 text-neutral-200 dark:text-neutral-100 h-12 px-8 border-b border-border">
      <Link
        href={'/posts'}
        className="text-white dark:text-neutral-100 text-2xl font-bold hover:text-primary transition-colors"
      >
        Posts
      </Link>
      <div className="flex items-center gap-4">
        {loading ? (
          // Loading state
          <div className="w-32 h-6 bg-neutral-700 animate-pulse rounded" />
        ) : user ? (
          // Authenticated: Show user email and logout
          <>
            <span className="text-sm text-neutral-300 dark:text-neutral-400">{user.email}</span>
            <button
              onClick={logout}
              className="text-white dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          // Not authenticated: Show login and signup
          <>
            <Link
              href={'/login'}
              className="text-white dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href={'/signup'}
              className="text-white dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Signup
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};
