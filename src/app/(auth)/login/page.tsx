'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/client';
import { ErrorMessage } from '@/app/_components';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const login = async () => {
    const supabase = createClient();

    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.error) {
      setError(response.error.message);
    } else {
      router.push('/posts');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className="mx-auto h-10 w-auto" src="/logo.png" alt="GOODA" width={100} height={100} priority />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground dark:text-foreground">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground dark:text-foreground">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-foreground dark:text-foreground bg-white dark:bg-card shadow-sm ring-1 ring-inset ring-border dark:ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-foreground dark:text-foreground">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-foreground dark:text-foreground bg-white dark:bg-card shadow-sm ring-1 ring-inset ring-border dark:ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 px-3 py-1.5 text-sm font-semibold leading-6 text-primary-foreground shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
                onClick={login}
              >
                Sign in
              </button>
            </div>
            <ErrorMessage error={error} />
          </form>
          <p className="mt-10 text-center text-sm text-muted-foreground dark:text-muted-foreground">
            Not a member?{' '}
            <Link href={'/signup'} className="font-semibold leading-6 text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
