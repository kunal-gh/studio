
'use client';

import { useEffect, type ReactNode } from 'react';
import { FirebaseClientProvider, useAuth, useUser } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // When the initial user loading is complete and we have an auth instance,
    // but there's no user, we initiate anonymous sign-in.
    if (!isUserLoading && auth && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [auth, user, isUserLoading]);

  return <>{children}</>;
}

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <AuthProvider>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </AuthProvider>
    </FirebaseClientProvider>
  );
}
